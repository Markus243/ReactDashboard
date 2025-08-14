import { Bar } from 'react-chartjs-2';
import type { ChartData as ChartJSData, ChartOptions } from 'chart.js';
import { defaultChartOptions, darkChartOptions, chartColorPalette } from './chartConfig';

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
  isDark?: boolean;
  customOptions?: Partial<ChartOptions<'bar'>>;
}

export const BarChart = ({ 
  data, 
  height = 300, 
  horizontal = false,
  showLegend = true,
  showGrid = true,
  borderRadius = 6,
  isDark = false,
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
          return `${color}E6`;
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

  const baseOptions = isDark ? darkChartOptions : defaultChartOptions;
  
  const options: ChartOptions<'bar'> = {
    ...baseOptions,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    plugins: {
      ...baseOptions.plugins,
      legend: {
        ...baseOptions.plugins?.legend,
        display: showLegend,
      },
    },
    scales: {
      ...baseOptions.scales,
      x: {
        ...baseOptions.scales?.x,
        grid: {
          ...baseOptions.scales?.x?.grid,
          display: showGrid,
        },
      },
      y: {
        ...baseOptions.scales?.y,
        beginAtZero: true,
        grid: {
          ...baseOptions.scales?.y?.grid,
          display: showGrid,
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