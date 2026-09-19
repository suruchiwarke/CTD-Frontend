import React, { useState, useEffect } from 'react';
import { SocialLinks } from '../components/common/SocialLinks';
import { GeneralInstructionsModal } from '../components/common/GeneralInstructionsModal';
import { Info } from 'lucide-react';

export const HomePage = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if instructions were already dismissed during this session
    const seen = sessionStorage.getItem('ctd_instructions_seen');
    if (!seen) {
      setShowInstructions(true);
    }
  }, []);

  const handleCloseInstructions = () => {
    sessionStorage.setItem('ctd_instructions_seen', 'true');
    setShowInstructions(false);
  };

  return (
    <div className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-black">
      {/* Crisp Main Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/assets/backgrounds/main-background.png')`,
        }}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 z-0 bg-black/10 pointer-events-none" />

      {/* General Instructions Popup */}
      <GeneralInstructionsModal
        isOpen={showInstructions}
        onClose={handleCloseInstructions}
      />

      {/* Main Center Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-6 text-center">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto select-none">
          {/* Main Title: CREDENZ */}
          <h1
            className="font-tungsten text-7xl sm:text-9xl md:text-[13rem] lg:text-[15rem] leading-none tracking-tight text-gradient-ctd drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            CREDENZ
          </h1>

          {/* Subtitle: TECH DAYZ */}
          <h2
            className="font-aldrich text-base sm:text-xl md:text-2xl font-normal tracking-[0.45em] sm:tracking-[0.6em] text-purple-200/90 uppercase mt-1 sm:mt-2"
          >
            TECH DAYZ
          </h2>

          {/* Glowing Gradient Underline Divider */}
          <div className="w-24 sm:w-36 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_12px_#f472b6,0_0_24px_rgba(244,114,182,0.8)] rounded-full my-4 sm:my-6" />

          {/* Dates: 5 OCT - 7 OCT 2026 */}
          <p
            className="font-aldrich text-sm sm:text-lg md:text-xl tracking-[0.35em] sm:tracking-[0.5em] text-white/95 uppercase font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
          >
            5 OCT - 7 OCT 2026
          </p>
        </div>
      </main>

      {/* Footer / Bottom Corner Elements */}
      <footer className="relative z-10 w-full px-6 sm:px-10 lg:px-12 pb-6 sm:pb-8 flex items-end justify-between">
        {/* Bottom Left: Instagram & LinkedIn buttons + Instructions button */}
        <div className="flex items-center gap-4">
          <SocialLinks />
          <button
            onClick={() => setShowInstructions(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 backdrop-blur-md text-[11px] font-semibold text-purple-200/80 hover:text-white hover:border-pink-500/50 hover:shadow-[0_0_10px_rgba(244,114,182,0.4)] transition-all uppercase tracking-widest font-aldrich"
            title="View General Instructions"
          >
            <Info className="w-3.5 h-3.5 text-pink-400" />
            <span>Instructions</span>
          </button>
        </div>

        {/* Bottom Right: — 2026 Indicator */}
        <div className="flex items-center gap-3 text-purple-200/90 font-aldrich text-sm sm:text-base tracking-widest uppercase">
          <span className="w-8 sm:w-12 h-[1.5px] bg-purple-300/60" />
          <span className="font-bold text-white text-base sm:text-xl">2026</span>
        </div>
      </footer>
    </div>
  );
};
