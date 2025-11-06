import React from 'react';
import { useTranslation } from 'react-i18next';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-24 bg-brand-primary">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-sans mb-4">{t('howItWorks.title')}</h2>
        <p className="text-lg text-brand-primary-lighter font-serif mb-16 max-w-3xl mx-auto">
          {t('howItWorks.subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <div className="text-4xl font-bold text-brand-primary-light mb-4">01</div>
            <h3 className="text-2xl font-bold text-white font-sans mb-3">{t('howItWorks.step1Title')}</h3>
            <p className="text-brand-primary-lighter font-serif">{t('howItWorks.step1Desc')}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 transform md:scale-105 shadow-2xl">
             <div className="text-4xl font-bold text-brand-primary-light mb-4">02</div>
            <h3 className="text-2xl font-bold text-white font-sans mb-3">{t('howItWorks.step2Title')}</h3>
            <p className="text-brand-primary-lighter font-serif">{t('howItWorks.step2Desc')}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
             <div className="text-4xl font-bold text-brand-primary-light mb-4">03</div>
            <h3 className="text-2xl font-bold text-white font-sans mb-3">{t('howItWorks.step3Title')}</h3>
            <p className="text-brand-primary-lighter font-serif">{t('howItWorks.step3Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
