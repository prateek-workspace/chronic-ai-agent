import React from 'react';
import { useTranslation } from 'react-i18next';

const CTA: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-brand-background-alt dark:bg-gray-800 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-text-dark dark:text-white font-sans mb-6">{t('cta.title')}</h2>
        <p className="text-lg text-brand-text-light dark:text-gray-300 font-serif mb-8 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <a href="#contact" className="bg-brand-primary text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 text-xl">
          {t('cta.button')}
        </a>
      </div>
    </section>
  );
};

export default CTA;
