import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DoctorSidebar from './DoctorSidebar';
import { Menu } from 'lucide-react';
import NotificationBell from '../notifications/NotificationBell';
import NotificationPanel from '../notifications/NotificationPanel';

const DoctorDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);

  return (
    <div className="flex h-screen bg-brand-background-alt dark:bg-gray-900">
      <DoctorSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-600 dark:text-gray-300">
              <Menu size={24} />
            </button>
            <h1 className="hidden lg:block text-2xl font-bold text-gray-800 dark:text-white">Doctor's Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationBell onClick={() => setNotificationPanelOpen(true)} />
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      <NotificationPanel isOpen={notificationPanelOpen} onClose={() => setNotificationPanelOpen(false)} />
    </div>
  );
};

export default DoctorDashboardLayout;
