import React from 'react';
import { MockPatient } from '../../lib/doctorMockData';
import PatientCard from './PatientCard';
import { AnimatePresence, motion } from 'framer-motion';

interface PatientListProps {
  patients: MockPatient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {patients.map((patient, index) => (
          <motion.div
            key={patient.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <PatientCard patient={patient} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PatientList;
