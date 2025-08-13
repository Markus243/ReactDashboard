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
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          weight: 'normal' as const,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#f8fafc',
      bodyColor: '#f8fafc',
      cornerRadius: 8,
      padding: 12,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#64748b',
      },
    },
    y: {
      grid: {
        color: 'rgba(148, 163, 184, 0.1)',
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#64748b',
      },
    },
  },
};

export const chartColors = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
};

export const gradients = {
  blue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  purple: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  green: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  orange: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
};