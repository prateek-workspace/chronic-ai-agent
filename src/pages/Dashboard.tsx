import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import VitalStatCard from '../components/dashboard/VitalStatCard';
import AiAssistantCard from '../components/dashboard/AiAssistantCard';
import DataSyncCard from '../components/dashboard/DataSyncCard';
import VitalsChart from '../components/dashboard/VitalsChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { HealthData, processVitalsForCards, processVitalsForCharts, processRecentActivities, VitalCardData, ChartData, ActivityLogItem } from '../lib/dataProcessor';

const emptyVitals: VitalCardData[] = [
  { name: 'Blood Pressure', value: '--', unit: 'mmHg', trend: 'stable', change: 'No data' },
  { name: 'Heart Rate', value: '--', unit: 'bpm', trend: 'stable', change: 'No data' },
  { name: 'Blood Sugar', value: '--', unit: 'mg/dL', trend: 'stable', change: 'No data' },
  { name: 'Steps', value: '--', unit: 'today', trend: 'stable', change: 'No data' },
];

const emptyChartData: ChartData = {
  bp: { dates: [], systolic: [], diastolic: [] },
  sugar: { dates: [], values: [] },
  steps: { dates: [], values: [] },
  hr: { dates: [], values: [] },
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  const [processedVitals, setProcessedVitals] = useState<VitalCardData[]>(emptyVitals);
  const [chartData, setChartData] = useState<ChartData>(emptyChartData);
  const [recentActivities, setRecentActivities] = useState<ActivityLogItem[]>([]);

  const handleDataImport = (data: HealthData) => {
    setHealthData(data);
    setProcessedVitals(processVitalsForCards(data.vitals));
    setChartData(processVitalsForCharts(data.vitals));
    setRecentActivities(processRecentActivities(data));
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Welcome back, {user?.user_metadata.name || 'User'}!
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {healthData ? "Here's your health summary based on your latest import." : "Import your data to get started."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {processedVitals.map((vital, index) => (
          <VitalStatCard key={vital.name} vital={vital} index={index} />
        ))}
      </div>

      <div className="space-y-8">
        <AiAssistantCard />
        <DataSyncCard onDataImported={handleDataImport} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VitalsChart 
              bpData={chartData.bp}
              sugarData={chartData.sugar}
              stepsData={chartData.steps}
              hrData={chartData.hr}
            />
          </div>
          <div>
            <RecentActivity activities={recentActivities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
