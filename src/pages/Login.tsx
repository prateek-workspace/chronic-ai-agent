import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { User, Stethoscope } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      const actualRole = data.user?.user_metadata.role;

      if (actualRole !== role) {
        throw new Error(`Login failed. You are trying to log in as a ${role}, but you are registered as a ${actualRole}.`);
      }
      
      if (actualRole === 'doctor') {
        navigate('/doctor');
      } else {
        navigate('/dashboard');
      }

    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const RoleButton = ({
    selectedRole,
    targetRole,
    onClick,
    icon,
    label
  }: {
    selectedRole: 'patient' | 'doctor';
    targetRole: 'patient' | 'doctor';
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }) => {
    const isActive = selectedRole === targetRole;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex-1 flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
          isActive
            ? 'bg-brand-primary/10 border-brand-primary shadow-inner'
            : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
      >
        <div className={`transition-colors ${isActive ? 'text-brand-primary' : 'text-gray-500 dark:text-gray-400'}`}>
          {icon}
        </div>
        <span className={`mt-2 font-semibold text-sm transition-colors ${isActive ? 'text-brand-primary' : 'text-gray-700 dark:text-gray-300'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-text-dark dark:text-white font-sans">Welcome Back</h1>
          <p className="text-brand-text-light dark:text-gray-300 font-serif mt-2">Log in to your Chronic AI account.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}
            
            <div className="mb-6">
              <label className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-3 text-center">I am logging in as a...</label>
              <div className="flex gap-4">
                <RoleButton 
                  selectedRole={role}
                  targetRole="patient"
                  onClick={() => setRole('patient')}
                  icon={<User size={24} />}
                  label="Patient"
                />
                <RoleButton 
                  selectedRole={role}
                  targetRole="doctor"
                  onClick={() => setRole('doctor')}
                  icon={<Stethoscope size={24} />}
                  label="Doctor"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                required
                className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" 
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" 
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-brand-text-light dark:text-gray-400 font-serif">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-brand-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
