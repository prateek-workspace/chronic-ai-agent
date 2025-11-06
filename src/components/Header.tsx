import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: t('header.features'), href: '#features' },
    { name: t('header.howItWorks'), href: '#how-it-works' },
    { name: t('header.about'), href: '#about' },
    { name: t('header.contact'), href: '#contact' },
  ];

  return (
    <header className="bg-brand-background-alt/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-brand-primary font-sans">
          {t('brandName')}
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-brand-text-dark dark:text-gray-200 hover:text-brand-primary dark:hover:text-white transition-colors duration-300 font-semibold">
              {link.name}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a href="#contact" className="bg-brand-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300">
                {t('header.getDemo')}
            </a>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button onClick={() => setIsOpen(!isOpen)} className="text-brand-text-dark dark:text-gray-200 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-background-alt dark:bg-gray-800 pb-4">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-brand-text-dark dark:text-gray-200 hover:text-brand-primary dark:hover:text-white transition-colors duration-300 font-semibold">
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-brand-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 w-4/5 text-center">
                {t('header.getDemo')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
