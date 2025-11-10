/**
 * Lead Router Service
 *
 * Routes leads to appropriate team members based on service type,
 * location, urgency, and team availability
 */

export interface LeadRoutingInput {
  leadId: string;
  serviceType: string;
  location: {
    suburb: string;
    postcode: string;
  };
  urgencyLevel: 'critical' | 'urgent' | 'standard';
  leadScore: number;
  source?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'master_restorer' | 'project_manager' | 'sales' | 'technician';
  specializations: string[];
  serviceAreas: string[];
  maxActiveLeads: number;
  currentActiveLeads: number;
  availability: 'available' | 'busy' | 'offline';
  performanceScore: number; // 0-100
}

export interface RoutingResult {
  success: boolean;
  assignedTo?: TeamMember;
  fallbackOptions?: TeamMember[];
  routingReason: string;
  estimatedResponseTime: string;
  error?: string;
}

/**
 * Mock team database (in production, fetch from database)
 */
const TEAM: TeamMember[] = [
  {
    id: 'phill-mcgurk',
    name: 'Phill McGurk',
    email: 'phill@disasterrecovery.com.au',
    phone: '1300309361',
    role: 'master_restorer',
    specializations: ['water', 'fire', 'mould', 'storm', 'biohazard'],
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    maxActiveLeads: 5,
    currentActiveLeads: 0,
    availability: 'available',
    performanceScore: 98,
  },
  {
    id: 'project-manager-1',
    name: 'Project Manager',
    email: 'admin@disasterrecovery.com.au',
    phone: '1300309361',
    role: 'project_manager',
    specializations: ['water', 'fire', 'mould', 'storm'],
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    maxActiveLeads: 10,
    currentActiveLeads: 0,
    availability: 'available',
    performanceScore: 92,
  },
  {
    id: 'sales-1',
    name: 'Sales Manager',
    email: 'sales@disasterrecovery.com.au',
    phone: '1300309361',
    role: 'sales',
    specializations: ['water', 'fire', 'mould', 'storm', 'biohazard'],
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    maxActiveLeads: 15,
    currentActiveLeads: 0,
    availability: 'available',
    performanceScore: 88,
  },
];

/**
 * Route lead to appropriate team member
 */
