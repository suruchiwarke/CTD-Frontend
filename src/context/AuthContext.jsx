import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { useNotification } from './NotificationContext';

const AuthContext = createContext(undefined);

const TOKEN_KEY = 'ctd_auth_token';
const USER_KEY = 'ctd_user';

// Decode a JWT's payload (no signature check - the backend does that) and
// tell whether it's past its `exp`. Malformed tokens count as expired.
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
    } else if (savedToken || savedUser) {
      // Expired token, or a token/user pair left half-written - drop it rather
      // than silently treating the visitor as logged in.
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    }
    setIsLoading(false);
  }, []);

  // login -> store access_token (local if "keep me signed in", else session) -> /auth/me
  const startSession = useCallback(async ({ email, password }, remember) => {
    const { access_token } = await authApi.login({ email, password });

    // Clear both so a stale token in the other storage can't shadow the new one
    for (const store of [localStorage, sessionStorage]) {
      store.removeItem(TOKEN_KEY);
      store.removeItem(USER_KEY);
    }
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, access_token);

    try {
      const authUser = await authApi.getCurrentUser();
      storage.setItem(USER_KEY, JSON.stringify(authUser));
      setUser(authUser);
      setToken(access_token);
    } catch (err) {
      storage.removeItem(TOKEN_KEY);
      throw err;
    }
  }, []);

  const login = useCallback(async (payload) => {
    try {
      await startSession(payload, payload.keepSignedIn);
      showSuccess('Logged in successfully!');
    } catch (err) {
      showError(err.message || 'Login failed');
      throw err;
    }
  }, [startSession, showError, showSuccess]);

  const signUp = useCallback(async (payload) => {
    try {
      await authApi.signUp(payload);
      await startSession(payload, false);
      showSuccess('Account created successfully!');
    } catch (err) {
      showError(err.message || 'Sign up failed');
      throw err;
    }
  }, [startSession, showError, showSuccess]);

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
