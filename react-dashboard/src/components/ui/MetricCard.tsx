import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  color?: 'primary' | 'accent' | 'warning' | 'success' | 'danger';
  loading?: boolean;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  color = 'primary',
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
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    warning: 'from-yellow-500 to-yellow-600',
    success: 'from-green-500 to-green-600',
    danger: 'from-red-500 to-red-600',
  };

  const bgColorClasses = {
    primary: 'from-primary-50 to-primary-100 dark:from-dark-700 dark:to-dark-700',
    accent: 'from-accent-50 to-accent-100 dark:from-dark-700 dark:to-dark-700',
    warning: 'from-yellow-50 to-yellow-100 dark:from-dark-700 dark:to-dark-700',
    success: 'from-green-50 to-green-100 dark:from-dark-700 dark:to-dark-700',
    danger: 'from-red-50 to-red-100 dark:from-dark-700 dark:to-dark-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300",
        `bg-gradient-to-br ${bgColorClasses[color]}`
      )}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-slate-600 rounded-full animate-spin" />
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {formatValue(value)}
          </p>
          
          {change !== undefined && (
            <div className="flex items-center gap-1">
              <span
                className={clsx(
                  "text-sm font-medium",
                  change >= 0 ? "text-accent-600 dark:text-accent-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {change >= 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
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
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-white/10 dark:bg-gray-700/10" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-20 w-20 rounded-full bg-white/5 dark:bg-gray-700/5" />
    </motion.div>
  );
};