import React from 'react';

export const SponsorsPage = () => {
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
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col items-center justify-start gap-14 sm:gap-20 text-center">
        {/* Section 1: Title Sponsor */}
        <section className="flex flex-col items-center w-full">
          <h2 className="font-tungsten text-5xl sm:text-6xl md:text-7xl tracking-wide text-gradient-ctd drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Title Sponsor
          </h2>
          <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_10px_#f472b6,0_0_20px_rgba(244,114,182,0.8)] rounded-full mt-2 mb-6" />

          {/* Empty Content Canvas for Teammates */}
          <div className="w-full min-h-[120px] flex items-center justify-center">
            {/* Teammates can add Title Sponsor logos / content here */}
          </div>
        </section>

        {/* Section 2: Co-Sponsor */}
        <section className="flex flex-col items-center w-full">
          <h2 className="font-tungsten text-5xl sm:text-6xl md:text-7xl tracking-wide text-gradient-ctd drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Co-Sponsor
          </h2>
          <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_10px_#f472b6,0_0_20px_rgba(244,114,182,0.8)] rounded-full mt-2 mb-6" />

          {/* Empty Content Canvas for Teammates */}
          <div className="w-full min-h-[120px] flex items-center justify-center">
            {/* Teammates can add Co-Sponsor logos / content here */}
          </div>
        </section>
      </main>
    </div>
  );
};
