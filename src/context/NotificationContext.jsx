import React, { createContext, useContext, useState, useCallback } from 'react';
import { FormError } from '../components/common/FormError';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const errorTimerRef = React.useRef(null);
  const successTimerRef = React.useRef(null);

  const showError = useCallback((message, duration = 6000) => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setErrorMessage(message);
    if (duration > 0) {
      errorTimerRef.current = setTimeout(() => {
        setErrorMessage(null);
      }, duration);
    }
  }, []);

  const showSuccess = useCallback((message, duration = 4000) => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    setSuccessMessage(message);
    if (duration > 0) {
      successTimerRef.current = setTimeout(() => {
        setSuccessMessage(null);
      }, duration);
    }
  }, []);

  const clearError = useCallback(() => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setErrorMessage(null);
  }, []);

  const clearSuccess = useCallback(() => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    setSuccessMessage(null);
  }, []);

  const clearAll = useCallback(() => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
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
