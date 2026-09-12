import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { useNotification } from './NotificationContext';

const AuthContext = createContext(undefined);

const TOKEN_KEY = 'ctd_auth_token';
const USER_KEY = 'ctd_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError, showSuccess } = useNotification();

  // Load session from storage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (payload) => {
    try {
      const response = await authApi.login(payload);
      if (response && response.data) {
        const { user: authUser, token: authToken } = response.data;
        setUser(authUser);
        setToken(authToken);

        const storage = payload.keepSignedIn ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEY, authToken);
        storage.setItem(USER_KEY, JSON.stringify(authUser));

        showSuccess('Logged in successfully!');
      }
    } catch (err) {
      showError(err.message || 'Login failed');
      throw err;
    }
  }, [showError, showSuccess]);

  const signUp = useCallback(async (payload) => {
    try {
      const response = await authApi.signUp(payload);
      if (response && response.data) {
        const { user: authUser, token: authToken } = response.data;
        setUser(authUser);
        setToken(authToken);

        localStorage.setItem(TOKEN_KEY, authToken);
        localStorage.setItem(USER_KEY, JSON.stringify(authUser));

        showSuccess('Account created successfully!');
      }
    } catch (err) {
      showError(err.message || 'Sign up failed');
      throw err;
    }
  }, [showError, showSuccess]);

  const forgotPassword = useCallback(async (payload) => {
    try {
      const response = await authApi.forgotPassword(payload);
      showSuccess(response.message || 'Reset instructions sent to your email.');
    } catch (err) {
      showError(err.message || 'Failed to process password reset.');
      throw err;
    }
  }, [showError, showSuccess]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    showSuccess('Logged out successfully.');
  }, [showSuccess]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        signUp,
        forgotPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
