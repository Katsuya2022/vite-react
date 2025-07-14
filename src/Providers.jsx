import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/Toast/Toast';

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
};
