import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Notification } from '../types/notifications';
import { useAuth } from './AuthContext';
import { mockPatientList, MockPatient } from '../lib/doctorMockData';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const generatePatientNotifications = (): Notification[] => [
    {
        id: faker.string.uuid(),
        type: 'alert',
        title: 'High Blood Pressure Alert',
        message: 'Your systolic pressure was 145 mmHg, which is higher than your target. Please rest and re-measure in 30 minutes.',
        timestamp: faker.date.recent({ days: 1 }),
        read: false,
    },
    {
        id: faker.string.uuid(),
        type: 'advice',
        title: 'New AI Suggestion',
        message: 'Your step count has been low. Try a short 15-minute walk today to help manage your blood sugar levels.',
        timestamp: faker.date.recent({ days: 2 }),
        read: false,
    },
    {
        id: faker.string.uuid(),
        type: 'info',
        title: 'Report Ready',
        message: 'Your weekly health summary is now available for download in the Reports section.',
        timestamp: faker.date.recent({ days: 3 }),
        read: true,
    },
];

const generateDoctorNotifications = (patients: MockPatient[]): Notification[] => {
    const notifications: Notification[] = [];
    
    const alertPatient = patients.find(p => p.status === 'alert');
    if (alertPatient) {
        notifications.push({
            id: faker.string.uuid(),
            type: 'alert',
            title: `Critical Alert: ${alertPatient.name}`,
            message: `Patient's BP is critically high at ${alertPatient.vitals.bp} mmHg. Immediate review recommended.`,
            timestamp: faker.date.recent({ hours: 1 }),
            read: false,
            link: `/doctor/patient/${alertPatient.id}`
        });
    }

    const attentionPatient = patients.find(p => p.status === 'attention');
    if (attentionPatient) {
        notifications.push({
            id: faker.string.uuid(),
            type: 'advice',
            title: `Review Needed: ${attentionPatient.name}`,
            message: `Patient's vitals are trending poorly. AI suggests a review of their medication or lifestyle.`,
            timestamp: faker.date.recent({ hours: 4 }),
            read: false,
            link: `/doctor/patient/${attentionPatient.id}`
        });
    }

    notifications.push({
        id: faker.string.uuid(),
        type: 'info',
        title: 'New Patient Joined',
        message: 'A new patient, Sarah Connor, has been assigned to you. Please review her profile.',
        timestamp: faker.date.recent({ days: 1 }),
        read: true,
        link: `/doctor/patient/${patients[2].id}` // Link to a random patient for demo
    });

    return notifications;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
        const role = user.user_metadata.role;
        if (role === 'doctor') {
            setNotifications(generateDoctorNotifications(mockPatientList));
        } else if (role === 'patient') {
            setNotifications(generatePatientNotifications());
        }
    } else {
        setNotifications([]);
    }
  }, [user]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: faker.string.uuid(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
