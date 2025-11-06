import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const DataSyncCard: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        alert(`File selected: ${file.name}. Upload logic to Supabase Storage would be implemented here.`);

        // TODO: Implement actual Supabase Storage upload
        // This requires a bucket to be created in your Supabase project.
        /*
        try {
            const { data, error } = await supabase.storage
                .from('reports') // Assumes a bucket named 'reports'
                .upload(`public/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) {
                throw error;
            }

            alert('File uploaded successfully!');
            console.log('Upload successful:', data);

        } catch (error: any) {
            console.error('Error uploading file:', error.message);
            alert(`Error uploading file: ${error.message}`);
        }
        */
    };

  const syncOptions = [
    { name: 'Apple Health', icon: '🍎' },
    { name: 'Google Fit', icon: '🇬' },
    { name: 'Fitbit', icon: '👣' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sync Your Health Data</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {syncOptions.map(opt => (
          <button key={opt.name} className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <span className="text-xl">{opt.icon}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{opt.name}</span>
          </button>
        ))}
        <button 
            onClick={handleUploadClick}
            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors"
        >
          <UploadCloud className="w-5 h-5" />
          <span className="font-semibold">Upload Report</span>
        </button>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
    </motion.div>
  );
};

export default DataSyncCard;
