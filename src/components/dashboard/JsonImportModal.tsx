import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Upload, FileJson, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { HealthData } from '../../lib/dataProcessor';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { DetailedReport } from '../../types/reports';
import { format } from 'date-fns';

interface JsonImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (data: HealthData) => void;
}

const sampleJson: HealthData = {
  vitals: [
    { date: "2025-10-28T09:00:00Z", type: "blood_pressure", value: { systolic: 142, diastolic: 90 }, unit: "mmHg" },
    { date: "2025-10-27T09:05:00Z", type: "blood_pressure", value: { systolic: 138, diastolic: 88 }, unit: "mmHg" },
    { date: "2025-10-28T08:30:00Z", type: "blood_sugar", value: 152, unit: "mg/dL" },
    { date: "2025-10-27T08:30:00Z", type: "blood_sugar", value: 165, unit: "mg/dL" },
    { date: "2025-10-28T18:00:00Z", type: "heart_rate", value: 75, unit: "bpm" },
    { date: "2025-10-27T18:00:00Z", type: "heart_rate", value: 76, unit: "bpm" },
    { date: "2025-10-28T19:00:00Z", type: "steps", value: 4386, unit: "steps" },
    { date: "2025-10-27T19:00:00Z", type: "steps", value: 5041, unit: "steps" },
  ],
  activity: { date: "2025-10-28", steps: 4386, calories_burned: 1800 },
  sleep: { date: "2025-10-27", duration_hours: 6.5, quality: "fair" },
  medications: [{ name: "Metformin", dosage: "500mg", timestamp: "2025-10-28T08:00:00Z", status: "taken" }],
};

const JsonImportModal: React.FC<JsonImportModalProps> = ({ isOpen, onClose, onImportSuccess }) => {
  const { user } = useAuth();
  const [jsonInput, setJsonInput] = useState('');
  const [showSample, setShowSample] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleImport = async () => {
    if (!user) {
      setStatus({ type: 'error', message: 'You must be logged in to import data.' });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    let parsedData: HealthData;
    try {
      parsedData = JSON.parse(jsonInput);
    } catch (error) {
      setStatus({ type: 'error', message: 'Invalid JSON format. Please check your data and try again.' });
      setIsLoading(false);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        You are a medical report generation AI. Analyze the following health data JSON and generate a structured JSON report.

        Raw Data:
        ${JSON.stringify(parsedData, null, 2)}

        Your task is to return a JSON object with the following structure and content:
        - "name": "Comprehensive Health Analysis"
        - "date": The most recent date from the provided data, formatted as "Month Day, Year".
        - "type": "Comprehensive Analysis"
        - "summary": A concise, insightful summary (2-3 sentences) of the patient's overall health status based on the data.
        - "vitals": An array of objects for the most recent reading of each key vital (Blood Pressure, Blood Sugar, Heart Rate, Daily Steps). Each object should have "name", "value" (as a string), and "status" ('Normal', 'High', 'Low', 'Attention').
        - "recommendations": An array of 3-4 actionable, personalized recommendations based on the analysis.

        Return ONLY the valid JSON object. Do not include any extra text, markdown formatting like \`\`\`json, or explanations.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      let reportData: DetailedReport;
      try {
        // Clean the response to ensure it's valid JSON
        const cleanedText = responseText.replace(/```json|```/g, '').trim();
        reportData = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("Failed to parse Gemini response as JSON. Raw response:", responseText);
        throw new Error("The AI returned an invalid format. Please try again.");
      }

      const { error: dbError } = await supabase
        .from('health_reports')
        .insert({
          patient_id: user.id,
          raw_data: parsedData as any,
          report_data: reportData as any,
          report_name: `Health Report - ${format(new Date(), 'yyyy-MM-dd HH:mm')}`,
        });

      if (dbError) throw dbError;

      onImportSuccess(parsedData);
      setStatus({ type: 'success', message: 'Report generated and saved! The dashboard will now update.' });
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error: any) {
      console.error("Report generation/storage failed:", error);
      setStatus({ type: 'error', message: error.message || 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setJsonInput('');
    setShowSample(false);
    setStatus(null);
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl">
              <header className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                  <FileJson size={24} className="text-brand-primary" />
                  Import Data & Generate Report
                </h2>
                <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </header>
              <main className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {status && !isLoading && (
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${status.type === 'success' ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-200'}`}>
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                    <p className="font-semibold">{status.message}</p>
                  </div>
                )}
                {isLoading ? (
                    <div className="text-center py-8">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-block">
                            <Sparkles className="w-12 h-12 text-brand-primary" />
                        </motion.div>
                        <p className="mt-4 font-semibold text-brand-primary dark:text-brand-primary-lighter">Generating AI Report & Saving...</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 dark:text-gray-300">
                        Paste your health data below. This will generate a new AI-powered report and save it to your account.
                        </p>
                        <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder='{ "vitals": [ ... ] }'
                        className="w-full h-48 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                        <div className="text-center">
                        <button onClick={() => setShowSample(!showSample)} className="text-sm text-brand-primary hover:underline font-semibold">
                            {showSample ? 'Hide Sample JSON' : 'View Sample JSON Format'}
                        </button>
                        </div>
                        {showSample && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-xs font-mono overflow-auto max-h-64">
                            {JSON.stringify(sampleJson, null, 2)}
                            </pre>
                        </motion.div>
                        )}
                    </>
                )}
              </main>
              <footer className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4 rounded-b-2xl">
                <button onClick={handleClose} className="px-6 py-2 font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <button onClick={handleImport} className="px-6 py-2 font-semibold text-white bg-brand-primary rounded-lg shadow-md hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2" disabled={!jsonInput || isLoading}>
                  <Upload size={18} />
                  {isLoading ? 'Processing...' : 'Import & Generate'}
                </button>
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JsonImportModal;
