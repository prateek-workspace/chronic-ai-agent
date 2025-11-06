import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-24 bg-brand-background dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text-dark dark:text-white font-sans mb-6">{t('contact.title')}</h2>
            <p className="text-lg font-serif text-brand-text-light dark:text-gray-300 mb-8 leading-relaxed">
              {t('contact.subtitle')}
            </p>
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop"
              alt="Team collaborating on a project"
              className="rounded-lg shadow-xl w-full hidden lg:block"
            />
          </div>
          <div className="lg:w-1/2 w-full bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl">
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">{t('contact.formName')}</label>
                <input type="text" id="name" placeholder="John Doe" className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">{t('contact.formEmail')}</label>
                <input type="email" id="email" placeholder="john.doe@example.com" className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              </div>
              <div className="mb-6">
                <label htmlFor="role" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">{t('contact.formRole')}</label>
                <select id="role" className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary appearance-none">
                  <option>{t('contact.rolePatient')}</option>
                  <option>{t('contact.roleDoctor')}</option>
                  <option>{t('contact.roleAdmin')}</option>
                  <option>{t('contact.roleOther')}</option>
                </select>
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="block text-brand-text-dark dark:text-gray-200 font-sans font-semibold mb-2">{t('contact.formMessage')}</label>
                <textarea id="message" rows={4} placeholder="Tell us what you're interested in..." className="w-full px-4 py-3 bg-brand-background-light dark:bg-gray-700 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
                {t('contact.formSubmit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
