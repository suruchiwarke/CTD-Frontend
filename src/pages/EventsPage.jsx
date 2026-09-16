import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { eventsData } from '../data/eventsData';

export const EventsPage = () => {
  const navigate = useNavigate();

  // Build the grid's card data from the single shared eventsData source, so
  // the list and each event's detail page never drift out of sync.
  const eventsList = eventsData.map((event) => ({
    id: event.id,
    name: event.name,
    shortName: event.shortName,
    // Card shows a compact date without the year (matches last year's
    // density); the full date incl. year still appears on the detail page.
    date: event.date.replace(/\s*\d{4}$/, ''),
    prize: event.prize,
    logo: event.logo,
    route: `/events/${event.id}`,
  }));

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-purple-600 selection:text-white">
      {/* Blurred Celestial Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/assets/backgrounds/blurred-background.png')`,
        }}
      />

      {/* Subtle ambient lighting */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Main Content: targets one screen on large viewports, but can still
          scroll if a particular browser/zoom/OS chrome leaves less room
          than expected — nothing is ever clipped or unreachable. */}
      <main className="relative z-10 w-full pt-20 lg:min-h-screen flex flex-col">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col flex-1 lg:min-h-0 items-center justify-center">
          {/* Page Title: EVENTS */}
          <div className="flex flex-col items-center mb-4 sm:mb-6 text-center flex-shrink-0">
            <h1 className="font-tungsten text-5xl sm:text-6xl md:text-7xl tracking-wide text-gradient-ctd drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-none">
              EVENTS
            </h1>
            <div className="w-14 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_10px_#f472b6,0_0_20px_rgba(244,114,182,0.8)] rounded-full mt-2" />
          </div>

          {/* Event Cards Grid: first 2 cards wide (row 1), last 3 cards
              narrower (row 2) on large screens, matching last year's block
              layout — icon+title/date up top, Prize Pool pill anchored to
              the bottom-right of each card — stacks to a single column on
              small screens. */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
            {eventsList.map((event, i) => {
              const spanClass = i < 2 ? 'lg:col-span-3' : 'lg:col-span-2';

              return (
                <div
                  key={event.id}
                  onClick={() => navigate(event.route)}
                  className={`glass-card group relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-5 sm:gap-7 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/60 ${spanClass}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 flex items-center justify-center border border-purple-400/30 bg-purple-950/60 group-hover:border-pink-400/50 transition-all p-1.5">
                      <img src={event.logo} alt={`${event.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-sans text-base sm:text-lg lg:text-xl font-bold tracking-wide uppercase leading-tight text-white group-hover:text-gradient-ctd transition-colors whitespace-nowrap">
                        {event.shortName || event.name}
                      </h3>
                      <p className="font-aldrich text-[10px] sm:text-[11px] text-purple-200/70 tracking-wider mt-0.5 whitespace-nowrap">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="inline-flex flex-shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-950/20 text-amber-300 text-[9px] sm:text-[10px] font-aldrich tracking-wider whitespace-nowrap">
                      <Trophy className="w-3 h-3 text-amber-400" />
                      <span>Prize Pool: {event.prize}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
