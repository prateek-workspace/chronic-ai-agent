import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, UserPlus } from 'lucide-react';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInvite = () => {
    // Here you would typically call a backend function to send an invite
    console.log(`Inviting patient with email: ${email}`);
    setMessage(`An invitation has been sent to ${email}. They will appear in your patient list once they register.`);
    // Keep the modal open to show the message
  };

  const handleClose = () => {
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
              <header className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                  <UserPlus size={24} className="text-brand-primary" />
                  Add a New Patient
                </h2>
                <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </header>
              <main className="p-6 space-y-6">
                {message ? (
                    <div className="text-center p-4 bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-200 rounded-lg">
                        <p>{message}</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 dark:text-gray-300">
                            Enter the email address of the patient you wish to invite. They will receive an email with instructions on how to create their account and connect with you.
                        </p>
                        <div>
                            <label htmlFor="patient-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Patient's Email Address</label>
                            <input 
                                type="email" 
                                id="patient-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="patient@example.com"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                    </>
                )}
              </main>
              <footer className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4 rounded-b-2xl">
                <button onClick={handleClose} className="px-6 py-2 font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    Close
                </button>
                {!message && (
                    <button onClick={handleInvite} className="px-6 py-2 font-semibold text-white bg-brand-primary rounded-lg shadow-md hover:bg-opacity-90 transition-colors disabled:opacity-50" disabled={!email}>
                        Send Invitation
                    </button>
                )}
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddPatientModal;
