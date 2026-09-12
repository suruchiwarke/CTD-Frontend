import React, { createContext, useContext, useState, useCallback } from 'react';
import { FormError } from '../components/common/FormError';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const showError = useCallback((message, duration = 6000) => {
    setErrorMessage(message);
    if (duration > 0) {
      setTimeout(() => {
        setErrorMessage((prev) => (prev === message ? null : prev));
      }, duration);
    }
  }, []);

  const showSuccess = useCallback((message, duration = 4000) => {
    setSuccessMessage(message);
    if (duration > 0) {
      setTimeout(() => {
        setSuccessMessage((prev) => (prev === message ? null : prev));
      }, duration);
    }
  }, []);

  const clearError = useCallback(() => setErrorMessage(null), []);
  const clearSuccess = useCallback(() => setSuccessMessage(null), []);
  const clearAll = useCallback(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        errorMessage,
        successMessage,
        showError,
        showSuccess,
        clearError,
        clearSuccess,
        clearAll,
      }}
    >
      {children}
      {/* Top right Figma Error Banner */}
      <FormError message={errorMessage} onClose={clearError} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
