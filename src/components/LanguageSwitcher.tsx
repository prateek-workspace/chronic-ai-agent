import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages: { [key: string]: { nativeName: string } } = {
  en: { nativeName: 'English' },
  hi: { nativeName: 'हिन्दी' },
  fr: { nativeName: 'Français' },
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={i18n.resolvedLanguage}
        onChange={handleLanguageChange}
        className="bg-transparent text-brand-text-dark dark:text-brand-primary-lighter font-semibold py-2 pl-2 pr-8 rounded-md appearance-none focus:outline-none cursor-pointer"
      >
        {Object.keys(languages).map((lng) => (
          <option key={lng} value={lng} className="text-gray-800 bg-white dark:bg-gray-800 dark:text-white">
            {languages[lng].nativeName}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
         <Globe size={16} className="text-brand-text-dark dark:text-brand-primary-lighter" />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
