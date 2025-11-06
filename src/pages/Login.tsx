import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
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
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
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
