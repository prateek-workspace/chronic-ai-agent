import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import { User, Heart, FileText } from 'lucide-react';

type PatientProfile = {
  name: string;
  age: number | string;
  sex: string;
  medical_history: string;
  medications: string;
};

const MyProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<PatientProfile>({
    name: '',
    age: '',
    sex: 'Prefer not to say',
    medical_history: '',
    medications: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          throw error;
        }

        if (data) {
          setProfile({
            name: data.name || user.user_metadata.name || '',
            age: data.age || '',
            sex: data.sex || 'Prefer not to say',
            medical_history: data.medical_history || '',
            medications: data.medications || '',
          });
        } else {
          // Fallback for new users whose profile might not be created yet
          setProfile(prev => ({ ...prev, name: user.user_metadata.name || '' }));
        }
      } catch (err: any) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Update the public.patients table
      const { error: profileError } = await supabase
        .from('patients')
        .update({
          name: profile.name,
          age: profile.age ? parseInt(String(profile.age), 10) : null,
          sex: profile.sex,
          medical_history: profile.medical_history,
          medications: profile.medications,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update the user's metadata in auth.users
      const { error: userError } = await supabase.auth.updateUser({
        data: { name: profile.name },
      });

      if (userError) throw userError;

      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Profile</h1>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-8">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">{success}</div>}

        {/* Personal Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input type="text" id="name" value={profile.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input type="email" id="email" value={user?.email || ''} disabled className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 cursor-not-allowed" />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
              <input type="number" id="age" value={profile.age} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
            </div>
            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sex</label>
              <select id="sex" value={profile.sex} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="dark:border-gray-700" />

        {/* Medical Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Medical Information</h2>
          </div>
          <div>
            <label htmlFor="medical_history" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Past Medical History</label>
            <textarea id="medical_history" value={profile.medical_history} onChange={handleChange} rows={4} placeholder="e.g., Type-2 Diabetes for 5 years, Hypertension" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
          </div>
          <div>
            <label htmlFor="medications" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Medications & Targets</label>
            <textarea id="medications" value={profile.medications} onChange={handleChange} rows={4} placeholder="e.g., Metformin 500mg, Target BP < 130/80 mmHg" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving || loading} className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default MyProfile;
