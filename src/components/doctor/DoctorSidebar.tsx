import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, Bell, Settings, LogOut, Stethoscope } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DoctorSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, name: 'Overview', path: '/doctor' },
    { icon: Users, name: 'Patients', path: '/doctor' }, // Points to same page for now
    { icon: Bell, name: 'Alerts', path: '/doctor/alerts' },
    { icon: Settings, name: 'Settings', path: '/doctor/settings' },
  ];

  const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
    // Match /doctor exactly, or other paths starting with the path
    const isActive = item.path === '/doctor' 
      ? location.pathname === '/doctor' 
      : location.pathname.startsWith(item.path);

    return (
      <Link
        to={item.path}
        onClick={() => setIsOpen(false)}
        className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-brand-primary text-white shadow-lg'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        <item.icon className="w-5 h-5" />
        <span className="ml-4 font-semibold">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-64 flex-shrink-0 flex-col fixed lg:relative inset-y-0 left-0 z-30 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex shadow-lg lg:shadow-none`}
      >
        <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
          <Link to="/" className="text-2xl font-bold text-brand-primary font-sans flex items-center">
            <Stethoscope className="mr-2" />
            Chronic AI
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(item => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
        <div className="px-4 py-6 border-t dark:border-gray-700">
          <div className="flex items-center mb-4">
             <div className="w-10 h-10 rounded-full bg-brand-primary-lighter flex items-center justify-center text-brand-primary font-bold">
                {user?.user_metadata.name?.charAt(0) || 'D'}
            </div>
            <div className="ml-3">
              <p className="font-semibold text-sm truncate">{user?.user_metadata.name || 'Doctor'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors duration-200 text-red-500 bg-red-500/10 hover:bg-red-500/20"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-4 font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DoctorSidebar;
