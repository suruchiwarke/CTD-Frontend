import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Trophy,
  Calendar,
  Ticket,
  Users,
  Phone,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { getEventById, eventsData } from '../data/eventsData';

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
  const { showSuccess } = useNotification();
  const [isRegistered, setIsRegistered] = React.useState(false);

  const event = getEventById(eventId);

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
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: `/events/${event.id}` } });
      return;
    }
    setIsRegistered(true);
    showSuccess(`Successfully registered for ${event.name}!`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-purple-600 selection:text-white">
      {/* Blurred celestial background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/assets/backgrounds/blurred-background.png')` }}
      />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Content area: targets one screen on large viewports, but the page can
          still scroll if a particular browser/zoom/OS chrome leaves less
          room than expected — nothing is ever clipped or unreachable. */}
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

              <Button
                size="md"
                withArrow={!isRegistered}
                disabled={isRegistered}
                onClick={handleRegister}
                className="w-full flex-shrink-0"
              >
                {isRegistered
                  ? 'REGISTRATION CONFIRMED'
                  : isAuthenticated
                  ? 'REGISTER NOW'
                  : 'SIGN IN TO REGISTER'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;
