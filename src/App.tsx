import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import PatientJourney from './components/PatientJourney';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupPatient from './pages/SignupPatient';
import SignupDoctor from './pages/SignupDoctor';
import { useTheme } from './hooks/useTheme';

const MainLayout: React.FC = () => (
  <>
    <Hero />
    <Features />
    <About />
    <HowItWorks />
    <PatientJourney />
    <CTA />
    <Contact />
  </>
);

function App() {
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/signup-patient', '/signup-doctor'].includes(location.pathname);

  return (
    <div className="bg-brand-background dark:bg-gray-900 font-sans min-h-screen flex flex-col">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-patient" element={<SignupPatient />} />
          <Route path="/signup-doctor" element={<SignupDoctor />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
