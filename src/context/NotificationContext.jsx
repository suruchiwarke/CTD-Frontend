import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Toast } from '../components/common/Toast';

const NotificationContext = createContext(undefined);

const TYPES = ['error', 'warning', 'success', 'info'];
const DEFAULT_DURATIONS = { error: 6000, warning: 6000, success: 4000, info: 4000 };

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState({ error: null, warning: null, success: null, info: null });
  const timers = useRef({});

  const clear = useCallback((type) => {
    if (timers.current[type]) clearTimeout(timers.current[type]);
    setToasts((prev) => ({ ...prev, [type]: null }));
  }, []);

  const show = useCallback(
    (type, title, description, duration = DEFAULT_DURATIONS[type]) => {
      if (timers.current[type]) clearTimeout(timers.current[type]);
      setToasts((prev) => ({ ...prev, [type]: { title, description } }));
      if (duration > 0) {
        timers.current[type] = setTimeout(() => {
          setToasts((prev) => ({ ...prev, [type]: null }));
        }, duration);
      }
    },
    []
  );

  const showError = useCallback((title, description, duration) => show('error', title, description, duration), [show]);
  const showWarning = useCallback((title, description, duration) => show('warning', title, description, duration), [show]);
  const showSuccess = useCallback((title, description, duration) => show('success', title, description, duration), [show]);
  const showInfo = useCallback((title, description, duration) => show('info', title, description, duration), [show]);

  const clearError = useCallback(() => clear('error'), [clear]);
  const clearWarning = useCallback(() => clear('warning'), [clear]);
  const clearSuccess = useCallback(() => clear('success'), [clear]);
  const clearInfo = useCallback(() => clear('info'), [clear]);
  const clearAll = useCallback(() => TYPES.forEach(clear), [clear]);

  return (
    <NotificationContext.Provider
      value={{
        showError,
        showWarning,
        showSuccess,
        showInfo,
        clearError,
        clearWarning,
        clearSuccess,
        clearInfo,
        clearAll,
      }}
    >
      {children}
      <div className="fixed top-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:top-6 sm:right-6">
        {TYPES.map(
          (type) =>
            toasts[type] && (
              <Toast
                key={type}
                type={type}
                title={toasts[type].title}
                description={toasts[type].description}
                onClose={() => clear(type)}
              />
            )
        )}
      </div>
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
