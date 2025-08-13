import { Line } from 'react-chartjs-2';
import type { ChartData } from '../../types';
import { defaultChartOptions, chartColors } from './chartConfig';

interface LineChartProps {
  data: ChartData;
  title?: string;
  height?: number;
  gradient?: boolean;
}

export const LineChart = ({ data, title, height = 300, gradient = true }: LineChartProps) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title || 'Data',
        data: data.data,
        borderColor: data.borderColor?.[0] || chartColors.primary,
        backgroundColor: gradient 
          ? `${data.backgroundColor?.[0] || chartColors.primary}20`
          : data.backgroundColor?.[0] || chartColors.primary,
        borderWidth: 3,
        fill: gradient,
        tension: 0.4,
        pointBackgroundColor: data.borderColor?.[0] || chartColors.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: data.borderColor?.[0] || chartColors.primary,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
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
      <Line data={chartData} options={options} />
    </div>
  );
};