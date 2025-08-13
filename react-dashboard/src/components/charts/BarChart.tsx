import { Bar } from 'react-chartjs-2';
import type { ChartData } from '../../types';
import { defaultChartOptions, chartColors } from './chartConfig';

interface BarChartProps {
  data: ChartData;
  title?: string;
  height?: number;
  horizontal?: boolean;
}

export const BarChart = ({ data, title, height = 300, horizontal = false }: BarChartProps) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title || 'Data',
        data: data.data,
        backgroundColor: data.backgroundColor || [
          `${chartColors.primary}90`,
          `${chartColors.secondary}90`,
          `${chartColors.success}90`,
          `${chartColors.warning}90`,
          `${chartColors.danger}90`,
          `${chartColors.info}90`,
        ],
        borderColor: data.borderColor || [
          chartColors.primary,
          chartColors.secondary,
          chartColors.success,
          chartColors.warning,
          chartColors.danger,
          chartColors.info,
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    scales: {
      ...defaultChartOptions.scales,
      y: {
        ...defaultChartOptions.scales.y,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};