import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { BloodPressureChartData, SingleValueChartData } from '../../lib/mockData';
import { useTheme } from '../../hooks/useTheme';
import { HeartPulse, Droplets, Footprints, Activity } from 'lucide-react';

type ChartType = 'bp' | 'sugar' | 'steps' | 'hr';

interface VitalsChartProps {
  bpData: BloodPressureChartData;
  sugarData: SingleValueChartData;
  stepsData: SingleValueChartData;
  hrData: SingleValueChartData;
}

const chartConfig = {
  bp: { 
    title: 'Weekly Blood Pressure Trend', 
    unit: 'mmHg', 
    icon: HeartPulse,
    series: [
      { name: 'Systolic', color: '#5C2E91', areaColor: 'rgba(92, 46, 145, 0.4)' },
      { name: 'Diastolic', color: '#C399FF', areaColor: 'rgba(195, 153, 255, 0.3)' }
    ]
  },
  sugar: { 
    title: 'Weekly Blood Sugar Trend', 
    unit: 'mg/dL', 
    icon: Droplets,
    series: [{ name: 'Blood Sugar', color: '#EF4444', areaColor: 'rgba(239, 68, 68, 0.4)' }]
  },
  steps: { 
    title: 'Weekly Steps Trend', 
    unit: 'steps', 
    icon: Footprints,
    series: [{ name: 'Steps', color: '#22C55E', areaColor: 'rgba(34, 197, 94, 0.4)' }]
  },
  hr: { 
    title: 'Weekly Heart Rate Trend', 
    unit: 'bpm', 
    icon: Activity,
    series: [{ name: 'Heart Rate', color: '#3B82F6', areaColor: 'rgba(59, 130, 246, 0.4)' }]
  }
};

const VitalsChart: React.FC<VitalsChartProps> = ({ bpData, sugarData, stepsData, hrData }) => {
  const [theme] = useTheme();
  const [activeChart, setActiveChart] = useState<ChartType>('bp');

  const getChartOptions = () => {
    const config = chartConfig[activeChart];
    let data;
    let seriesOptions: any[];

    switch(activeChart) {
      case 'bp':
        data = bpData;
        seriesOptions = [
          {
            name: config.series[0].name,
            data: data.systolic,
            type: 'line',
            smooth: true,
            color: config.series[0].color,
            areaStyle: {
                color: {
                    type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: config.series[0].areaColor }, { offset: 1, color: 'rgba(0,0,0,0)' }]
                }
            },
            showSymbol: false,
          },
          {
            name: config.series[1].name,
            data: data.diastolic,
            type: 'line',
            smooth: true,
            color: config.series[1].color,
            areaStyle: {
                color: {
                    type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: config.series[1].areaColor }, { offset: 1, color: 'rgba(0,0,0,0)' }]
                }
            },
            showSymbol: false,
          }
        ];
        break;
      case 'sugar':
      case 'steps':
      case 'hr':
        data = activeChart === 'sugar' ? sugarData : activeChart === 'steps' ? stepsData : hrData;
        seriesOptions = [{
            name: config.series[0].name, 
            data: data.values, 
            type: 'line', 
            smooth: true, 
            color: config.series[0].color, 
            areaStyle: {
                color: {
                    type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [{ offset: 0, color: config.series[0].areaColor }, { offset: 1, color: 'rgba(0,0,0,0)' }]
                }
            },
            showSymbol: false 
        }];
        break;
      default:
        return {};
    }

    return {
      grid: { top: 70, right: 30, bottom: 30, left: 50 },
      tooltip: {
        trigger: 'axis',
        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
        borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
        textStyle: { color: theme === 'dark' ? '#F9FAFB' : '#1F2937' }
      },
      xAxis: {
        type: 'category',
        data: data.dates,
        axisLine: { lineStyle: { color: theme === 'dark' ? '#4B5563' : '#D1D5DB' } },
        axisLabel: { color: theme === 'dark' ? '#9CA3AF' : '#6B7280' },
      },
      yAxis: {
        type: 'value',
        name: config.unit,
        nameTextStyle: { color: theme === 'dark' ? '#9CA3AF' : '#6B7280', padding: [0, 0, 0, -30] },
        splitLine: { lineStyle: { color: theme === 'dark' ? '#374151' : '#E5E7EB' } },
        axisLabel: { color: theme === 'dark' ? '#9CA3AF' : '#6B7280' },
      },
      series: seriesOptions,
      legend: {
        data: config.series.map(s => s.name),
        right: 10,
        top: 30,
        textStyle: { color: theme === 'dark' ? '#D1D5DB' : '#374151' }
      },
    };
  };

  const ToggleButton: React.FC<{ type: ChartType }> = ({ type }) => {
    const config = chartConfig[type];
    const isActive = activeChart === type;
    return (
      <button
        onClick={() => setActiveChart(type)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm ${
          isActive
            ? 'bg-brand-primary text-white shadow-md'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        <config.icon size={16} />
        <span>{config.series.map(s => s.name).join(' & ')}</span>
      </button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{chartConfig[activeChart].title}</h3>
        <div className="flex flex-wrap gap-2">
          <ToggleButton type="bp" />
          <ToggleButton type="sugar" />
          <ToggleButton type="steps" />
          <ToggleButton type="hr" />
        </div>
      </div>
      <ReactECharts option={getChartOptions()} style={{ height: '300px' }} theme={theme === 'dark' ? 'dark' : 'light'} />
    </motion.div>
  );
};

export default VitalsChart;
