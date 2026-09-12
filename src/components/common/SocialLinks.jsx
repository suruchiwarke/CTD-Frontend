import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

export const SocialLinks = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Instagram Button */}
      <a
        href="https://www.instagram.com/pictieee/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit PICT IEEE Instagram"
        className="w-10 h-10 rounded-xl border border-purple-400/40 bg-purple-950/20 backdrop-blur-md flex items-center justify-center text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-900/40 hover:shadow-[0_0_15px_rgba(216,180,254,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <Instagram className="w-5 h-5" />
      </a>

      {/* LinkedIn Button */}
      <a
        href="https://www.linkedin.com/company/pisbieee/posts/?feedView=all"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit PICT IEEE LinkedIn"
        className="w-10 h-10 rounded-xl border border-purple-400/40 bg-purple-950/20 backdrop-blur-md flex items-center justify-center text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-900/40 hover:shadow-[0_0_15px_rgba(216,180,254,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <Linkedin className="w-5 h-5" />
      </a>
    </div>
  );
};
