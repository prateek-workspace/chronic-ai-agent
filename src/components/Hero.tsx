import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BarChart, ShieldCheck, Activity } from 'lucide-react';

const StatCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-black/5 dark:bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4 border border-white/20"
    >
      <div className="bg-brand-primary-lighter/50 text-brand-primary p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-brand-text-dark dark:text-white text-lg">{title}</h3>
        <p className="text-brand-text-light dark:text-brand-primary-lighter text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-background-alt dark:bg-gray-900 pt-16 pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-text-dark dark:text-white font-sans leading-tight mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-brand-text-light dark:text-gray-300 font-serif mb-8 max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href="#contact" className="bg-brand-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
                {t('hero.requestDemo')}
              </a>
              <a href="#features" className="bg-white dark:bg-gray-700 text-brand-primary dark:text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transform hover:-translate-y-1 transition-all duration-300">
                {t('hero.learnMore')}
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative flex justify-center items-center mt-12 lg:mt-0">
            <div className="absolute bg-brand-primary rounded-full w-80 h-80 md:w-[500px] md:h-[500px] -z-10 blur-3xl opacity-20 dark:opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              src="https://plus.unsplash.com/premium_photo-1716679815341-1f554be763c8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNocm9uaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=400" 
              alt="Person monitoring their health with a modern device, representing Chronic AI's proactive approach." 
              className="rounded-2xl shadow-2xl w-[320px] h-[480px] md:w-[400px] md:h-[600px] object-cover object-center z-10"
            />
            <div className="absolute bottom-0 md:-bottom-10 left-0 md:-left-20 w-64 z-20">
              <StatCard icon={<Activity size={24}/>} title={t('hero.card1Title')} description={t('hero.card1Desc')} delay={0.3} />
            </div>
            <div className="absolute top-0 md:-top-10 right-0 md:-right-20 w-64 z-20">
              <StatCard icon={<BarChart size={24}/>} title={t('hero.card2Title')} description={t('hero.card2Desc')} delay={0.5} />
            </div>
            <div className="absolute bottom-1/4 -right-10 md:-right-32 w-64 z-20">
               <StatCard icon={<ShieldCheck size={24}/>} title={t('hero.card3Title')} description={t('hero.card3Desc')} delay={0.7} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
