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
import { dashboardApi } from '../../api/dashboard';
import type { DashboardMetrics, ChartData } from '../../types';
import { useAppDispatch } from '../../hooks/redux';
import { setPageTitle } from '../../store/slices/uiSlice';

export const DashboardPage = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<ChartData | null>(null);
  const [usersData, setUsersData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Dashboard'));
  }, [dispatch]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [metricsResult, revenueResult, usersResult] = await Promise.all([
          dashboardApi.getMetrics(),
          dashboardApi.getChartData('revenue'),
          dashboardApi.getChartData('users'),
        ]);

        setMetrics(metricsResult);
        setRevenueData(revenueResult);
        setUsersData(usersResult);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Good morning! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Here's what's happening with your business today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Today</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Total Users"
          value={metrics?.totalUsers || 0}
          change={8.2}
          changeLabel="vs last month"
          icon={Users}
          color="blue"
          loading={loading}
        />
        <MetricCard
          title="Active Users"
          value={metrics?.activeUsers || 0}
          change={12.5}
          changeLabel="vs last month"
          icon={Activity}
          color="green"
          loading={loading}
        />
        <MetricCard
          title="Revenue"
          value={`$${metrics?.revenue?.toLocaleString() || 0}`}
          change={15.3}
          changeLabel="vs last month"
          icon={DollarSign}
          color="purple"
          loading={loading}
        />
        <MetricCard
          title="Growth Rate"
          value={`${metrics?.growth || 0}%`}
          change={-2.1}
          changeLabel="vs last month"
          icon={TrendingUp}
          color="orange"
          loading={loading}
        />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
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
                title="Revenue"
                height={300}
              />
            )}
          </ChartWidget>
        </motion.div>

        <motion.div variants={itemVariants}>
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
                title="New Users"
                height={300}
              />
            )}
          </ChartWidget>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h3>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
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
                color: "blue" as const,
              },
              {
                icon: DollarSign,
                title: "Payment received",
                description: "Invoice #1234 was paid",
                time: "1 hour ago",
                color: "green" as const,
              },
              {
                icon: Bell,
                title: "System alert",
                description: "Server usage is above 80%",
                time: "3 hours ago",
                color: "orange" as const,
              },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      activity.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      activity.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      'text-orange-600 dark:text-orange-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {activity.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
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