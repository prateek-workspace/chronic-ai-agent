import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import PatientJourney from './components/PatientJourney';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';

function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="bg-brand-background dark:bg-gray-900 font-sans">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Features />
        <About />
        <HowItWorks />
        <PatientJourney />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
