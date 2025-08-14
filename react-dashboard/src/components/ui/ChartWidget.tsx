import { motion } from 'framer-motion';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  loading?: boolean;
  actions?: ReactNode;
}

export const ChartWidget = ({
  title,
  subtitle,
  children,
  trend,
  loading = false,
  actions,
}: ChartWidgetProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-sm transition-shadow duration-200"
    >
      {loading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center rounded-lg z-10">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-slate-600 rounded-full animate-spin" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-2 mt-2">
              {trend.value >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend.value >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {trend.value >= 0 ? '+' : ''}{trend.value}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {trend.label}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Chart Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};