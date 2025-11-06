import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, AlertTriangle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Vital } from '../../lib/mockData';

interface AiAssistantCardProps {
  patientVitals: Vital[];
  patientProfile: {
    age?: number | string;
    sex?: string;
    medical_history?: string;
    medications?: string;
  };
}

const AiAssistantCard: React.FC<AiAssistantCardProps> = ({ patientVitals, patientProfile }) => {
  const [isAiEnabled, setIsAiEnabled] = useState(true);
  const [suggestion, setSuggestion] = useState<{ title: string; body: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSuggestion = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

      const prompt = `
        You are an empathetic AI health assistant for a patient with chronic conditions. Based on the following data, provide a concise, personalized, and actionable lifestyle suggestion.

        Patient Profile:
        - Age: ${patientProfile.age || 'Not provided'}
        - Sex: ${patientProfile.sex || 'Not provided'}
        - Medical History: ${patientProfile.medical_history || 'Not provided'}
        - Current Medications: ${patientProfile.medications || 'Not provided'}

        Latest Vitals Data:
        ${patientVitals.map(v => `- ${v.name}: ${v.value} ${v.unit} (Trend is ${v.trend})`).join('\n')}

        Your task:
        1. Analyze all the vitals to identify the single most important health concern right now (e.g., high blood sugar, low activity, rising blood pressure).
        2. Provide a suggestion that is safe, easy to understand, and directly addresses that primary concern.
        3. Format the response as follows, and only as follows:
           - Line 1: A short, encouraging title (e.g., "A small step for your heart" or "A quick tip for your sugar levels").
           - After that, the detailed suggestion (e.g., "Your blood pressure is a bit high. Try swapping your usual snack for a piece of fruit today and go for a 15-minute walk after dinner.").
        4. Do NOT add any extra text, disclaimers, or conversational filler. The response must only contain the title and the suggestion.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const [title, ...bodyParts] = text.split('\n').filter(Boolean);
      const body = bodyParts.join('\n');
      
      setSuggestion({ title: title || "AI Health Suggestion", body });

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate suggestion. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Sparkles className="w-12 h-12 text-brand-primary-lighter" />
          </motion.div>
          <p className="mt-4 font-semibold text-brand-primary-lighter">Generating AI insights...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8 text-red-200">
          <AlertTriangle className="w-12 h-12 mx-auto" />
          <p className="mt-4 font-semibold">An Error Occurred</p>
          <p className="text-sm mt-1 mb-4 max-w-sm mx-auto">{error}</p>
          <button
            onClick={handleGenerateSuggestion}
            className="bg-white/20 text-white font-bold py-2 px-6 rounded-lg hover:bg-white/30 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (suggestion) {
      return (
        <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="bg-white/20 p-4 rounded-full">
                <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{suggestion.title}</h3>
                <p className="text-brand-primary-lighter leading-relaxed whitespace-pre-wrap">{suggestion.body}</p>
                 <button
                    onClick={handleGenerateSuggestion}
                    className="mt-6 bg-white text-brand-primary font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                    <span className="flex items-center gap-2">
                        <Sparkles size={16} />
                        Generate New Suggestion
                    </span>
                </button>
            </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <Lightbulb className="w-12 h-12 mx-auto text-brand-primary-lighter" />
        <h3 className="text-2xl font-bold mt-4">Get Personalized Advice</h3>
        <p className="text-brand-primary-lighter mt-2 mb-6">Click the button to let our AI analyze your latest data and provide a custom suggestion.</p>
        <button
          onClick={handleGenerateSuggestion}
          className="bg-white text-brand-primary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={18} />
            Generate AI Suggestion
          </span>
        </button>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-brand-primary/90 dark:bg-brand-primary text-white p-6 rounded-2xl shadow-lg"
    >
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">AI Suggestions</h3>
            <div className="flex items-center gap-3">
                <label htmlFor="ai-toggle" className={`text-sm font-semibold transition-colors ${isAiEnabled ? 'text-white' : 'text-gray-400'}`}>
                    {isAiEnabled ? 'Enabled' : 'Disabled'}
                </label>
                <input 
                    id="ai-toggle"
                    type="checkbox" 
                    checked={isAiEnabled}
                    onChange={() => setIsAiEnabled(!isAiEnabled)} 
                    className="toggle-checkbox" 
                />
            </div>
        </div>

        {isAiEnabled ? (
            renderContent()
        ) : (
            <div className="text-center py-8 text-gray-400">
                <Lightbulb className="w-12 h-12 mx-auto" />
                <p className="mt-4 font-semibold">AI suggestions are turned off.</p>
                <p className="text-sm">Enable the toggle to get personalized advice.</p>
            </div>
        )}
    </motion.div>
  );
};

export default AiAssistantCard;
