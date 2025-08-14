import { Line } from 'react-chartjs-2';
import type { ChartData as ChartJSData, ChartOptions } from 'chart.js';
import { defaultChartOptions, darkChartOptions, chartColorPalette } from './chartConfig';

export interface LineChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color?: string;
    gradient?: boolean;
    fill?: boolean;
  }>;
}

interface LineChartProps {
  data: LineChartData;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  smooth?: boolean;
  isDark?: boolean;
  customOptions?: Partial<ChartOptions<'line'>>;
}

export const LineChart = ({ 
  data, 
  height = 300, 
  showLegend = true,
  showGrid = true,
  smooth = true,
  isDark = false,
  customOptions = {}
}: LineChartProps) => {
  
  const chartData: ChartJSData<'line'> = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, index) => {
      const color = dataset.color || chartColorPalette[index % chartColorPalette.length];
      const fillColor = dataset.fill !== false ? `${color}15` : 'transparent';
      
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor: color,
        backgroundColor: dataset.fill !== false ? fillColor : 'transparent',
        borderWidth: 2,
        fill: dataset.fill !== false,
        tension: smooth ? 0.4 : 0,
        pointBackgroundColor: color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      };
    }),
  };

  const baseOptions = isDark ? darkChartOptions : defaultChartOptions;
  
  const options: ChartOptions<'line'> = {
    ...baseOptions,
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
      <Line data={chartData} options={options} />
    </div>
  );
};