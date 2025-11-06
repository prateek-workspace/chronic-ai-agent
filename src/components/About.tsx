import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-brand-background-light dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
              alt="Doctor reviewing patient data on a tablet" 
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text-dark dark:text-white font-sans mb-6">{t('about.title')}</h2>
            <p className="text-lg font-serif text-brand-text-light dark:text-gray-300 mb-4 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-lg font-serif text-brand-text-light dark:text-gray-300 mb-8 leading-relaxed">
              {t('about.p2')}
            </p>
            <a href="#contact" className="bg-brand-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
              {t('about.empowerButton')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
