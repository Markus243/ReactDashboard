import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Calendar,
  Bell,
  Download
} from 'lucide-react';
import { MetricCard } from '../../components/ui/MetricCard';
import { ChartWidget } from '../../components/ui/ChartWidget';
import { LineChart } from '../../components/charts/LineChart';
import { BarChart } from '../../components/charts/BarChart';
import { DoughnutChart } from '../../components/charts/DoughnutChart';
import type { DashboardMetrics } from '../../types';
import type { LineChartData, BarChartData, DoughnutChartData } from '../../components/charts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPageTitle } from '../../store/slices/uiSlice';

export const DashboardPage = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<LineChartData | null>(null);
  const [usersData, setUsersData] = useState<BarChartData | null>(null);
  const [distributionData, setDistributionData] = useState<DoughnutChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(setPageTitle('Dashboard'));
  }, [dispatch]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Mock data with new chart interfaces
        const mockMetrics: DashboardMetrics = {
          totalUsers: 15847,
          activeUsers: 12456,
          revenue: 98500,
          growth: 12.5
        };

        const mockRevenueData: LineChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Monthly Revenue',
            data: [65000, 78000, 82000, 91000, 88000, 98500],
            gradient: true,
            fill: true
          }]
        };

        const mockUsersData: BarChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'New Registrations',
            data: [1200, 1900, 1700, 2100, 1800, 2300],
            gradient: true
          }]
        };

        const mockDistributionData: DoughnutChartData = {
          labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
          data: [45, 35, 15, 5]
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setMetrics(mockMetrics);
        setRevenueData(mockRevenueData);
        setUsersData(mockUsersData);
        setDistributionData(mockDistributionData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Good morning!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Here's what's happening with your business today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Today</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Total Users"
          value={metrics?.totalUsers || 0}
          change={8.2}
          changeLabel="vs last month"
          icon={Users}
          color="primary"
          loading={loading}
        />
        <MetricCard
          title="Active Users"
          value={metrics?.activeUsers || 0}
          change={12.5}
          changeLabel="vs last month"
          icon={Activity}
          color="accent"
          loading={loading}
        />
        <MetricCard
          title="Revenue"
          value={`$${metrics?.revenue?.toLocaleString() || 0}`}
          change={15.3}
          changeLabel="vs last month"
          icon={DollarSign}
          color="primary"
          loading={loading}
        />
        <MetricCard
          title="Growth Rate"
          value={`${metrics?.growth || 0}%`}
          change={-2.1}
          changeLabel="vs last month"
          icon={TrendingUp}
          color="accent"
          loading={loading}
        />
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <div>
          <ChartWidget
            title="Revenue Overview"
            subtitle="Monthly revenue for the past 6 months"
            trend={{
              value: 12.5,
              label: "vs last period"
            }}
            loading={loading}
          >
            {revenueData && (
              <LineChart
                data={revenueData}
                height={300}
                isDark={theme === 'dark'}
                showLegend={false}
              />
            )}
          </ChartWidget>
        </div>

        <div>
          <ChartWidget
            title="User Growth"
            subtitle="New users registered per month"
            trend={{
              value: 8.7,
              label: "vs last period"
            }}
            loading={loading}
          >
            {usersData && (
              <BarChart
                data={usersData}
                height={300}
                isDark={theme === 'dark'}
                showLegend={false}
              />
            )}
          </ChartWidget>
        </div>

        <div>
          <ChartWidget
            title="Traffic Sources"
            subtitle="Breakdown by device type"
            trend={{
              value: 5.2,
              label: "vs last period"
            }}
            loading={loading}
          >
            {distributionData && (
              <DoughnutChart
                data={distributionData}
                height={300}
                isDark={theme === 'dark'}
                showLegend={true}
              />
            )}
          </ChartWidget>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              {
                icon: Users,
                title: "New user registered",
                description: "John Doe joined the platform",
                time: "2 minutes ago",
                color: "primary" as const,
              },
              {
                icon: DollarSign,
                title: "Payment received",
                description: "Invoice #1234 was paid",
                time: "1 hour ago",
                color: "accent" as const,
              },
              {
                icon: Bell,
                title: "System alert",
                description: "Server usage is above 80%",
                time: "3 hours ago",
                color: "warning" as const,
              },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.color === 'primary' ? 'bg-primary-100 dark:bg-primary-900/30' :
                    activity.color === 'accent' ? 'bg-accent-100 dark:bg-accent-900/30' :
                    'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      activity.color === 'primary' ? 'text-primary-600 dark:text-primary-400' :
                      activity.color === 'accent' ? 'text-accent-600 dark:text-accent-400' :
                      'text-yellow-600 dark:text-yellow-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};