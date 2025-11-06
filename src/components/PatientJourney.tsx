import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartPulse, TrendingUp, MessageCircle, ShieldAlert, UserCheck } from 'lucide-react';

const PatientJourney: React.FC = () => {
  const { t } = useTranslation();

  const journeySteps = [
    {
      icon: <HeartPulse className="w-8 h-8 text-white" />,
      title: t('patientJourney.step1Title'),
      description: t('patientJourney.step1Desc'),
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: t('patientJourney.step2Title'),
      description: t('patientJourney.step2Desc'),
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: t('patientJourney.step3Title'),
      description: t('patientJourney.step3Desc'),
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-white" />,
      title: t('patientJourney.step4Title'),
      description: t('patientJourney.step4Desc'),
    },
    {
      icon: <UserCheck className="w-8 h-8 text-white" />,
      title: t('patientJourney.step5Title'),
      description: t('patientJourney.step5Desc'),
    },
  ];

  return (
    <section id="patient-journey" className="py-24 bg-brand-background-alt dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text-dark dark:text-white font-sans">{t('patientJourney.title')}</h2>
          <p className="text-lg text-brand-text-light dark:text-gray-300 font-serif mt-4 max-w-3xl mx-auto">
            {t('patientJourney.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 h-full w-0.5 bg-brand-primary-lighter dark:bg-gray-700" aria-hidden="true"></div>

            <div className="space-y-12">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative pl-16 md:pl-20">
                  {/* Icon and circle */}
                  <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-brand-primary rounded-full shadow-md">
                    {step.icon}
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-brand-text-dark dark:text-white font-sans mb-2">{step.title}</h3>
                    <p className="text-brand-text-light dark:text-gray-400 font-serif leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientJourney;
