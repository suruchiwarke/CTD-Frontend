import { apiClient } from './client';

export const cartApi = {
  // Add an event with teammate details to the backend cart
  addEventToCart: async (payload) => {
    try {
      const response = await apiClient.post('/cart/add-event', payload);
      return response.data;
    } catch (err) {
      if (err.response) throw err;
      throw err;
    }
  },

  // Checkout the entire backend cart
  checkoutCart: async (payload) => {
    try {
      const response = await apiClient.post('/cart/checkout', payload);
      return response.data;
    } catch (err) {
      if (err.response) throw err;
      throw err;
    }
  },
};

export const profileApi = {
  changeTeammate: async (payload) => {
    const response = await apiClient.put('/profile/change-teammate', payload);
    return response.data;
  },
};
