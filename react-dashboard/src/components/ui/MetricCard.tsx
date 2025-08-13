import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  loading?: boolean;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  color = 'blue',
  loading = false,
}: MetricCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      }
      if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  };

  const bgColorClasses = {
    blue: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    green: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    purple: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    orange: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    red: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300",
        `bg-gradient-to-br ${bgColorClasses[color]}`
      )}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {formatValue(value)}
          </p>
          
          {change !== undefined && (
            <div className="flex items-center gap-1">
              <span
                className={clsx(
                  "text-sm font-medium",
                  change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {change >= 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <div className={clsx(
          "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r text-white shadow-lg",
          colorClasses[color]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-white/10 dark:bg-slate-700/10" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-20 w-20 rounded-full bg-white/5 dark:bg-slate-700/5" />
    </motion.div>
  );
};