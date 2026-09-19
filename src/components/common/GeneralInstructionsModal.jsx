import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export const GeneralInstructionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Glow background behind the card */}
      <div className="absolute w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative w-full max-w-xl sm:max-w-2xl bg-[#12071f]/90 border border-pink-500/50 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_40px_rgba(244,114,182,0.3)] flex flex-col z-10 animate-in zoom-in-95 duration-200">
        
        {/* Card Header: Icon Badge + Heading */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          {/* Glass Icon Box */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-900/50 border border-pink-400/40 backdrop-blur-md flex items-center justify-center text-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.3)] flex-shrink-0">
            <FileText className="w-6 h-6 text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
          </div>

          {/* Title: General Instructions with pink underline */}
          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide font-aldrich text-white">
              General <span className="text-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]">Instructions</span>
            </h2>
            <div className="w-12 h-[2.5px] bg-pink-400 rounded-full mt-1.5 shadow-[0_0_8px_rgba(244,114,182,0.9)]" />
          </div>
        </div>

        {/* Bullet Points List */}
        <ul className="space-y-4 sm:space-y-5 text-left">
          {/* Bullet 1 */}
          <li className="flex items-start gap-3.5 sm:gap-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-purple-100/90 font-aldrich">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-200 shadow-[0_0_8px_rgba(244,114,182,0.9)] flex-shrink-0 mt-1.5" />
            <span>
              FY and SY are <strong className="text-pink-400 font-semibold">Junior category</strong>, TE and BE come in <strong className="text-pink-400 font-semibold">Senior category</strong> while creating an account.
            </span>
          </li>

          {/* Bullet 2 */}
          <li className="flex items-start gap-3.5 sm:gap-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-purple-100/90 font-aldrich">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-200 shadow-[0_0_8px_rgba(244,114,182,0.9)] flex-shrink-0 mt-1.5" />
            <span>
              For the team events, <strong className="text-pink-400 font-semibold">only one person</strong> should pay the total billing amount.
            </span>
          </li>

          {/* Bullet 3 */}
          <li className="flex items-start gap-3.5 sm:gap-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-purple-100/90 font-aldrich">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-200 shadow-[0_0_8px_rgba(244,114,182,0.9)] flex-shrink-0 mt-1.5" />
            <span>
              Once you register for events, <strong className="text-pink-400 font-semibold">go to cart and checkout</strong>.
            </span>
          </li>

          {/* Bullet 4 */}
          <li className="flex items-start gap-3.5 sm:gap-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-purple-100/90 font-aldrich">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-200 shadow-[0_0_8px_rgba(244,114,182,0.9)] flex-shrink-0 mt-1.5" />
            <span>
              You will see the status of all your events in <strong className="text-pink-400 font-semibold">profile page</strong>.
            </span>
          </li>

          {/* Bullet 5 */}
          <li className="flex items-start gap-3.5 sm:gap-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-purple-100/90 font-aldrich">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-200 shadow-[0_0_8px_rgba(244,114,182,0.9)] flex-shrink-0 mt-1.5" />
            <span>
              You will get a <strong className="text-pink-400 font-semibold">confirmation email</strong> once your event has been verified.
            </span>
          </li>

          {/* Bullet 6 */}
          <li className="flex items-start gap-3.5 sm:gap-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-purple-100/90 font-aldrich">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-200 shadow-[0_0_8px_rgba(244,114,182,0.9)] flex-shrink-0 mt-1.5" />
            <span>
              If there is any mistake in your payment or anything else, registering person will be notified through <strong className="text-pink-400 font-semibold">registered email</strong>.
            </span>
          </li>
        </ul>

        {/* Got It Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            onClick={onClose}
            className="px-9 py-2.5 rounded-full bg-gradient-to-r from-pink-400 via-pink-300 to-pink-100 text-purple-950 font-bold text-sm tracking-wider uppercase hover:opacity-95 shadow-[0_0_25px_rgba(244,114,182,0.6)] flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 focus:outline-none"
          >
            <span>Got it</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
