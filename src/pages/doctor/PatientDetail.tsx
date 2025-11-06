import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockPatientList, MockPatient } from '../../lib/doctorMockData';
import { ArrowLeft, User, Heart, Droplets, Footprints, Activity as ActivityIcon, MessageSquare, FileText } from 'lucide-react';
import VitalsChart from '../../components/dashboard/VitalsChart';
import { motion } from 'framer-motion';

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patient = mockPatientList.find(p => p.id === id);

  if (!patient) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Patient not found</h2>
        <Link to="/doctor" className="mt-4 inline-block text-brand-primary hover:underline">
          &larr; Back to Patient List
        </Link>
      </div>
    );
  }

  const vitals = [
    { icon: <Heart size={20} className="text-red-500" />, label: 'Blood Pressure', value: patient.vitals.bp, unit: 'mmHg' },
    { icon: <Droplets size={20} className="text-blue-500" />, label: 'Blood Sugar', value: patient.vitals.sugar, unit: 'mg/dL' },
    { icon: <ActivityIcon size={20} className="text-pink-500" />, label: 'Heart Rate', value: patient.vitals.hr, unit: 'bpm' },
    { icon: <Footprints size={20} className="text-green-500" />, label: 'Steps', value: patient.vitals.steps, unit: 'today' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Link to="/doctor" className="flex items-center gap-2 text-brand-primary font-semibold mb-6 hover:underline">
        <ArrowLeft size={18} />
        Back to All Patients
      </Link>

      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <img src={patient.avatar} alt={patient.name} className="w-20 h-20 rounded-full object-cover" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{patient.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{patient.age} years old, {patient.sex}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <button className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all">
                Send Message
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                Request Follow-up
            </button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <VitalsChart 
            bpData={patient.charts.bp}
            sugarData={patient.charts.sugar}
            stepsData={patient.charts.steps}
            hrData={patient.charts.hr}
          />
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FileText size={20} /> Medical Details
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong className="font-semibold text-gray-600 dark:text-gray-400">History:</strong> <span className="text-gray-800 dark:text-gray-200">{patient.medicalHistory}</span></p>
              <p><strong className="font-semibold text-gray-600 dark:text-gray-400">Medications:</strong> <span className="text-gray-800 dark:text-gray-200">{patient.medications}</span></p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <User size={20} /> Current Vitals
            </h3>
            <div className="space-y-4">
              {vitals.map(v => (
                <div key={v.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {v.icon}
                    <span className="font-semibold text-gray-600 dark:text-gray-300">{v.label}</span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-white">{v.value} <span className="text-xs text-gray-500">{v.unit}</span></span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brand-primary/10 dark:bg-brand-primary/20 p-6 rounded-2xl">
             <h3 className="text-xl font-bold text-brand-primary dark:text-brand-primary-lighter mb-4 flex items-center gap-2">
              <MessageSquare size={20} /> AI Generated Summary
            </h3>
            <p className="text-gray-700 dark:text-gray-200 italic">"{patient.aiSuggestion}"</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientDetail;
