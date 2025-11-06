import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, User } from 'lucide-react';

const Signup: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-brand-background dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text-dark dark:text-white font-sans mb-4">
          Join Chronic AI
        </h1>
        <p className="text-lg text-brand-text-light dark:text-gray-300 font-serif mb-12 max-w-2xl mx-auto">
          Choose your role to get started. Are you a patient looking to manage your health, or a doctor aiming to provide better care?
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          <Link to="/signup-patient" className="flex-1 group">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 hover:-translate-y-2 transition-all duration-300 text-center border-t-4 border-transparent group-hover:border-brand-primary">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-brand-primary-lighter dark:bg-gray-700 mx-auto transition-colors duration-300 group-hover:bg-brand-primary">
                <User className="w-10 h-10 text-brand-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h2 className="text-3xl font-bold text-brand-text-dark dark:text-white font-sans mb-3">I'm a Patient</h2>
              <p className="text-brand-text-light dark:text-gray-400 font-serif leading-relaxed">
                Take control of your health with continuous monitoring and personalized AI-driven feedback.
              </p>
            </div>
          </Link>
          <Link to="/signup-doctor" className="flex-1 group">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 hover:-translate-y-2 transition-all duration-300 text-center border-t-4 border-transparent group-hover:border-brand-primary">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-brand-primary-lighter dark:bg-gray-700 mx-auto transition-colors duration-300 group-hover:bg-brand-primary">
                <Stethoscope className="w-10 h-10 text-brand-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h2 className="text-3xl font-bold text-brand-text-dark dark:text-white font-sans mb-3">I'm a Doctor</h2>
              <p className="text-brand-text-light dark:text-gray-400 font-serif leading-relaxed">
                Manage your patients efficiently with an AI assistant that tracks, analyzes, and escalates when needed.
              </p>
            </div>
          </Link>
        </div>
         <div className="mt-12">
            <p className="text-brand-text-light dark:text-gray-400 font-serif">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-primary hover:underline">
                Log In
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
