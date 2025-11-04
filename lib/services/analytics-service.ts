// Analytics Service - Comprehensive data analytics and reporting
import { z } from 'zod';

// Types
export interface DashboardMetrics {
  totalRevenue: number;
  jobsCompleted: number;
  activeJobs: number;
  avgResponseTime: number; // in minutes
  customerSatisfaction: number; // 1-5 rating
  insuranceApprovalRate: number; // percentage
  weekOverWeekGrowth: number; // percentage
  monthlyRecurringRevenue: number;
}

export interface RevenueBreakdown {
  period: string;
  total: number;
  byServiceType: ServiceRevenue[];
  byInsurer: InsurerRevenue[];
  byLocation: LocationRevenue[];
  trend: TrendData[];
}

export interface ServiceRevenue {
  serviceType: string;
  revenue: number;
  jobCount: number;
  avgJobValue: number;
  growthRate: number;
}

export interface InsurerRevenue {
  insurer: string;
  revenue: number;
  claimCount: number;
  avgClaimValue: number;
  approvalRate: number;
}

export interface LocationRevenue {
  location: string;
  suburb: string;
  revenue: number;
  jobCount: number;
  marketShare: number;
}

export interface TrendData {
  date: string;
  value: number;
  forecast?: number;
}

export interface ContractorPerformance {
  contractorId: string;
  name: string;
  rating: number;
  completionRate: number;
  avgResponseTime: number;
  totalJobs: number;
  revenue: number;
  customerComplaints: number;
  certifications: string[];
  specializations: string[];
  performanceScore: number; // Weighted score
}

export interface JobCompletionMetrics {
  totalJobs: number;
  completedJobs: number;
  completionRate: number;
  avgCompletionTime: number; // in hours
  byServiceType: CompletionByType[];
  byPriority: CompletionByPriority[];
  byInsurer: CompletionByInsurer[];
  delayedJobs: DelayedJobAnalysis[];
}

export interface CompletionByType {
  serviceType: string;
  total: number;
  completed: number;
  completionRate: number;
  avgDuration: number;
}

export interface CompletionByPriority {
  priority: 'EMERGENCY' | 'HIGH' | 'MEDIUM' | 'LOW';
  total: number;
  completed: number;
  completionRate: number;
  avgResponseTime: number;
}

export interface CompletionByInsurer {
  insurer: string;
  total: number;
  approved: number;
  rejected: number;
  pending: number;
  approvalRate: number;
}

export interface DelayedJobAnalysis {
  jobId: string;
  serviceType: string;
  delayReason: string;
  delayDays: number;
  impactedRevenue: number;
}

export interface ExportReport {
  type: 'financial' | 'operational' | 'performance' | 'insurance' | 'compliance';
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  dateRange: {
    from: Date;
    to: Date;
  };
  filters?: ReportFilters;
  data?: any;
}

export interface ReportFilters {
  serviceTypes?: string[];
  locations?: string[];
  insurers?: string[];
  contractors?: string[];
  priority?: string[];
  status?: string[];
}

export type Period = 'day' | 'week' | 'month' | 'quarter' | 'year';

// Mock data service - Replace with actual database queries
class MockDataService {
  private generateRandomRevenue(base: number, variance: number): number {
    return base + (Math.random() - 0.5) * variance;
  }

  private generateTrendData(period: Period, baseValue: number): TrendData[] {
    const data: TrendData[] = [];
    const now = new Date();
    let intervals = 30;

    switch(period) {
      case 'day':
        intervals = 24; // hourly data
        break;
      case 'week':
        intervals = 7; // daily data
        break;
      case 'month':
        intervals = 30; // daily data
        break;
      case 'quarter':
        intervals = 90; // daily data
        break;
      case 'year':
        intervals = 12; // monthly data
        break;
    }

    for (let i = 0; i < intervals; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (intervals - i));

      data.push({
        date: date.toISOString(),
        value: this.generateRandomRevenue(baseValue, baseValue * 0.3),
        forecast: i > intervals * 0.8 ? this.generateRandomRevenue(baseValue * 1.1, baseValue * 0.2) : undefined
      });
    }

