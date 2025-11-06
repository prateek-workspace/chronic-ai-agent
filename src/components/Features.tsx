import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, BarChart3, MessageSquare, Pill, Siren, BrainCircuit } from 'lucide-react';

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Activity className="w-10 h-10 text-brand-primary" />,
      title: t('features.f1Title'),
      description: t('features.f1Desc'),
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-brand-primary" />,
      title: t('features.f2Title'),
      description: t('features.f2Desc'),
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-brand-primary" />,
      title: t('features.f3Title'),
      description: t('features.f3Desc'),
    },
    {
      icon: <Pill className="w-10 h-10 text-brand-primary" />,
      title: t('features.f4Title'),
      description: t('features.f4Desc'),
    },
    {
      icon: <Siren className="w-10 h-10 text-brand-primary" />,
      title: t('features.f5Title'),
      description: t('features.f5Desc'),
    },
    {
      icon: <BrainCircuit className="w-10 h-10 text-brand-primary" />,
      title: t('features.f6Title'),
      description: t('features.f6Desc'),
    },
  ];

  return (
    <section id="features" className="py-24 bg-brand-background dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text-dark dark:text-white font-sans">{t('features.title')}</h2>
          <p className="text-lg text-brand-text-light dark:text-gray-300 font-serif mt-4 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-brand-primary-lighter dark:bg-gray-700">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-text-dark dark:text-white font-sans mb-3">{feature.title}</h3>
              <p className="text-brand-text-light dark:text-gray-400 font-serif leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
