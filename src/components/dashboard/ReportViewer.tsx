import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, FileText, BarChart2, CheckCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { DetailedReport } from '../../types/reports';

interface ReportViewerProps {
  isOpen: boolean;
  onClose: () => void;
  report: DetailedReport;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ isOpen, onClose, report }) => {
  const VitalStatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'High': return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'Low': return <TrendingDown className="w-5 h-5 text-yellow-500" />;
      default: return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
              <header className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{report.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{report.date}</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </header>
              <main className="p-6 overflow-y-auto space-y-6">
                {/* AI Summary */}
                <section>
                    <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-brand-primary" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">AI Summary</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        {report.summary}
                    </p>
                </section>

                {/* Key Vitals */}
                <section>
                    <div className="flex items-center gap-3 mb-3">
                        <BarChart2 className="w-6 h-6 text-brand-primary" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Key Vitals</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {report.vitals.map(vital => (
                            <div key={vital.name} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{vital.name}</p>
                                    <p className="text-lg font-bold text-gray-800 dark:text-white">{vital.value}</p>
                                </div>
                                <VitalStatusIcon status={vital.status} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recommendations */}
                 <section>
                    <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="w-6 h-6 text-brand-primary" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Recommendations</h3>
                    </div>
                    <ul className="space-y-2">
                        {report.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300">{rec}</span>
                            </li>
                        ))}
                    </ul>
                </section>
              </main>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReportViewer;
