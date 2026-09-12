import React from 'react';

export const EventsPage = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/assets/backgrounds/blurred-background.png')`,
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col items-center justify-start">
        {/* Page Title: EVENTS (Adjusted size with glowing underline) */}
        <div className="flex flex-col items-center mb-10 sm:mb-12">
          <h1 className="font-tungsten text-5xl sm:text-6xl md:text-7xl tracking-wide text-gradient-ctd drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            EVENTS
          </h1>
          <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_10px_#f472b6,0_0_20px_rgba(244,114,182,0.8)] rounded-full mt-1.5" />
        </div>

        {/* Empty Content Canvas for Teammates */}
        <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[350px]">
          {/* Teammates can add their event cards / content here */}
        </div>
      </main>
    </div>
  );
};
