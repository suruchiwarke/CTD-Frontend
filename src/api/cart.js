import { apiClient } from './client';

export const cartApi = {
  // -> { bill, events: [{ id, event_name, person1, person2, person2_username, person2_email, team_name, isVerified, price }] }
  view: async () => (await apiClient.get('/cart/view')).data,

  add: async (payload) => (await apiClient.post('/cart/add-event', payload)).data,

  remove: async (event_name) => (await apiClient.delete('/cart/remove', { data: { event_name } })).data,

  checkout: async (utr) => (await apiClient.post('/cart/checkout', { utr: utr || null })).data,
};

export const profileApi = {
  // -> { my_events: [{ ..., isVerified, is_team_leader }] }
  myEvents: async () => (await apiClient.get('/profile/my-events')).data,

  changeTeammate: async (payload) => (await apiClient.put('/profile/change-teammate', payload)).data,
};
