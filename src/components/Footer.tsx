import React from 'react';
import { useTranslation } from 'react-i18next';
import { Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-background-light dark:bg-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-brand-primary font-sans mb-4">{t('brandName')}</h3>
            <p className="text-brand-text-light dark:text-gray-400 font-serif max-w-xs">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="font-sans font-bold text-brand-text-dark dark:text-white text-lg mb-4">{t('footer.product')}</h4>
            <ul className="space-y-3 font-serif">
              <li><a href="#features" className="text-brand-text-light dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors">{t('header.features')}</a></li>
              <li><a href="#how-it-works" className="text-brand-text-light dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors">{t('header.howItWorks')}</a></li>
              <li><a href="#contact" className="text-brand-text-light dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors">{t('header.getDemo')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-bold text-brand-text-dark dark:text-white text-lg mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3 font-serif">
              <li><a href="#about" className="text-brand-text-light dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="text-brand-text-light dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="text-brand-text-light dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors">{t('footer.press')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-bold text-brand-text-dark dark:text-white text-lg mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 font-serif">
                <li className="flex items-center text-brand-text-light dark:text-gray-400">
                    <Mail className="w-5 h-5 mr-2 text-brand-primary" /> info@chronicai.ai
                </li>
            </ul>
            <div className="flex space-x-4 mt-6">
                <a href="#" className="text-brand-text-gray dark:text-gray-500 hover:text-brand-primary dark:hover:text-white"><Twitter /></a>
                <a href="#" className="text-brand-text-gray dark:text-gray-500 hover:text-brand-primary dark:hover:text-white"><Linkedin /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 dark:bg-black text-gray-400 py-4">
        <div className="container mx-auto px-6 text-center text-sm">
          {t('footer.copyright', { year: currentYear })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
