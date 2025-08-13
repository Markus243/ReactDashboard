import { Doughnut } from 'react-chartjs-2';
import type { ChartData as ChartJSData, ChartOptions } from 'chart.js';
import { defaultChartOptions, chartColorPalette } from './chartConfig';

export interface DoughnutChartData {
  labels: string[];
  data: number[];
  colors?: string[];
}

interface DoughnutChartProps {
  data: DoughnutChartData;
  height?: number;
  showLegend?: boolean;
  cutout?: string;
  customOptions?: Partial<ChartOptions<'doughnut'>>;
}

export const DoughnutChart = ({ 
  data, 
  height = 300,
  showLegend = true,
  cutout = '60%',
  customOptions = {}
}: DoughnutChartProps) => {
  
  const chartData: ChartJSData<'doughnut'> = {
    labels: data.labels,
    datasets: [{
      data: data.data,
      backgroundColor: data.colors || chartColorPalette.map(color => `${color}90`),
      borderColor: data.colors || chartColorPalette,
      borderWidth: 2,
      hoverBorderWidth: 3,
    }],
  };

  const options: ChartOptions<'doughnut'> = {
    ...defaultChartOptions,
    cutout,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        display: showLegend,
        position: 'right',
      },
    },
    ...customOptions,
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};