    return data;
  }

  async getDashboardData(tenantId?: string, dateFrom?: Date, dateTo?: Date): Promise<DashboardMetrics> {
    // Simulate async database query
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
      totalRevenue: 2456789.50,
      jobsCompleted: 342,
      activeJobs: 27,
      avgResponseTime: 45,
      customerSatisfaction: 4.7,
      insuranceApprovalRate: 94.5,
      weekOverWeekGrowth: 12.3,
      monthlyRecurringRevenue: 185000
    };
  }

  async getRevenueData(period: Period, tenantId?: string): Promise<RevenueBreakdown> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const serviceTypes = [
      'Water Damage Restoration',
      'Fire & Smoke Damage',
      'Mould Remediation',
      'Storm Damage',
      'Biohazard Cleanup'
    ];

    const insurers = ['QBE', 'IAG', 'RACQ', 'Allianz', 'Suncorp'];
    const locations = ['Brisbane CBD', 'Ipswich', 'Logan', 'Gold Coast', 'Sunshine Coast'];

    return {
      period,
      total: 456789.50,
      byServiceType: serviceTypes.map(service => ({
        serviceType: service,
        revenue: this.generateRandomRevenue(80000, 30000),
        jobCount: Math.floor(Math.random() * 100) + 20,
        avgJobValue: this.generateRandomRevenue(3500, 1500),
        growthRate: (Math.random() - 0.3) * 30
      })),
      byInsurer: insurers.map(insurer => ({
        insurer,
        revenue: this.generateRandomRevenue(90000, 40000),
        claimCount: Math.floor(Math.random() * 80) + 15,
        avgClaimValue: this.generateRandomRevenue(4500, 2000),
        approvalRate: 85 + Math.random() * 10
      })),
      byLocation: locations.map(location => ({
        location,
        suburb: location,
        revenue: this.generateRandomRevenue(70000, 25000),
        jobCount: Math.floor(Math.random() * 60) + 10,
        marketShare: Math.random() * 30 + 10
      })),
      trend: this.generateTrendData(period, 15000)
    };
  }

  async getContractorData(tenantId?: string): Promise<ContractorPerformance[]> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const contractors = [
      { id: 'CON001', name: 'John Smith', specialization: 'Water Damage' },
      { id: 'CON002', name: 'Sarah Johnson', specialization: 'Fire Restoration' },
      { id: 'CON003', name: 'Mike Chen', specialization: 'Mould Remediation' },
      { id: 'CON004', name: 'Lisa Wong', specialization: 'Biohazard' },
      { id: 'CON005', name: 'David Brown', specialization: 'Storm Damage' }
    ];

    return contractors.map(contractor => ({
      contractorId: contractor.id,
      name: contractor.name,
      rating: 4 + Math.random() * 1,
      completionRate: 85 + Math.random() * 10,
      avgResponseTime: 30 + Math.random() * 30,
      totalJobs: Math.floor(Math.random() * 200) + 50,
      revenue: this.generateRandomRevenue(150000, 50000),
      customerComplaints: Math.floor(Math.random() * 5),
      certifications: ['IICRC', 'CARSI', 'WHS'],
      specializations: [contractor.specialization],
      performanceScore: 80 + Math.random() * 20
    }));
  }

  async getJobMetrics(tenantId?: string, dateFrom?: Date, dateTo?: Date): Promise<JobCompletionMetrics> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const serviceTypes = [
      'Water Damage', 'Fire Damage', 'Mould Remediation',
      'Storm Damage', 'Biohazard Cleanup'
    ];

    const priorities: Array<'EMERGENCY' | 'HIGH' | 'MEDIUM' | 'LOW'> = ['EMERGENCY', 'HIGH', 'MEDIUM', 'LOW'];
    const insurers = ['QBE', 'IAG', 'RACQ', 'Allianz'];

    return {
      totalJobs: 450,
      completedJobs: 342,
      completionRate: 76,
      avgCompletionTime: 48,
      byServiceType: serviceTypes.map(type => ({
        serviceType: type,
        total: Math.floor(Math.random() * 100) + 50,
        completed: Math.floor(Math.random() * 80) + 40,
        completionRate: 70 + Math.random() * 25,
        avgDuration: 24 + Math.random() * 72
      })),
      byPriority: priorities.map(priority => ({
        priority,
        total: Math.floor(Math.random() * 150) + 20,
        completed: Math.floor(Math.random() * 120) + 15,
        completionRate: 65 + Math.random() * 30,
        avgResponseTime: priority === 'EMERGENCY' ? 1 : priority === 'HIGH' ? 4 : priority === 'MEDIUM' ? 12 : 24
      })),
      byInsurer: insurers.map(insurer => ({
        insurer,
        total: Math.floor(Math.random() * 120) + 30,
        approved: Math.floor(Math.random() * 100) + 25,
        rejected: Math.floor(Math.random() * 10),
        pending: Math.floor(Math.random() * 15),
        approvalRate: 85 + Math.random() * 10
      })),
      delayedJobs: [
        {
          jobId: 'JOB-2024-001',
          serviceType: 'Water Damage',
          delayReason: 'Parts availability',
          delayDays: 3,
          impactedRevenue: 5500
        },
        {
          jobId: 'JOB-2024-045',
          serviceType: 'Fire Damage',
          delayReason: 'Insurance approval pending',
          delayDays: 5,
          impactedRevenue: 12000
        }
      ]
    };
  }
}

// Main Analytics Service
export class AnalyticsService {
  private static instance: AnalyticsService;
  private dataService: MockDataService;

