import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, FileText, ServerCrash } from 'lucide-react';
import ReportViewer from '../../components/dashboard/ReportViewer';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { DetailedReport } from '../../types/reports';
import { format } from 'date-fns';

interface StoredReport {
  id: number;
  report_name: string;
  created_at: string;
  report_data: DetailedReport;
}

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<StoredReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<DetailedReport | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('health_reports')
          .select('id, report_name, created_at, report_data')
          .eq('patient_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        
        setReports(data as StoredReport[]);
      } catch (err: any) {
        setError('Failed to fetch health reports.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user]);

  const handleViewReport = (reportData: DetailedReport) => {
    setSelectedReport(reportData);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedReport(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center p-12 text-gray-500">
          <p>Loading your reports...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center p-12 text-red-500">
            <ServerCrash className="w-12 h-12 mx-auto mb-4" />
            <p className="font-semibold">{error}</p>
        </div>
      );
    }
    if (reports.length === 0) {
      return (
        <div className="text-center p-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4" />
            <p className="font-semibold">No reports found.</p>
            <p>Import your health data on the dashboard to generate your first report.</p>
        </div>
      );
    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Report Name</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Date Generated</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Type</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <motion.tr
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="p-4 flex items-center">
                  <FileText className="w-5 h-5 mr-3 text-brand-primary flex-shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-100">{report.report_name}</span>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{format(new Date(report.created_at), 'MMM d, yyyy')}</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300">
                    {report.report_data.type}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleViewReport(report.report_data)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="View report"
                  >
                    <Eye className="w-5 h-5 text-gray-500" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your Health Reports</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Review your AI-generated health reports based on the data you've imported.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {renderContent()}
        </div>
      </motion.div>

      {selectedReport && (
        <ReportViewer 
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
          report={selectedReport}
        />
      )}
    </>
  );
};

export default Reports;
