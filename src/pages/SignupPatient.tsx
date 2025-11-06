import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const SignupPatient: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    sex: 'Prefer not to say',
    medicalHistory: '',
    medications: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            role: 'patient',
            name: formData.name,
            age: parseInt(formData.age, 10),
            sex: formData.sex,
            medical_history: formData.medicalHistory,
            medications: formData.medications
          }
        }
      });
      
      if (error) throw error;

      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setMessage("User with this email already exists. Please log in.");
        setStep(1); // Go back to first step to show message
      } else {
        setMessage('Success! Please check your email to confirm your registration.');
      }

    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-text-dark dark:text-white font-sans">Patient Registration</h1>
          <p className="text-brand-text-light dark:text-gray-300 font-serif mt-2">Let's set up your health profile.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-brand-text-dark dark:text-white font-sans mb-6">Step 1: Account Details</h2>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Full Name</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Email Address</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                </div>
                <div className="mb-8">
                  <label htmlFor="password" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Password</label>
                  <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-brand-text-dark dark:text-white font-sans mb-6">Step 2: Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="age" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Age</label>
                    <input type="number" id="age" value={formData.age} onChange={handleChange} placeholder="50" required className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                  </div>
                  <div>
                    <label htmlFor="sex" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Sex</label>
                    <select id="sex" value={formData.sex} onChange={handleChange} className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-brand-text-dark dark:text-white font-sans mb-6">Step 3: Medical History</h2>
                <div className="mb-6">
                  <label htmlFor="medicalHistory" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Past Medical History</label>
                  <textarea id="medicalHistory" value={formData.medicalHistory} onChange={handleChange} rows={4} placeholder="e.g., Type-2 Diabetes for 5 years, Hypertension" className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
                </div>
                <div className="mb-8">
                  <label htmlFor="medications" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Current Medications & Targets</label>
                  <textarea id="medications" value={formData.medications} onChange={handleChange} rows={4} placeholder="e.g., Metformin 500mg, Target BP < 130/80 mmHg" className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center mt-8">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="text-brand-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                  Back
                </button>
              ) : <div></div>}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
                  Next
                </button>
              ) : (
                <button type="submit" disabled={loading} className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
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

export default SignupPatient;
