import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Trophy,
  Calendar,
  Ticket,
  Users,
  Phone,
  UserCheck,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { DuoRegistrationModal } from '../components/common/DuoRegistrationModal';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useCart } from '../context/CartContext';
import { getEventById } from '../data/eventsData';
import { teamsApi } from '../api/teams.js';

const MetaRow = ({ icon: Icon, label, value, accent, children, last }) => (
  <div
    className={`flex items-start gap-2.5 px-3.5 py-1.5 sm:py-2 ${
      last ? '' : 'border-b border-purple-800/30'
    }`}
  >
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex-shrink-0 bg-purple-900/50 border border-purple-400/30 text-[#f472b6] flex items-center justify-center">
      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[8.5px] sm:text-[9px] font-aldrich uppercase tracking-widest text-purple-300/60 mb-0.5">
        {label}
      </p>
      {value && (
        <p
          className={
            accent
              ? 'font-tungsten text-lg sm:text-xl text-gradient-ctd leading-none'
              : 'text-[11px] sm:text-xs font-semibold text-white leading-snug'
          }
        >
          {value}
        </p>
      )}
      {children}
    </div>
  </div>
);

export const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addToCart, cartItems } = useCart();
  const { showSuccess } = useNotification();

  const [isRegistered, setIsRegistered] = useState(false);
  const [teammate, setTeammate] = useState(null);
  const [isDuoModalOpen, setIsDuoModalOpen] = useState(false);
  const [modalInitialStep, setModalInitialStep] = useState('PROMPT');

  const event = getEventById(eventId);
  const isDuoEvent = event?.isDuo || ['reverse-coding', 'enigma', 'ncc'].includes(event?.id);

  const loadRegistrationAndTeamStatus = useCallback(() => {
    if (!event) return;

    // If user is not logged in, they cannot be registered
    if (!isAuthenticated || !user) {
      setIsRegistered(false);
      setTeammate(null);
      return;
    }

    const userKey = user.id || user.username || user.email;
    const registered = userKey ? teamsApi.isUserRegistered(event.id, userKey) : false;

    if (registered) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }

    if (isDuoEvent && userKey) {
      const teamStatus = teamsApi.getDuoTeamStatusSync(event.id, userKey);
      if (teamStatus && teamStatus.teammate) {
        setTeammate(teamStatus.teammate);
        setIsRegistered(true);
      } else {
        setTeammate(null);
      }
    }
  }, [event, isAuthenticated, user, isDuoEvent]);

  useEffect(() => {
    loadRegistrationAndTeamStatus();
  }, [loadRegistrationAndTeamStatus]);

  if (!event) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-4">
        <p className="font-aldrich text-sm text-purple-300 uppercase tracking-widest mb-4">
          Event not found
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-400/40 bg-purple-950/40 text-purple-200 hover:text-white text-xs font-aldrich uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Events
        </Link>
      </div>
    );
  }

  const handleRegister = () => {
    // 1. Check login first
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: `/events/${event.id}` } });
      return;
    }

    // 2. Perform event registration in local store and cart
    teamsApi.registerUserForEvent(event.id, user);
    setIsRegistered(true);
    addToCart(event);
    showSuccess(`Registration confirmed for ${event.name}!`);
  };

  const handleRegistrationComplete = (addedTeammate) => {
    setIsRegistered(true);
    if (addedTeammate) {
      setTeammate(addedTeammate);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-purple-600 selection:text-white">
      {/* Blurred celestial background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/assets/backgrounds/blurred-background.png')` }}
      />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <main className="relative z-10 w-full pt-20 lg:min-h-screen flex flex-col">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex flex-col flex-1 lg:min-h-0">
          {/* Back link row */}
          <div className="flex items-center mb-2 sm:mb-2.5 flex-shrink-0">
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-400/30 bg-[#190a2b]/60 backdrop-blur-md text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-900/40 transition-all text-[9px] sm:text-[11px] font-aldrich uppercase tracking-widest group"
            >
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Events</span>
            </Link>
          </div>

          {/* Hero: logo + title + tagline */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 flex-shrink-0">
            {event.logo && (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 bg-purple-950/60 border border-purple-400/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_18px_rgba(168,85,247,0.2)] p-1.5">
                <img src={event.logo} alt={`${event.name} logo`} className="w-full h-full object-contain" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-tungsten text-2xl sm:text-3xl md:text-4xl tracking-wide text-gradient-ctd leading-none drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] break-words">
                {event.name}
              </h1>
              <p className="font-aldrich text-[10px] sm:text-[11px] text-purple-200/70 tracking-wide mt-0.5 line-clamp-2">
                {event.tagline}
              </p>
            </div>
          </div>

          {/* Two-column body */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-3 sm:gap-4 flex-1 lg:min-h-0 items-stretch pb-2 sm:pb-3">
            {/* LEFT: About */}
            <div className="glass-card p-4 sm:p-5 lg:p-6 lg:overflow-y-auto lg:min-h-0 flex flex-col justify-center">
              <p className="text-[11px] font-aldrich uppercase tracking-widest text-purple-300/60 mb-3 sm:mb-4">
                About
              </p>
              <div className="space-y-3.5 sm:space-y-4">
                {event.description.map((p, i) => (
                  <p key={i} className="text-base sm:text-lg text-purple-100/90 leading-relaxed font-light">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* RIGHT: Meta sidebar + register */}
            <div className="flex flex-col gap-2 sm:gap-2.5 lg:min-h-0">
              <div className="glass-card overflow-hidden flex-shrink-0">
                <MetaRow icon={Trophy} label="Prize Pool" value={event.prize} accent />
                <MetaRow icon={Calendar} label="Date" value={event.date} />
                <MetaRow icon={Ticket} label="Registration Fee" value={event.fee} />
                <MetaRow icon={Users} label="Team Size" value={event.teamSize} />
                <MetaRow icon={Phone} label="Contact" last>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    {event.contacts.map((c) => (
                      <p key={c.name} className="text-[10px] sm:text-[11px] leading-snug">
                        <span className="text-purple-300/70">{c.name}</span>{' '}
                        <span className="font-aldrich text-purple-200/90">{c.phone}</span>
                      </p>
                    ))}
                  </div>
                </MetaRow>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <Button
                  size="md"
                  withArrow={!isRegistered}
                  disabled={isRegistered}
                  onClick={handleRegister}
                  className="w-full flex-shrink-0 font-aldrich tracking-widest"
                >
                  {isRegistered ? 'REGISTRATION CONFIRMED' : 'REGISTER NOW'}
                </Button>

                {/* Duo Teammate Controls: Enabled ONLY after registration is confirmed */}
                {isDuoEvent && (
                  <>
                    {teammate ? (
                      /* Display confirmed duo badge if teammate already added */
                      <div className="p-3.5 rounded-2xl bg-[#1c0c2a]/80 border border-purple-400/40 backdrop-blur-md flex flex-col gap-2 shadow-[0_4px_20px_rgba(168,85,247,0.15)] animate-in fade-in duration-300">
                        <div className="flex items-center justify-between text-[11px] font-aldrich text-purple-200 uppercase tracking-wider">
                          <span>
                            Category:{' '}
                            <strong className="text-pink-300 font-bold">
                              {user?.category || 'Junior'}
                            </strong>
                          </span>
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                            <UserCheck className="w-3.5 h-3.5" /> DUO READY
                          </span>
                        </div>
                        <div className="pt-1 border-t border-purple-800/40 flex items-center justify-between">
                          <span className="text-xs text-purple-300/70 font-aldrich">Teammate:</span>
                          <span className="text-sm font-semibold text-white font-aldrich tracking-wide">
                            {teammate.fullName || teammate.username}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => {
                            setModalInitialStep('ADD_TEAMMATE');
                            setIsDuoModalOpen(true);
                          }}
                          className="w-full mt-1 text-xs font-aldrich tracking-widest"
                        >
                          CHANGE TEAM MEMBER
                        </Button>
                      </div>
                    ) : (
                      /* "ADD TEAM MEMBER" button: Disabled until registration is confirmed */
                      <Button
                        size="md"
                        variant="primary"
                        disabled={!isRegistered}
                        onClick={() => {
                          if (!isRegistered) return;
                          setModalInitialStep('ADD_TEAMMATE');
                          setIsDuoModalOpen(true);
                        }}
                        className={`w-full font-aldrich tracking-widest transition-all duration-300 ${
                          !isRegistered
                            ? 'opacity-40 cursor-not-allowed filter grayscale'
                            : 'hover:shadow-[0_0_25px_rgba(244,114,182,0.6),0_0_40px_rgba(192,132,252,0.4)]'
                        }`}
                        title={!isRegistered ? 'Please register first to add a team member' : 'Add your teammate'}
                      >
                        ADD TEAM MEMBER
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Duo Registration Modal Flow */}
      {isDuoEvent && (
        <DuoRegistrationModal
          isOpen={isDuoModalOpen}
          onClose={() => setIsDuoModalOpen(false)}
          event={event}
          user={user}
          initialStep={modalInitialStep}
          onRegistrationComplete={handleRegistrationComplete}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
