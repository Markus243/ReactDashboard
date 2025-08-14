import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'start' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 16,
        font: {
          size: 12,
          weight: 500 as const,
          family: 'Inter, system-ui, sans-serif',
        },
        color: '#64748b',
      },
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      cornerRadius: 8,
      padding: 12,
      displayColors: true,
      borderColor: '#475569',
      borderWidth: 1,
      titleFont: {
        size: 13,
        weight: 600 as const,
      },
      bodyFont: {
        size: 12,
        weight: 400 as const,
      },
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
          family: 'Inter, system-ui, sans-serif',
        },
        color: '#64748b',
        padding: 8,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        color: '#e2e8f0',
        lineWidth: 1,
      },
      ticks: {
        font: {
          size: 11,
          family: 'Inter, system-ui, sans-serif',
        },
        color: '#64748b',
        padding: 8,
        maxTicksLimit: 6,
      },
    },
  },
};

// Dark mode chart options
export const darkChartOptions = {
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      ...defaultChartOptions.plugins.legend,
      labels: {
        ...defaultChartOptions.plugins.legend.labels,
        color: '#cbd5e1',
      },
    },
  },
  scales: {
    x: {
      ...defaultChartOptions.scales.x,
      ticks: {
        ...defaultChartOptions.scales.x.ticks,
        color: '#94a3b8',
      },
    },
    y: {
      ...defaultChartOptions.scales.y,
      grid: {
        color: '#374151',
        lineWidth: 1,
      },
      ticks: {
        ...defaultChartOptions.scales.y.ticks,
        color: '#94a3b8',
      },
    },
  },
};

// Blue theme color palette
export const chartColors = {
  primary: '#189AB4',     // primary-500 (main blue)
  secondary: '#05445E',   // primary-600 (dark blue)
  accent: '#75E6DA',      // accent-500 (light blue)
  tertiary: '#D4F1F4',    // accent-200 (lightest blue)
  success: '#10b981',     // green-500
  warning: '#f59e0b',     // amber-500
  danger: '#ef4444',      // red-500
  info: '#38bdf8',        // blue-400
};

export const chartColorPalette = [
  '#189AB4', // primary-500 (main blue)
  '#75E6DA', // accent-500 (light blue)
  '#05445E', // primary-600 (dark blue)
  '#D4F1F4', // accent-200 (lightest blue)
  '#38bdf8', // blue-400
  '#10b981', // green-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
];