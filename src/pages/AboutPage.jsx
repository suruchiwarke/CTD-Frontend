import React from 'react';

export const AboutPage = () => {
  return (
    <div className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between overflow-x-hidden bg-black">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/assets/backgrounds/blurred-background.png')`,
        }}
      />

      {/* Main Content - Vertically centered and tailored to fit single screen without scrolling on desktop */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-6 flex flex-col justify-center items-center gap-6 sm:gap-7 md:gap-8 text-center my-auto">
        
        {/* Section 1: Credenz Tech Dayz */}
        <section className="flex flex-col items-center w-full">
          {/* CTD Logo */}
          <div className="mb-1.5">
            <img
              src="/assets/logos/ctd-logo.png"
              alt="CTD Logo"
              className="h-10 sm:h-12 md:h-14 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            />
          </div>

          <h2 className="font-aldrich text-xs sm:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.4em] text-white uppercase">
            CREDENZ TECH DAYZ
          </h2>

          {/* Glowing Pink Divider */}
          <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_8px_#f472b6,0_0_16px_rgba(244,114,182,0.8)] rounded-full my-2.5" />

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-[14px] lg:text-[14.5px] text-purple-100/90 leading-relaxed max-w-3xl font-light">
            Credenz Tech Dayz is an intra-college annual techfest organized by the{' '}
            <strong className="font-bold text-[#f472b6]">PICT IEEE Student Branch</strong>, where the brightest minds of PICT compete in technical as well as non-technical events. Participants get a chance to test their logical aptitude and problem-solving skills in events like National Computing Contest and Reverse Coding. The Network Treasure Hunt is an online cryptic hunt that challenges you to use every tool at your disposal and piece together every bit of the puzzle.{' '}
            <strong className="font-bold text-[#f472b6]">Inquisitive</strong> is a mind-boggling test to question your wits and test your general knowledge.
          </p>
        </section>

        {/* Section 2: IEEE */}
        <section className="flex flex-col items-center w-full">
          {/* IEEE Logo */}
          <div className="mb-2">
            <img
              src="/assets/logos/ieee-logo.png"
              alt="IEEE Logo"
              className="h-7 sm:h-8 md:h-9 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            />
          </div>

          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wide text-gradient-ctd">
            Institute of Electrical and Electronics Engineering (IEEE)
          </h2>

          {/* Glowing Pink Divider */}
          <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_8px_#f472b6,0_0_16px_rgba(244,114,182,0.8)] rounded-full my-2.5" />

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-[14px] lg:text-[14.5px] text-purple-100/90 leading-relaxed max-w-3xl font-light">
            The Institute of Electrical and Electronics Engineering (IEEE) is an international organization, which has been the nexus for propagating scientific expertise among people all over the globe. IEEE continues to attract students, faculty, and professionals from various fields worldwide and is committed to incorporating diversity in thoughts, which is essential for scientific development. IEEE currently has Student Branches at thousands of universities and colleges in hundreds of countries throughout the world.
          </p>
        </section>

      </main>
    </div>
  );
};
