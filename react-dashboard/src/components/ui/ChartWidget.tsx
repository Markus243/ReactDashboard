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
      transition={{ duration: 0.3 }}
      className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {loading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 flex items-center justify-center rounded-2xl z-10">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
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
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {trend.label}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
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