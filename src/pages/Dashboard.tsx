import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import VitalStatCard from '../components/dashboard/VitalStatCard';
import AiAssistantCard from '../components/dashboard/AiAssistantCard';
import DataSyncCard from '../components/dashboard/DataSyncCard';
import VitalsChart from '../components/dashboard/VitalsChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { supabase } from '../lib/supabaseClient';
import {
  generateVitals,
  generateRecentActivities,
  generateBloodPressureChartData,
  generateSugarChartData,
  generateStepsChartData,
  generateHeartRateChartData,
} from '../lib/mockData';

type PatientProfile = {
  age?: number | string;
  sex?: string;
  medical_history?: string;
  medications?: string;
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { addNotification, notifications } = useNotifications();
  const [profile, setProfile] = useState<PatientProfile>({});

  // Simulate real-time notifications
  useEffect(() => {
    const hasHighBPSimulated = notifications.some(n => n.title === 'Simulated: High BP');
    if (!hasHighBPSimulated) {
        const timer = setTimeout(() => {
        addNotification({
            type: 'alert',
            title: 'Simulated: High BP',
            message: 'Your latest blood pressure reading (150/95 mmHg) is above your target range. Please rest and monitor.'
        });
        }, 5000); 

        return () => clearTimeout(timer);
    }
  }, [addNotification, notifications]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('patients')
          .select('age, sex, medical_history, medications')
          .eq('id', user.id)
          .single();
        if (error && error.code !== 'PGRST116') throw error;
        if (data) setProfile(data);
      } catch (err) {
        console.error("Failed to load patient profile for AI context.", err);
      }
    };
    fetchProfile();
  }, [user]);

  const vitals = generateVitals();
  const activities = generateRecentActivities();
  const bpChartData = generateBloodPressureChartData();
  const sugarChartData = generateSugarChartData();
  const stepsChartData = generateStepsChartData();
  const hrChartData = generateHeartRateChartData();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Welcome back, {user?.user_metadata.name || 'User'}!
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Here's your health summary for today. Keep up the great work!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {vitals.map((vital, index) => (
          <VitalStatCard key={vital.name} vital={vital} index={index} />
        ))}
      </div>

      <div className="space-y-8">
        <AiAssistantCard patientVitals={vitals} patientProfile={profile} />
        <DataSyncCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VitalsChart 
              bpData={bpChartData}
              sugarData={sugarChartData}
              stepsData={stepsChartData}
              hrData={hrChartData}
            />
          </div>
          <div>
            <RecentActivity activities={activities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
