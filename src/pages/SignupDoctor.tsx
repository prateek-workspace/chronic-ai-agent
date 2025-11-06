import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const SignupDoctor: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    clinicName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: 'doctor',
            name: formData.name,
            specialization: formData.specialization,
            clinic_name: formData.clinicName,
          }
        }
      });

      if (error) throw error;
      
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setMessage("User with this email already exists. Please log in.");
      } else {
        setMessage('Success! Please check your email to confirm your registration.');
      }

    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-text-dark dark:text-white font-sans">Doctor Registration</h1>
          <p className="text-brand-text-light dark:text-gray-300 font-serif mt-2">Create your professional account.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Dr. Jane Doe" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Email Address</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Password</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="specialization" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Specialization</label>
                <input type="text" id="specialization" value={formData.specialization} onChange={handleChange} placeholder="Cardiology" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>
              <div>
                <label htmlFor="clinicName" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Clinic/Hospital Name</label>
                <input type="text" id="clinicName" value={formData.clinicName} onChange={handleChange} placeholder="City General Hospital" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-brand-text-light dark:text-gray-400 font-serif">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-primary hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupDoctor;
