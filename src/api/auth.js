import { apiClient } from './client';

const USERS_DB_KEY = 'ctd_registered_users';

// Helper to get registered users from localStorage
const getRegisteredUsers = () => {
  try {
    const data = localStorage.getItem(USERS_DB_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Helper to save registered users to localStorage
const saveRegisteredUsers = (users) => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

export const authApi = {
  // Sign Up: Register new user
  signUp: async (payload) => {
    if (import.meta.env.VITE_API_BASE_URL) {
      try {
        const response = await apiClient.post('/auth/signup', payload);
        return response.data;
      } catch (err) {
        if (err.response) throw err;
      }
    }

    await new Promise((res) => setTimeout(res, 500));

    const { username, fullName, email, password, phoneNumber, category } = payload;

    if (!username || !fullName || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }

    const users = getRegisteredUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      throw new Error('User already exists with this email. Please login.');
    }

    const newUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      username,
      fullName,
      email: email.toLowerCase(),
      password, // In real backend, this is hashed on server
      phoneNumber: phoneNumber || '',
      category: category || 'FE',
      token: 'jwt_token_' + Date.now(),
    };

    users.push(newUser);
    saveRegisteredUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: 'Account created successfully!',
      data: {
        user: userWithoutPassword,
        token: newUser.token,
      },
    };
  },

  // Login: Only allowed if account exists and password matches
  login: async (payload) => {
    if (import.meta.env.VITE_API_BASE_URL) {
      try {
        const response = await apiClient.post('/auth/login', payload);
        return response.data;
      } catch (err) {
        if (err.response) throw err;
      }
    }

    await new Promise((res) => setTimeout(res, 500));

    const { email, password } = payload;

    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }

    const users = getRegisteredUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    // 1. Check if user exists
    if (!user) {
      throw new Error('No account found with this email. Please sign up first.');
    }

    // 2. Check if password matches
    if (user.password !== password) {
      throw new Error('Incorrect password. Please try again or use Forgot Password.');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = 'jwt_token_' + Date.now();

    return {
      success: true,
      message: 'Logged in successfully!',
      data: {
        user: userWithoutPassword,
        token,
      },
    };
  },

  // Forgot Password: Check if user exists
  forgotPassword: async (payload) => {
    if (import.meta.env.VITE_API_BASE_URL) {
      try {
        const response = await apiClient.post('/auth/forgot-password', payload);
        return response.data;
      } catch (err) {
        if (err.response) throw err;
      }
    }

    await new Promise((res) => setTimeout(res, 500));

    const { email } = payload;
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }

    const users = getRegisteredUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('No account found with this email.');
    }

    return {
      success: true,
      message: 'Password reset link has been sent to your email.',
    };
  },

  // Get Current User
  getCurrentUser: async () => {
    if (import.meta.env.VITE_API_BASE_URL) {
      try {
        const response = await apiClient.get('/auth/me');
        return response.data;
      } catch (err) {
        // Fallback to storage
      }
    }

    const storedUser = localStorage.getItem('ctd_user') || sessionStorage.getItem('ctd_user');
    if (storedUser) {
      return {
        success: true,
        data: JSON.parse(storedUser),
      };
    }

    throw new Error('No active session.');
  },
};
