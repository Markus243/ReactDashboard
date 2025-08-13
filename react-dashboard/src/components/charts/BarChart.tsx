import { Bar } from 'react-chartjs-2';
import type { ChartData as ChartJSData, ChartOptions } from 'chart.js';
import { defaultChartOptions, chartColorPalette } from './chartConfig';

export interface BarChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    colors?: string[];
    gradient?: boolean;
  }>;
}

interface BarChartProps {
  data: BarChartData;
  height?: number;
  horizontal?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  borderRadius?: number;
  customOptions?: Partial<ChartOptions<'bar'>>;
}

export const BarChart = ({ 
  data, 
  height = 300, 
  horizontal = false,
  showLegend = true,
  showGrid = true,
  borderRadius = 6,
  customOptions = {}
}: BarChartProps) => {
  
  const chartData: ChartJSData<'bar'> = {
    labels: data.labels,
    datasets: data.datasets.map((dataset) => {
      const colors = dataset.colors || chartColorPalette;
      
      return {
        label: dataset.label,
        data: dataset.data,
        backgroundColor: dataset.data.map((_, index) => {
          const color = colors[index % colors.length];
          return dataset.gradient ? `${color}80` : `${color}90`;
        }),
        borderColor: dataset.data.map((_, index) => 
          colors[index % colors.length]
        ),
        borderWidth: 2,
        borderRadius,
        borderSkipped: false,
      };
    }),
  };

  const options: ChartOptions<'bar'> = {
    ...defaultChartOptions,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        display: showLegend,
      },
    },
    scales: {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales?.x,
        grid: {
          display: showGrid,
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
      y: {
        ...defaultChartOptions.scales?.y,
        beginAtZero: true,
        grid: {
          display: showGrid,
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
    },
    ...customOptions,
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};