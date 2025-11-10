/**
 * Role-Based Access Control (RBAC) Types
 * Defines user roles, permissions, and access control structures
 */

export type UserRole =
  | 'super_admin'
  | 'portal_admin'
  | 'agency_owner'
  | 'agency_manager'
  | 'agency_staff'
  | 'contractor_owner'
  | 'contractor_manager'
  | 'contractor_technician'
  | 'client_admin'
  | 'client_user';

export type Permission =
  // User Management
  | 'users.create'
  | 'users.read'
  | 'users.update'
  | 'users.delete'
  | 'users.manage_roles'
  | 'users.manage_permissions'

  // Company Management
  | 'companies.create'
  | 'companies.read'
  | 'companies.update'
  | 'companies.delete'

  // Job Management
  | 'jobs.create'
  | 'jobs.read'
  | 'jobs.update'
  | 'jobs.delete'
  | 'jobs.assign'

  // Client Management
  | 'clients.create'
  | 'clients.read'
  | 'clients.update'
  | 'clients.delete'

  // Invoicing
  | 'invoices.create'
  | 'invoices.read'
  | 'invoices.update'
  | 'invoices.delete'
  | 'invoices.approve'

  // Reporting
  | 'reports.view'
  | 'reports.export'
  | 'reports.advanced'

  // Settings
  | 'settings.read'
  | 'settings.update'
  | 'settings.system';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  isActive: boolean;
  isMfaEnabled: boolean;
  permissions: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

export interface RoleDefinition {
  name: string;
  description: string;
  permissions: Permission[];
  level: number; // Higher number = more powerful
  hierarchy?: number; // Alias for level (backward compatibility)
  isSystemRole?: boolean; // Whether this is a system-level role
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  super_admin: {
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    level: 100,
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.delete', 'users.manage_roles', 'users.manage_permissions',
      'companies.create', 'companies.read', 'companies.update', 'companies.delete',
      'jobs.create', 'jobs.read', 'jobs.update', 'jobs.delete', 'jobs.assign',
      'clients.create', 'clients.read', 'clients.update', 'clients.delete',
      'invoices.create', 'invoices.read', 'invoices.update', 'invoices.delete', 'invoices.approve',
      'reports.view', 'reports.export', 'reports.advanced',
      'settings.read', 'settings.update', 'settings.system'
    ]
  },
  portal_admin: {
    name: 'Portal Administrator',
    description: 'Administrative access to portal settings and users',
    level: 90,
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.manage_roles',
      'companies.read', 'companies.update',
      'jobs.read', 'jobs.update',
      'clients.read', 'clients.update',
      'invoices.read', 'invoices.approve',
      'reports.view', 'reports.export', 'reports.advanced',
      'settings.read', 'settings.update'
    ]
  },
  agency_owner: {
    name: 'Agency Owner',
    description: 'Full access to agency operations',
    level: 80,
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.delete',
      'companies.read', 'companies.update',
      'jobs.create', 'jobs.read', 'jobs.update', 'jobs.delete', 'jobs.assign',
      'clients.create', 'clients.read', 'clients.update', 'clients.delete',
      'invoices.create', 'invoices.read', 'invoices.update', 'invoices.delete', 'invoices.approve',
      'reports.view', 'reports.export', 'reports.advanced',
      'settings.read', 'settings.update'
    ]
  },
  agency_manager: {
    name: 'Agency Manager',
    description: 'Manage jobs, clients, and team members',
    level: 70,
    permissions: [
      'users.read', 'users.update',
      'jobs.create', 'jobs.read', 'jobs.update', 'jobs.assign',
      'clients.create', 'clients.read', 'clients.update',
      'invoices.create', 'invoices.read', 'invoices.update',
      'reports.view', 'reports.export',
      'settings.read'
    ]
  },
  agency_staff: {
    name: 'Agency Staff',
    description: 'Basic job and client management',
    level: 60,
    permissions: [
      'users.read',
      'jobs.read', 'jobs.update',
      'clients.read', 'clients.update',
      'invoices.read',
      'reports.view'
    ]
  },
  contractor_owner: {
    name: 'Contractor Owner',
    description: 'Full access to contractor operations',
    level: 75,
    permissions: [
      'users.create', 'users.read', 'users.update', 'users.delete',
      'jobs.read', 'jobs.update',
      'invoices.create', 'invoices.read', 'invoices.update',
      'reports.view', 'reports.export',
      'settings.read', 'settings.update'
    ]
  },
  contractor_manager: {
    name: 'Contractor Manager',
    description: 'Manage technicians and jobs',
    level: 65,
    permissions: [
      'users.read', 'users.update',
      'jobs.read', 'jobs.update',
      'invoices.read', 'invoices.update',
      'reports.view'
    ]
  },
  contractor_technician: {
    name: 'Contractor Technician',
    description: 'View and update assigned jobs',
    level: 55,
    permissions: [
      'jobs.read', 'jobs.update',
      'invoices.read'
    ]
  },
  client_admin: {
    name: 'Client Administrator',
    description: 'Manage client company and users',
    level: 50,
    permissions: [
      'users.create', 'users.read', 'users.update',
      'jobs.create', 'jobs.read',
      'invoices.read',
      'reports.view'
    ]
  },
  client_user: {
    name: 'Client User',
    description: 'View jobs and submit requests',
    level: 40,
    permissions: [
      'jobs.create', 'jobs.read',
      'invoices.read'
    ]
  }
};

export const PERMISSION_CATEGORIES = {
  'User Management': ['users.create', 'users.read', 'users.update', 'users.delete', 'users.manage_roles', 'users.manage_permissions'],
  'Company Management': ['companies.create', 'companies.read', 'companies.update', 'companies.delete'],
  'Job Management': ['jobs.create', 'jobs.read', 'jobs.update', 'jobs.delete', 'jobs.assign'],
  'Client Management': ['clients.create', 'clients.read', 'clients.update', 'clients.delete'],
  'Invoicing': ['invoices.create', 'invoices.read', 'invoices.update', 'invoices.delete', 'invoices.approve'],
  'Reporting': ['reports.view', 'reports.export', 'reports.advanced'],
  'Settings': ['settings.read', 'settings.update', 'settings.system']
} as const;

/**
 * Check if a user has a specific permission
 */
export function hasPermission(user: User, permission: Permission): boolean {
  return user.permissions.includes(permission);
}

/**
 * Check if a user has any of the specified permissions
 */
export function hasAnyPermission(user: User, permissions: Permission[]): boolean {
  return permissions.some(p => user.permissions.includes(p));
}

/**
 * Check if a user has all of the specified permissions
 */
export function hasAllPermissions(user: User, permissions: Permission[]): boolean {
  return permissions.every(p => user.permissions.includes(p));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_DEFINITIONS[role]?.permissions || [];
}

/**
 * Check if one role can manage another role
 */
export function canManageRole(managerRole: UserRole, targetRole: UserRole): boolean {
  const managerLevel = ROLE_DEFINITIONS[managerRole]?.level || 0;
  const targetLevel = ROLE_DEFINITIONS[targetRole]?.level || 0;
  return managerLevel > targetLevel;
}
