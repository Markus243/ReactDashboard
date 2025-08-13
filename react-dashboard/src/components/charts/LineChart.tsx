import { Line } from 'react-chartjs-2';
import type { ChartData as ChartJSData, ChartOptions } from 'chart.js';
import { defaultChartOptions, chartColorPalette } from './chartConfig';

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
  customOptions?: Partial<ChartOptions<'line'>>;
}

export const LineChart = ({ 
  data, 
  height = 300, 
  showLegend = true,
  showGrid = true,
  smooth = true,
  customOptions = {}
}: LineChartProps) => {
  
  const chartData: ChartJSData<'line'> = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, index) => {
      const color = dataset.color || chartColorPalette[index % chartColorPalette.length];
      const fillColor = dataset.gradient ? `${color}15` : 'transparent';
      
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor: color,
        backgroundColor: dataset.fill !== false ? fillColor : 'transparent',
        borderWidth: 2.5,
        fill: dataset.fill !== false,
        tension: smooth ? 0.4 : 0,
        pointBackgroundColor: color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      };
    }),
  };

  const options: ChartOptions<'line'> = {
    ...defaultChartOptions,
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
      <Line data={chartData} options={options} />
    </div>
  );
};