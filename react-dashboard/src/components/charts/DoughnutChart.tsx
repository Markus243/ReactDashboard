import { Doughnut } from 'react-chartjs-2';
import type { ChartData as ChartJSData, ChartOptions } from 'chart.js';
import { defaultChartOptions, darkChartOptions, chartColorPalette } from './chartConfig';

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
  isDark?: boolean;
  customOptions?: Partial<ChartOptions<'doughnut'>>;
}

export const DoughnutChart = ({ 
  data, 
  height = 300,
  showLegend = true,
  cutout = '60%',
  isDark = false,
  customOptions = {}
}: DoughnutChartProps) => {
  
  const chartData: ChartJSData<'doughnut'> = {
    labels: data.labels,
    datasets: [{
      data: data.data,
      backgroundColor: data.colors || chartColorPalette.map(color => `${color}E6`),
      borderColor: data.colors || chartColorPalette,
      borderWidth: 2,
      hoverBorderWidth: 3,
    }],
  };

  const baseOptions = isDark ? darkChartOptions : defaultChartOptions;
  
  const options: ChartOptions<'doughnut'> = {
    ...baseOptions,
    cutout,
    plugins: {
      ...baseOptions.plugins,
      legend: {
        ...baseOptions.plugins?.legend,
        display: showLegend,
        position: 'bottom',
        labels: {
          ...baseOptions.plugins?.legend?.labels,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels?.length && data.datasets?.[0]) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i] as number;
                const total = (data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: (data.datasets[0].backgroundColor as string[])?.[i] || '#64748b',
                  strokeStyle: (data.datasets[0].borderColor as string[])?.[i] || '#64748b',
                  lineWidth: 0,
                  pointStyle: 'rectRounded' as const,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        },
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