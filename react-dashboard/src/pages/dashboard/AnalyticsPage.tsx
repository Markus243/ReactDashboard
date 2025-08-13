import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import { MetricCard } from '../../components/ui/MetricCard';
import { useAppDispatch } from '../../hooks/redux';
import { setPageTitle } from '../../store/slices/uiSlice';

export const AnalyticsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Analytics'));
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Deep insights into your business performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Page Views"
          value={15420}
          change={12.5}
          changeLabel="vs last week"
          icon={Eye}
          color="primary"
        />
        <MetricCard
          title="Sessions"
          value={8932}
          change={8.2}
          changeLabel="vs last week"
          icon={Users}
          color="accent"
        />
        <MetricCard
          title="Bounce Rate"
          value="34.2%"
          change={-2.1}
          changeLabel="vs last week"
          icon={TrendingUp}
          color="primary"
        />
        <MetricCard
          title="Conversion"
          value="2.4%"
          change={0.8}
          changeLabel="vs last week"
          icon={BarChart3}
          color="warning"
        />
      </div>
    </motion.div>
  );
};