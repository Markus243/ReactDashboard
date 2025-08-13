import type { DashboardMetrics, ChartData } from '../types';

export const dashboardApi = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    // Mock data for now - replace with actual API endpoint when available
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalUsers: 12485,
          activeUsers: 8942,
          revenue: 89250,
          growth: 12.5,
        });
      }, 500);
    });
  },

  getChartData: async (type: 'revenue' | 'users' | 'growth'): Promise<ChartData> => {
    // Mock data for now - replace with actual API endpoint when available
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          revenue: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            backgroundColor: ['#3B82F6'],
            borderColor: ['#1D4ED8'],
          },
          users: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [1200, 1900, 1500, 2500, 2200, 3000],
            backgroundColor: ['#10B981'],
            borderColor: ['#047857'],
          },
          growth: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [5.2, 8.1, 12.5, 15.8],
            backgroundColor: ['#F59E0B'],
            borderColor: ['#D97706'],
          },
        };
        resolve(mockData[type]);
      }, 300);
    });
  },
};