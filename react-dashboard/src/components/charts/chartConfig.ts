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

// Soft, modern color palette
export const chartColors = {
  primary: '#64748b',     // Soft slate
  secondary: '#14b8a6',   // Soft teal
  accent: '#2dd4bf',      // Light teal
  tertiary: '#94a3b8',    // Light slate
  success: '#10b981',     // Soft emerald
  warning: '#f59e0b',     // Amber
  danger: '#ef4444',      // Soft red
  info: '#06b6d4',        // Cyan
};

export const chartColorPalette = [
  '#64748b', // primary
  '#14b8a6', // secondary
  '#2dd4bf', // accent
  '#94a3b8', // tertiary
  '#10b981', // success
  '#f59e0b', // warning
  '#8b5cf6', // purple
  '#06b6d4', // cyan
];

export const softGradients = {
  primary: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
  secondary: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
  accent: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
  subtle: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
};