export async function routeLead(input: LeadRoutingInput): Promise<RoutingResult> {
  try {
    // Filter available team members
    const availableTeam = TEAM.filter((member) => {
      // Must be available or busy (not offline)
      if (member.availability === 'offline') {return false;}

      // Must have capacity
      if (member.currentActiveLeads >= member.maxActiveLeads) {return false;}

      // Must have specialization
      if (!member.specializations.includes(input.serviceType)) {return false;}

      // Must serve the area
      const servesArea = member.serviceAreas.some((area) => {
        return (
          input.location.suburb.toLowerCase().includes(area.toLowerCase()) ||
          input.location.postcode.startsWith(area)
        );
      });
      if (!servesArea) {return false;}

      return true;
    });

    if (availableTeam.length === 0) {
      // No one available - escalate
      return {
        success: false,
        routingReason: 'NO_AVAILABLE_TEAM_MEMBERS',
        estimatedResponseTime: 'Unknown',
        error: 'All team members at capacity or offline',
      };
    }

    // Score team members for this lead
    const scoredTeam = availableTeam.map((member) => {
      let score = 0;

      // Role-based scoring
      const roleScores = {
        master_restorer: 100,
        project_manager: 85,
        sales: 70,
        technician: 60,
      };
      score += roleScores[member.role] || 50;

      // Performance score
      score += member.performanceScore * 0.5;

      // Availability score (prefer less busy)
      const utilization = member.currentActiveLeads / member.maxActiveLeads;
      score += (1 - utilization) * 20;

      // Urgency-based routing
      if (input.urgencyLevel === 'critical') {
        // Critical leads go to Master Restorer
        if (member.role === 'master_restorer') {score += 50;}
      } else if (input.leadScore >= 80) {
        // High-value leads go to senior team
        if (member.role === 'master_restorer' || member.role === 'project_manager') {
          score += 30;
        }
      }

      return { member, score };
    });

    // Sort by score
    scoredTeam.sort((a, b) => b.score - a.score);

    const assignedTo = scoredTeam[0].member;
    const fallbackOptions = scoredTeam.slice(1, 3).map((s) => s.member);

    // Calculate estimated response time
    const responseTime = getEstimatedResponseTime(input.urgencyLevel, assignedTo);

    return {
      success: true,
      assignedTo,
      fallbackOptions,
      routingReason: getRoutingReason(assignedTo, input),
      estimatedResponseTime: responseTime,
    };
  } catch (error) {
    console.error('[ROUTER] Lead routing error:', error);
    return {
      success: false,
      routingReason: 'ROUTING_ERROR',
      estimatedResponseTime: 'Unknown',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get routing reason explanation
 */
function getRoutingReason(member: TeamMember, input: LeadRoutingInput): string {
  const reasons = [];

  if (input.urgencyLevel === 'critical') {
    reasons.push('Critical urgency requires senior expertise');
  }

  if (input.leadScore >= 80) {
    reasons.push('High-value lead assigned to experienced team member');
  }

  reasons.push(`${member.name} specializes in ${input.serviceType}`);
  reasons.push(`Serves ${input.location.suburb} area`);

  if (member.currentActiveLeads === 0) {
    reasons.push('Currently available with no active leads');
  }

  return reasons.join('. ');
}

/**
 * Calculate estimated response time
 */
function getEstimatedResponseTime(urgency: string, member: TeamMember): string {
  const baseMinutes = {
    critical: 5,
    urgent: 15,
    standard: 60,
  }[urgency] || 60;

  // Add delay based on current workload
  const workloadDelay = member.currentActiveLeads * 5;

  const totalMinutes = baseMinutes + workloadDelay;

  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  }
  return `${Math.ceil(totalMinutes / 60)} hours`;
}

/**
 * Round-robin assignment (simple load balancing)
 */
let lastAssignedIndex = -1;

export async function roundRobinAssignment(
  input: LeadRoutingInput
): Promise<RoutingResult> {
  const eligibleTeam = TEAM.filter((member) => {
    return (
      member.availability !== 'offline' &&
      member.currentActiveLeads < member.maxActiveLeads &&
      member.specializations.includes(input.serviceType)
    );
  });

  if (eligibleTeam.length === 0) {
    return {
      success: false,
      routingReason: 'NO_AVAILABLE_TEAM_MEMBERS',
      estimatedResponseTime: 'Unknown',
    };
  }

  // Next team member in rotation
  lastAssignedIndex = (lastAssignedIndex + 1) % eligibleTeam.length;
  const assignedTo = eligibleTeam[lastAssignedIndex];

  return {
    success: true,
    assignedTo,
    fallbackOptions: eligibleTeam.filter((m) => m.id !== assignedTo.id).slice(0, 2),
    routingReason: 'Round-robin assignment for load balancing',
    estimatedResponseTime: getEstimatedResponseTime(input.urgencyLevel, assignedTo),
  };
}

/**
 * Route based on geographic proximity
 */
export async function geographicRouting(
  input: LeadRoutingInput
): Promise<RoutingResult> {
  // Define suburb-to-team mapping
  const suburbAssignments: Record<string, string[]> = {
    'Brisbane CBD': ['phill-mcgurk', 'project-manager-1'],
    Hamilton: ['phill-mcgurk'],
    Ascot: ['phill-mcgurk'],
    'New Farm': ['phill-mcgurk'],
    Ipswich: ['project-manager-1', 'phill-mcgurk'],
    Logan: ['sales-1', 'project-manager-1'],
  };

  const assignedIds = suburbAssignments[input.location.suburb] || [];
  const assignedMembers = TEAM.filter(
    (m) => assignedIds.includes(m.id) && m.availability !== 'offline'
  );

  if (assignedMembers.length === 0) {
    // Fallback to standard routing
    return routeLead(input);
  }

  const assignedTo = assignedMembers[0];

  return {
    success: true,
    assignedTo,
    fallbackOptions: assignedMembers.slice(1),
    routingReason: `Geographic assignment - ${assignedTo.name} covers ${input.location.suburb}`,
    estimatedResponseTime: getEstimatedResponseTime(input.urgencyLevel, assignedTo),
  };
}

/**
 * Update team member availability
 */
export async function updateAvailability(
  memberId: string,
  availability: 'available' | 'busy' | 'offline'
): Promise<boolean> {
  const member = TEAM.find((m) => m.id === memberId);
  if (!member) {return false;}

  member.availability = availability;
  return true;
}

/**
 * Update team member active lead count
 */
export async function updateActiveLeadCount(
  memberId: string,
  increment: number
): Promise<boolean> {
  const member = TEAM.find((m) => m.id === memberId);
  if (!member) {return false;}

  member.currentActiveLeads = Math.max(0, member.currentActiveLeads + increment);
  return true;
}

/**
 * Get team performance metrics
 */
export function getTeamMetrics(): {
  totalTeam: number;
  available: number;
  busy: number;
  offline: number;
  totalCapacity: number;
  currentLoad: number;
  utilizationRate: number;
} {
  const totalTeam = TEAM.length;
  const available = TEAM.filter((m) => m.availability === 'available').length;
  const busy = TEAM.filter((m) => m.availability === 'busy').length;
  const offline = TEAM.filter((m) => m.availability === 'offline').length;

  const totalCapacity = TEAM.reduce((sum, m) => sum + m.maxActiveLeads, 0);
  const currentLoad = TEAM.reduce((sum, m) => sum + m.currentActiveLeads, 0);
  const utilizationRate = totalCapacity > 0 ? currentLoad / totalCapacity : 0;

  return {
    totalTeam,
    available,
    busy,
    offline,
    totalCapacity,
    currentLoad,
    utilizationRate,
  };
}
