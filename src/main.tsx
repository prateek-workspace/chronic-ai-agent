import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './i18n';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-brand-background dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
    </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
);
