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

  const iconColorClasses = {
    primary: 'bg-primary-500 text-white',
    accent: 'bg-accent-500 text-white',
    warning: 'bg-yellow-500 text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="relative bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200"
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
          "flex h-12 w-12 items-center justify-center rounded-lg",
          iconColorClasses[color]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

    </motion.div>
  );
};