import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Ticket,
  Clock,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { profileApi } from '../api/cart';
import { getEventByBackendName } from '../data/eventsData';
import { Button } from '../components/common/Button';
import { DuoRegistrationModal } from '../components/common/DuoRegistrationModal';

export const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [teammateEvent, setTeammateEvent] = useState(null); // event whose teammate is being changed

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await profileApi.myEvents();
      setRegisteredEvents(data.my_events || []);
      setLoadError('');
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadEvents();
  }, [isAuthenticated, loadEvents]);

  const filteredEvents = registeredEvents.filter((ev) => {
    if (filter === 'verified') return ev.isVerified;
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black px-4">
        {/* Cosmic Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url('/assets/backgrounds/blurred-background.png')`,
          }}
        />
        <div className="relative z-10 max-w-md w-full bg-[#12071f]/85 border border-pink-500/40 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(244,114,182,0.2)] text-center">
          <div className="w-14 h-14 rounded-full bg-purple-900/50 border border-purple-400/50 flex items-center justify-center mx-auto mb-4 text-purple-200">
            <UserIcon className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-aldrich text-white mb-2">Access Your Profile</h2>
          <p className="text-xs sm:text-sm text-purple-200/70 font-aldrich mb-6">
            Please log in to view your account details and registered events.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-pink-400 via-pink-300 to-pink-100 text-purple-950 font-bold text-xs sm:text-sm tracking-wider uppercase hover:opacity-95 shadow-[0_0_20px_rgba(244,114,182,0.5)] transition-all"
          >
            <span>Log In Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Academic Category display helper
  const categoryLabel =
    user?.category === 'FE' || user?.category === 'SE' || user?.category === 'Junior'
      ? 'Junior (FE / SE)'
      : user?.category === 'TE' || user?.category === 'BE' || user?.category === 'Senior'
      ? 'Senior (TE / BE)'
      : user?.category || 'Junior (FE / SE)';

  return (
    <div className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-black selection:bg-pink-500 selection:text-white">
      {/* Cosmic Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/assets/backgrounds/blurred-background.png')`,
        }}
      />

      {/* Main Container - strictly sized for single-screen view on desktop */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-6 flex flex-col justify-between overflow-hidden">
        
        {/* User Profile Header Card */}
        <div className="w-full bg-[#12071f]/80 border border-purple-500/35 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            
            {/* User Avatar Circle */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-pink-400/80 bg-gradient-to-br from-purple-900 via-[#1a0833] to-purple-950 flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,114,182,0.4)]">
                {user?.fullName ? (
                  <span className="font-tungsten text-3xl sm:text-4xl tracking-wider text-pink-200">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <UserIcon className="w-10 h-10 text-pink-300" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#12071f] flex items-center justify-center text-white shadow-[0_0_8px_#10b981]" title="Verified Profile">
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </div>

            {/* User Information */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white font-aldrich drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    {user?.fullName || user?.username || 'Participant'}
                  </h1>
                  <p className="text-xs sm:text-sm text-purple-300/80 font-aldrich mt-0.5">
                    @{user?.username || 'user'}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-950/40 text-emerald-300 text-[11px] font-semibold tracking-wider uppercase font-aldrich self-center sm:self-start shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>VERIFIED PROFILE</span>
                </div>
              </div>

              {/* Meta Details Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 mt-4 pt-4 border-t border-purple-800/40 font-aldrich text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-purple-200/90">
                  <Mail className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{user?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200/90">
                  <GraduationCap className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                  <span>Category: <strong className="text-white">{categoryLabel}</strong></span>
                </div>
                {user?.phoneNumber && (
                  <div className="flex items-center gap-2 text-purple-200/90">
                    <Phone className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                    <span>{user.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Registered Events Section Header */}
        <div className="flex items-center justify-between gap-4 mt-6 mb-3 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-pink-500/40 flex items-center justify-center text-pink-300 shadow-[0_0_10px_rgba(244,114,182,0.3)]">
                <Ticket className="w-4 h-4 text-pink-300" />
              </div>
              <h2 className="font-tungsten text-2xl sm:text-3xl tracking-wider text-white uppercase font-bold">
                REGISTERED EVENTS
              </h2>
            </div>
            <div className="w-10 h-[2px] bg-pink-400 rounded-full mt-1 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-purple-950/50 p-1 rounded-xl border border-purple-500/30">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-aldrich transition-all ${
                filter === 'all'
                  ? 'bg-pink-500/30 text-white border border-pink-400/50 shadow-[0_0_10px_rgba(244,114,182,0.3)]'
                  : 'text-purple-300/70 hover:text-white'
              }`}
            >
              All ({registeredEvents.length})
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-aldrich transition-all ${
                filter === 'verified'
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'text-purple-300/70 hover:text-white'
              }`}
            >
              Verified & Paid
            </button>
          </div>
        </div>

        {/* Registered Events Content Area - strictly bounded */}
        <div className="flex-1 w-full flex flex-col justify-center min-h-[140px] overflow-hidden">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[360px] pr-1">
              {filteredEvents.map((event) => {
                const meta = getEventByBackendName(event.event_name);
                return (
                  <div
                    key={event.id}
                    className="bg-[#12071f]/80 border border-pink-500/40 rounded-2xl p-4 backdrop-blur-xl shadow-[0_0_20px_rgba(244,114,182,0.15)] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-900/50 border border-purple-400/40 text-purple-200 text-[10px] font-bold tracking-widest uppercase font-aldrich">
                        {meta?.type || 'EVENT'}
                      </span>
                      {event.isVerified ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-400/60 text-emerald-300 text-[11px] font-semibold font-aldrich">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Payment Verified</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-400/60 text-amber-300 text-[11px] font-semibold font-aldrich">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Pending Verification</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-tungsten text-xl sm:text-2xl tracking-wider text-white uppercase font-bold">
                      {meta?.name || event.event_name.toUpperCase()}
                    </h3>

                    <p className="text-xs text-purple-200/80 font-aldrich mt-1">
                      {event.team_name && <span>Team {event.team_name} · </span>}
                      {event.is_team_leader
                        ? event.person2
                          ? `With ${event.person2}`
                          : 'Solo'
                        : `Team led by ${event.person1}`}
                    </p>

                    <div className="flex items-center justify-between text-xs text-purple-200/80 font-aldrich mt-2 pt-2 border-t border-purple-800/40">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        <span>{meta?.date}</span>
                      </div>
                      <span className="text-purple-300/70 font-mono text-[11px]">ID: {event.id}</span>
                    </div>

                    {event.is_team_leader && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setTeammateEvent(event)}
                        className="w-full mt-3 text-xs font-aldrich tracking-widest"
                      >
                        {event.person2 ? 'CHANGE TEAMMATE' : 'ADD TEAMMATE'}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Clean Empty Canvas when no events are registered (No Dummy Data) */
            <div className="w-full flex-1 flex flex-col items-center justify-center text-center">
              {isLoading && (
                <p className="text-sm text-purple-200/70 font-aldrich tracking-wide">Loading your events...</p>
              )}
              {!isLoading && loadError && (
                <p className="text-sm text-red-300 font-aldrich tracking-wide">{loadError}</p>
              )}
            </div>
          )}
        </div>

      </main>

      {teammateEvent && (
        <DuoRegistrationModal
          isOpen
          mode="change"
          onClose={() => setTeammateEvent(null)}
          event={getEventByBackendName(teammateEvent.event_name)}
          user={user}
          onRegistrationComplete={loadEvents}
        />
      )}
    </div>
  );
};
