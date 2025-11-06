import React from 'react';
import { MockPatient } from '../../lib/doctorMockData';
import { useNavigate } from 'react-router-dom';
import { Heart, Droplets, Footprints, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface PatientCardProps {
  patient: MockPatient;
}

const statusConfig = {
  normal: {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    bgColor: 'bg-green-100 dark:bg-green-500/10',
    textColor: 'text-green-700 dark:text-green-300',
    borderColor: 'border-green-300 dark:border-green-500/30',
    label: 'Normal'
  },
  attention: {
    icon: <Info className="w-5 h-5 text-yellow-500" />,
    bgColor: 'bg-yellow-100 dark:bg-yellow-500/10',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    borderColor: 'border-yellow-300 dark:border-yellow-500/30',
    label: 'Attention'
  },
  alert: {
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    bgColor: 'bg-red-100 dark:bg-red-500/10',
    textColor: 'text-red-700 dark:text-red-300',
    borderColor: 'border-red-400 dark:border-red-500/40',
    label: 'Alert'
  }
};

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const navigate = useNavigate();
  const config = statusConfig[patient.status];

  return (
    <div 
      onClick={() => navigate(`/doctor/patient/${patient.id}`)}
      className={`bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-l-4 ${config.borderColor}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img src={patient.avatar} alt={patient.name} className="w-14 h-14 rounded-full object-cover" />
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{patient.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{patient.age}, {patient.sex}</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}>
          {config.icon}
          <span>{config.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Heart size={16} className="text-red-500" />
          <span>BP: <span className="font-bold text-gray-800 dark:text-white">{patient.vitals.bp}</span></span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Droplets size={16} className="text-blue-500" />
          <span>Sugar: <span className="font-bold text-gray-800 dark:text-white">{patient.vitals.sugar}</span></span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Heart size={16} className="text-pink-500" />
          <span>HR: <span className="font-bold text-gray-800 dark:text-white">{patient.vitals.hr}</span></span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Footprints size={16} className="text-green-500" />
          <span>Steps: <span className="font-bold text-gray-800 dark:text-white">{patient.vitals.steps}</span></span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">AI Suggestion:</p>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 italic">"{patient.aiSuggestion}"</p>
      </div>
    </div>
  );
};

export default PatientCard;
