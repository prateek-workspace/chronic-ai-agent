import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockPatientList, MockPatient } from '../../lib/doctorMockData';
import PatientList from '../../components/doctor/PatientList';
import { PlusCircle, Search } from 'lucide-react';
import AddPatientModal from '../../components/doctor/AddPatientModal';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<MockPatient[]>(mockPatientList);
  const [filter, setFilter] = useState<'all' | 'attention' | 'alert'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = patients.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const getFilterClasses = (buttonFilter: typeof filter) => {
    return filter === buttonFilter
      ? 'bg-brand-primary text-white'
      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600';
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, Dr. {user?.user_metadata.name?.split(' ').pop() || 'Doctor'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Here is an overview of your patients today.
        </p>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-md font-semibold transition-colors ${getFilterClasses('all')}`}>All Patients</button>
                <button onClick={() => setFilter('attention')} className={`px-4 py-2 rounded-md font-semibold transition-colors ${getFilterClasses('attention')}`}>Needs Attention</button>
                <button onClick={() => setFilter('alert')} className={`px-4 py-2 rounded-md font-semibold transition-colors ${getFilterClasses('alert')}`}>Alerts</button>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input type="text" placeholder="Search patients..." className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-brand-primary text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all">
                    <PlusCircle size={20} />
                    <span>Add Patient</span>
                </button>
            </div>
        </div>

        <PatientList patients={filteredPatients} />
      </div>
      <AddPatientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default DoctorDashboard;
