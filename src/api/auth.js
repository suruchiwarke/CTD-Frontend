import { apiClient } from './client';

// Form category (FE/SE/TE/BE/Junior/Senior) -> backend "junior" | "senior"
const toBackendCategory = (category) => {
  const c = String(category || '').toLowerCase();
  if (c === 'fe' || c === 'se' || c === 'junior') return 'junior';
  if (c === 'te' || c === 'be' || c === 'senior') return 'senior';
  throw new Error('Please choose a Junior or Senior category.');
};

// Backend "junior" -> "Junior" (what the UI already compares against)
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export const authApi = {
  signUp: async ({ fullName, username, email, phoneNumber, password, category }) => {
    const phone = parseInt(String(phoneNumber).replace(/\D/g, ''), 10);
    if (!Number.isSafeInteger(phone)) throw new Error('Please enter a valid phone number.');

    const response = await apiClient.post('/auth/register', {
      name: fullName,
      username,
      email,
      phone,
      password,
      category: toBackendCategory(category),
    });
    return response.data; // { message, user_id }
  },

  // -> { access_token, token_type }
  login: async ({ email, password }) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  // Requires the token to already be stored (client attaches it)
  getCurrentUser: async () => {
    const { data } = await apiClient.get('/auth/me');
    return { ...data, fullName: data.name, phoneNumber: data.phone, category: capitalize(data.category) };
  },

  requestOtp: async (email) => (await apiClient.post('/auth/reset-password', { email })).data,

  verifyOtp: async (email, otp) => (await apiClient.post('/auth/verify-otp', { email, otp })).data,

  changePassword: async (email, otp, newpassword) =>
    (await apiClient.post('/auth/change-password', { email, otp, newpassword })).data,
};
