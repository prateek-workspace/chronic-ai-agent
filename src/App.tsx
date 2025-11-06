import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/dashboard/MyProfile';
import Devices from './pages/dashboard/Devices';
import Reports from './pages/dashboard/Reports';
import Settings from './pages/dashboard/Settings';
import DoctorDashboardLayout from './components/doctor/DoctorDashboardLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDetail from './pages/doctor/PatientDetail';
import DoctorSettings from './pages/doctor/DoctorSettings';

const LandingPageContent = () => (
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

// Layout for public-facing pages (landing, auth)
const PublicLayout: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/signup-patient', '/signup-doctor'].includes(location.pathname);

  return (
    <div className="bg-brand-background dark:bg-gray-900 font-sans min-h-screen flex flex-col">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

// A wrapper for the dashboard routes to apply the theme
const DashboardWrapper: React.FC = () => {
    const [theme] = useTheme();
    return (
        <div className={`font-sans min-h-screen ${theme}`}>
            <Outlet />
        </div>
    );
};


function App() {
  return (
    <Routes>
      {/* Public and Auth routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPageContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-patient" element={<SignupPatient />} />
        <Route path="/signup-doctor" element={<SignupDoctor />} />
      </Route>

      {/* Dashboard routes */}
      <Route element={<DashboardWrapper />}>
        {/* Patient Dashboard */}
        <Route element={<ProtectedRoute requiredRole="patient" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="devices" element={<Devices />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Doctor Dashboard */}
        <Route element={<ProtectedRoute requiredRole="doctor" />}>
          <Route path="/doctor" element={<DoctorDashboardLayout />}>
            <Route index element={<DoctorDashboard />} />
            <Route path="patient/:id" element={<PatientDetail />} />
            <Route path="settings" element={<DoctorSettings />} />
             <Route path="alerts" element={
                <div className="p-8 text-gray-800 dark:text-white">
                  <h1 className="text-2xl font-bold">Alerts</h1>
                  <p className="mt-2">This page will show critical alerts for your patients.</p>
                </div>
              } />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
