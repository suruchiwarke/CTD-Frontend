import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { useNotification } from './NotificationContext';

const AuthContext = createContext(undefined);

const TOKEN_KEY = 'ctd_auth_token';
const USER_KEY = 'ctd_user';


// Decode a JWT's payload and tell whether it's past its `exp`
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError, showSuccess } = useNotification();

  // Load session from storage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

    if (savedToken && savedUser && !isTokenExpired(savedToken)) {
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
    } else if (savedToken || savedUser) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (payload) => {
    try {
      const response = await authApi.login(payload);
      if (response && response.access_token) {
        // Live backend auth flow
        localStorage.setItem(TOKEN_KEY, response.access_token);
        setToken(response.access_token);
        
        try {
            const userRes = await authApi.getCurrentUser();
            if (userRes && (userRes.id || userRes.email)) {
                setUser(userRes);
                localStorage.setItem(USER_KEY, JSON.stringify(userRes));
                showSuccess('Logged in successfully!');
            } else {
                throw new Error("Could not retrieve user data");
            }
        } catch (err) {
            localStorage.removeItem(TOKEN_KEY);
            setToken(null);
            throw new Error("Failed to fetch user data.");
        }
      } else if (response && response.data) {
        // Mock backend flow
        const { user: authUser, token: authToken } = response.data;
        setUser(authUser);
        setToken(authToken);

        localStorage.setItem(TOKEN_KEY, authToken);
        localStorage.setItem(USER_KEY, JSON.stringify(authUser));

        showSuccess('Logged in successfully!');
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      showError(err.message || 'Login failed');
      throw err;
    }
  }, [showError, showSuccess]);

  const signUp = useCallback(async (payload) => {
    try {
      const response = await authApi.signUp(payload);
      // After sign up, do not log in automatically. Direct user to log in.
      showSuccess(response?.message || 'Account created successfully! Please log in.');
      return response;
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
