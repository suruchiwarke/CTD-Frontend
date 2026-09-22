import { apiClient } from './client.js';
import { getEventById } from '../data/eventsData.js';

const TEAMS_DB_KEY = 'ctd_duo_teams';
const REGISTRATIONS_DB_KEY = 'ctd_event_registrations';
const USERS_DB_KEY = 'ctd_registered_users';

const hasLiveBackend = () => {
  const url = import.meta.env.VITE_API_BASE_URL;
  return Boolean(url && !url.includes('api.ctd.pictieee.in'));
};

const getStoredData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const setStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
};

export const teamsApi = {
  // Synchronously check if a user is registered for an event
  isUserRegistered: (eventId, userIdentifier) => {
    if (!eventId || !userIdentifier) return false;
    const registrations = getStoredData(REGISTRATIONS_DB_KEY);
    const teams = getStoredData(TEAMS_DB_KEY);
    const idStr = String(userIdentifier).toLowerCase();

    const inRegs = registrations.some(
      (r) =>
        r.eventId === eventId &&
        (String(r.userId).toLowerCase() === idStr ||
          String(r.username || '').toLowerCase() === idStr ||
          String(r.email || '').toLowerCase() === idStr)
    );
    if (inRegs) return true;

    const inTeams = teams.some(
      (t) =>
        t.eventId === eventId &&
        (String(t.participant1?.id).toLowerCase() === idStr ||
          String(t.participant1?.username).toLowerCase() === idStr ||
          String(t.participant1?.email).toLowerCase() === idStr ||
          String(t.participant2?.id).toLowerCase() === idStr ||
          String(t.participant2?.username).toLowerCase() === idStr ||
          String(t.participant2?.email).toLowerCase() === idStr)
    );
    return inTeams;
  },

  // Record an event registration for a user
  registerUserForEvent: (eventId, user) => {
    if (!eventId || !user) return;
    const registrations = getStoredData(REGISTRATIONS_DB_KEY);
    const userId = user.id || user.username || user.email || 'usr_guest';

    const existingIndex = registrations.findIndex(
      (r) =>
        r.eventId === eventId &&
        (r.userId === userId || (user.id && r.userId === user.id))
    );

    if (existingIndex === -1) {
      registrations.push({
        userId,
        username: user.username || user.fullName || 'Participant',
        email: user.email || '',
        eventId,
        category: user.category || 'Junior',
        registeredAt: new Date().toISOString(),
      });
      setStoredData(REGISTRATIONS_DB_KEY, registrations);
    }
  },

  // Synchronously get Duo Team Status from local storage
  getDuoTeamStatusSync: (eventId, userIdentifier) => {
    if (!eventId || !userIdentifier) return null;
    const teams = getStoredData(TEAMS_DB_KEY);
    const idStr = String(userIdentifier).toLowerCase();

    const userTeam = teams.find(
      (t) =>
        t.eventId === eventId &&
        (String(t.participant1?.id).toLowerCase() === idStr ||
          String(t.participant1?.username).toLowerCase() === idStr ||
          String(t.participant1?.email).toLowerCase() === idStr ||
          String(t.participant2?.id).toLowerCase() === idStr ||
          String(t.participant2?.username).toLowerCase() === idStr ||
          String(t.participant2?.email).toLowerCase() === idStr)
    );

    if (!userTeam) return null;

    const isPrimary =
      String(userTeam.participant1?.id).toLowerCase() === idStr ||
      String(userTeam.participant1?.username).toLowerCase() === idStr ||
      String(userTeam.participant1?.email).toLowerCase() === idStr;

    const teammate = isPrimary ? userTeam.participant2 : userTeam.participant1;

    return {
      teamId: userTeam.id,
      teamName: userTeam.teamName || '',
      eventId: userTeam.eventId,
      category: userTeam.category,
      teammate,
      isPrimary,
    };
  },

  // Asynchronously get Duo Team Status (supports backend if configured)
  getDuoTeamStatus: async (eventId, userId) => {
    if (hasLiveBackend()) {
      try {
        const response = await apiClient.get(`/teams/${eventId}/status`);
        return response.data;
      } catch (err) {
        if (err.response) throw err;
      }
    }

    const teamData = teamsApi.getDuoTeamStatusSync(eventId, userId);
    return {
      success: true,
      data: teamData,
    };
  },

  // Search participants
  searchParticipants: async (eventId, query, currentUserId) => {
    if (hasLiveBackend()) {
      try {
        const response = await apiClient.get('/users/search', {
          params: { eventId, query },
        });
        return response.data;
      } catch (err) {
        if (err.response) throw err;
      }
    }

    const searchQuery = (query || '').trim().toLowerCase();
    if (!searchQuery) return { success: true, data: [] };

    const users = getStoredData(USERS_DB_KEY);
    const registrations = getStoredData(REGISTRATIONS_DB_KEY);

    const results = users
      .filter((u) => u.id !== currentUserId && u.username !== currentUserId)
      .filter(
        (u) =>
          u.username?.toLowerCase().includes(searchQuery) ||
          u.email?.toLowerCase().includes(searchQuery) ||
          u.fullName?.toLowerCase().includes(searchQuery) ||
          u.prn?.toLowerCase().includes(searchQuery)
      )
      .map((u) => {
        const reg = registrations.find(
          (r) => r.userId === u.id && r.eventId === eventId
        );
        return {
          id: u.id,
          username: u.username,
          fullName: u.fullName,
          category: u.category,
          isRegistered: !!reg,
          eventCategory: reg?.category || u.category,
        };
      });

    return { success: true, data: results };
  },

  // Add or update teammate
  addTeammate: async ({ eventId, primaryUserId, teammateIdentifier, teamName, teammateCategory }) => {
    if (hasLiveBackend()) {
      try {
        const response = await apiClient.post('/teams/add-teammate', {
          eventId,
          teammateIdentifier,
          teamName,
          teammateCategory,
        });
        return response.data;
      } catch (err) {
        if (err.response) throw err;
      }
    }

    await new Promise((res) => setTimeout(res, 200));

    const event = getEventById(eventId);
    if (!event || !event.isDuo) {
      throw new Error('Teammates can only be added for duo events (Reverse Coding, NCC, Enigma).');
    }

    const users = getStoredData(USERS_DB_KEY);
    const registrations = getStoredData(REGISTRATIONS_DB_KEY);
    const teams = getStoredData(TEAMS_DB_KEY);

    // 1. Get or provision primary registrant in local store
    let primaryUser = users.find(
      (u) =>
        u.id === primaryUserId ||
        u.username === primaryUserId ||
        u.email === primaryUserId
    );

    if (!primaryUser && primaryUserId) {
      primaryUser = {
        id: typeof primaryUserId === 'string' ? primaryUserId : 'usr_primary_' + Date.now(),
        username: typeof primaryUserId === 'string' ? primaryUserId : 'User',
        fullName: 'Primary Participant',
        category: 'Junior',
      };
      users.push(primaryUser);
      setStoredData(USERS_DB_KEY, users);
    } else if (!primaryUser) {
      primaryUser = {
        id: 'usr_primary_' + Date.now(),
        username: 'User',
        fullName: 'Primary Participant',
        category: 'Junior',
      };
      users.push(primaryUser);
      setStoredData(USERS_DB_KEY, users);
    }

    // Ensure primary user registration exists
    let primaryReg = registrations.find(
      (r) => (r.userId === primaryUser.id || r.userId === primaryUser.username) && r.eventId === eventId
    );
    if (!primaryReg) {
      primaryReg = {
        userId: primaryUser.id,
        username: primaryUser.username,
        eventId,
        category: primaryUser.category || 'Junior',
        registeredAt: new Date().toISOString(),
      };
      registrations.push(primaryReg);
      setStoredData(REGISTRATIONS_DB_KEY, registrations);
    }

    const targetQuery = (teammateIdentifier || '').trim();
    const targetQueryLower = targetQuery.toLowerCase();

    // 2. Lookup teammate user in registered users
    let teammateUser = users.find(
      (u) =>
        u.username?.toLowerCase() === targetQueryLower ||
        u.email?.toLowerCase() === targetQueryLower ||
        u.prn?.toLowerCase() === targetQueryLower ||
        u.fullName?.toLowerCase() === targetQueryLower
    );

    // If teammate is not found, dynamically provision the teammate
    if (!teammateUser) {
      teammateUser = {
        id: 'usr_tm_' + Math.random().toString(36).substring(2, 9),
        username: targetQuery,
        fullName: targetQuery,
        email: targetQuery.includes('@') ? targetQuery : `${targetQuery}@ctd.com`,
        category: teammateCategory || primaryReg.category || primaryUser.category || 'Junior',
      };
      users.push(teammateUser);
      setStoredData(USERS_DB_KEY, users);
    }

    // Ensure teammate is registered for event
    let teammateReg = registrations.find(
      (r) => (r.userId === teammateUser.id || r.userId === teammateUser.username) && r.eventId === eventId
    );
    if (!teammateReg) {
      teammateReg = {
        userId: teammateUser.id,
        username: teammateUser.username,
        eventId,
        category: teammateCategory || teammateUser.category || primaryReg.category || 'Junior',
        registeredAt: new Date().toISOString(),
      };
      registrations.push(teammateReg);
      setStoredData(REGISTRATIONS_DB_KEY, registrations);
    }

    // 3. Validation: Prevent Self Addition
    if (
      teammateUser.id === primaryUser.id ||
      teammateUser.username.toLowerCase() === primaryUser.username.toLowerCase() ||
      (teammateUser.email && primaryUser.email && teammateUser.email.toLowerCase() === primaryUser.email.toLowerCase())
    ) {
      throw new Error('You cannot add yourself as your teammate.');
    }

    // 4. Validation: Same Category Check (Junior == Junior, Senior == Senior)
    const getCategoryGroup = (cat) => {
      const c = String(cat || '').toLowerCase().trim();
      if (
        c === 'fe' ||
        c === 'se' ||
        c === 'junior' ||
        c.includes('first') ||
        c.includes('second') ||
        c === 'fe/se'
      ) {
        return 'Junior';
      }
      if (
        c === 'te' ||
        c === 'be' ||
        c === 'senior' ||
        c.includes('third') ||
        c.includes('final') ||
        c === 'te/be'
      ) {
        return 'Senior';
      }
      return 'Junior';
    };

    const primaryGroup = getCategoryGroup(primaryReg.category || primaryUser.category);
    const teammateGroup = getCategoryGroup(teammateCategory || teammateReg.category || teammateUser.category);

    if (primaryGroup !== teammateGroup) {
      throw new Error(
        `Both teammates must belong to the same category. You are in the ${primaryGroup} category, but "${teammateUser.username || teammateUser.fullName}" is in the ${teammateGroup} category.`
      );
    }

    // 5. Check if teammate is already in another team
    const teammateInOtherTeam = teams.some(
      (t) =>
        t.eventId === eventId &&
        t.participant1?.id !== primaryUser.id &&
        t.participant1?.username !== primaryUser.username &&
        (t.participant1?.id === teammateUser.id ||
          t.participant1?.username?.toLowerCase() === teammateUser.username.toLowerCase() ||
          t.participant2?.id === teammateUser.id ||
          t.participant2?.username?.toLowerCase() === teammateUser.username.toLowerCase())
    );
    if (teammateInOtherTeam) {
      throw new Error(`Participant "${teammateUser.username}" is already in another team for this event.`);
    }

    // 6. Check if primary user already has a team: If yes, UPDATE it!
    const existingTeamIndex = teams.findIndex(
      (t) =>
        t.eventId === eventId &&
        (t.participant1?.id === primaryUser.id ||
          t.participant1?.username === primaryUser.username ||
          t.participant1?.email === primaryUser.email)
    );

    if (existingTeamIndex !== -1) {
      // Update existing team
      teams[existingTeamIndex].teamName = (teamName || '').trim() || teams[existingTeamIndex].teamName || '';
      teams[existingTeamIndex].participant2 = {
        id: teammateUser.id,
        username: teammateUser.username,
        fullName: teammateUser.fullName || teammateUser.username,
        email: teammateUser.email,
        category: teammateUser.category,
      };
      teams[existingTeamIndex].status = 'CONFIRMED';
      teams[existingTeamIndex].updatedAt = new Date().toISOString();

      setStoredData(TEAMS_DB_KEY, teams);

      return {
        success: true,
        message: 'Teammate updated successfully!',
        data: {
          teamId: teams[existingTeamIndex].id,
          eventId,
          teamName: teams[existingTeamIndex].teamName,
          teammate: teams[existingTeamIndex].participant2,
        },
      };
    }

    // 7. Create New Duo Team Record Atomically
    const newTeam = {
      id: 'team_' + Math.random().toString(36).substring(2, 9),
      teamName: (teamName || '').trim(),
      eventId,
      category: primaryReg.category || primaryUser.category || 'Junior',
      participant1: {
        id: primaryUser.id,
        username: primaryUser.username,
        fullName: primaryUser.fullName,
        email: primaryUser.email,
        category: primaryUser.category,
      },
      participant2: {
        id: teammateUser.id,
        username: teammateUser.username,
        fullName: teammateUser.fullName || teammateUser.username,
        email: teammateUser.email,
        category: teammateUser.category,
      },
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
    };

    teams.push(newTeam);
    setStoredData(TEAMS_DB_KEY, teams);

    return {
      success: true,
      message: 'Teammate added successfully!',
      data: {
        teamId: newTeam.id,
        eventId,
        teamName: newTeam.teamName,
        teammate: newTeam.participant2,
      },
    };
  },
};