  private constructor() {
    this.dataService = new MockDataService();
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  async getDashboardMetrics(
    tenantId?: string,
    dateFrom?: Date,
    dateTo?: Date
  ): Promise<DashboardMetrics> {
    try {
      return await this.dataService.getDashboardData(tenantId, dateFrom, dateTo);
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw new Error('Failed to fetch dashboard metrics');
    }
  }

  async getRevenueBreakdown(
    period: Period = 'month',
    tenantId?: string,
    dateFrom?: Date,
    dateTo?: Date
  ): Promise<RevenueBreakdown> {
    try {
      return await this.dataService.getRevenueData(period, tenantId);
    } catch (error) {
      console.error('Error fetching revenue breakdown:', error);
      throw new Error('Failed to fetch revenue breakdown');
    }
  }

  async getContractorPerformance(
    tenantId?: string,
    sortBy: 'rating' | 'completionRate' | 'responseTime' | 'revenue' = 'rating'
  ): Promise<ContractorPerformance[]> {
    try {
      const contractors = await this.dataService.getContractorData(tenantId);

      // Sort contractors based on criteria
      return contractors.sort((a, b) => {
        switch(sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'completionRate':
            return b.completionRate - a.completionRate;
          case 'responseTime':
            return a.avgResponseTime - b.avgResponseTime; // Lower is better
          case 'revenue':
            return b.revenue - a.revenue;
          default:
            return b.performanceScore - a.performanceScore;
        }
      });
    } catch (error) {
      console.error('Error fetching contractor performance:', error);
      throw new Error('Failed to fetch contractor performance');
    }
  }

  async getJobCompletionMetrics(
    tenantId?: string,
    dateFrom?: Date,
    dateTo?: Date,
    filters?: ReportFilters
  ): Promise<JobCompletionMetrics> {
    try {
      return await this.dataService.getJobMetrics(tenantId, dateFrom, dateTo);
    } catch (error) {
      console.error('Error fetching job completion metrics:', error);
      throw new Error('Failed to fetch job completion metrics');
    }
  }

  async exportReport(report: ExportReport): Promise<string | Buffer> {
    try {
      // Fetch data based on report type
      let data: any;

      switch(report.type) {
        case 'financial':
          data = await this.getRevenueBreakdown('month');
          break;
        case 'operational':
          data = await this.getJobCompletionMetrics();
          break;
        case 'performance':
          data = await this.getContractorPerformance();
          break;
        case 'insurance':
          data = await this.getJobCompletionMetrics();
          break;
        case 'compliance':
          data = await this.getDashboardMetrics();
          break;
      }

      // Format based on requested format
      switch(report.format) {
        case 'json':
          return JSON.stringify(data, null, 2);
        case 'csv':
          return this.convertToCSV(data);
        case 'pdf':
          return this.generatePDF(data, report.type);
        case 'xlsx':
          return this.generateExcel(data, report.type);
        default:
          return JSON.stringify(data);
      }
    } catch (error) {
      console.error('Error exporting report:', error);
      throw new Error('Failed to export report');
    }
  }

  private convertToCSV(data: any): string {
    // Simple CSV conversion - in production, use a library like csv-writer
    if (Array.isArray(data)) {
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(item => Object.values(item).join(',')).join('\n');
      return `${headers}\n${rows}`;
    }

    // For objects, flatten to key-value pairs
    const pairs = Object.entries(data).map(([key, value]) => `${key},${value}`);
    return pairs.join('\n');
  }

  private generatePDF(data: any, reportType: string): Buffer {
    // In production, use a library like pdfkit or puppeteer
    // For now, return a mock buffer
    const pdfContent = `PDF Report - ${reportType}\n${JSON.stringify(data, null, 2)}`;
    return Buffer.from(pdfContent);
  }

  private generateExcel(data: any, reportType: string): Buffer {
    // In production, use a library like exceljs
    // For now, return a mock buffer
    const excelContent = `Excel Report - ${reportType}\n${JSON.stringify(data, null, 2)}`;
    return Buffer.from(excelContent);
  }

  // Advanced analytics methods
  async getPredictiveAnalytics(tenantId?: string): Promise<any> {
    // Implement ML-based predictions
    return {
      demandForecast: {
        nextWeek: {
          waterDamage: 45,
          fireDamage: 12,
          mouldRemediation: 23,
          stormDamage: 8
        },
        confidence: 0.85
      },
      revenueProjection: {
        nextMonth: 512000,
        nextQuarter: 1650000,
        confidence: 0.78
      },
      riskAnalysis: {
        highRiskJobs: 3,
        contractorAvailability: 'adequate',
        insuranceDelayRisk: 'low'
      }
    };
  }

  async getRealTimeMetrics(): Promise<any> {
    // Real-time metrics for dashboard
    return {
      activeJobs: 27,
      technicianLocations: [
        { id: 'T001', lat: -27.4698, lng: 153.0251, status: 'on_route' },
        { id: 'T002', lat: -27.5598, lng: 153.0891, status: 'on_site' }
      ],
      incomingCalls: 3,
      queueLength: 8,
      avgWaitTime: '2:30',
      systemHealth: {
        api: 'healthy',
        database: 'healthy',
        integrations: 'healthy'
      }
    };
  }
}

// Export singleton instance
export const analyticsService = AnalyticsService.getInstance();