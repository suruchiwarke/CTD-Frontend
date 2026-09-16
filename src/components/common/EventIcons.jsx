import React from 'react';

// Line-icon badges used at the top of each event detail page.
// Visual language: pink stroke on transparent, matching the rest of the
// glass-card / text-gradient-ctd design system.

export const ReverseCodeIcon = () => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <polyline points="11 22 5 16 11 10" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="21 10 27 16 21 22" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="8" x2="16" y2="24" stroke="rgba(244,114,182,0.4)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const EnigmaIcon = () => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="4" width="10" height="10" rx="1.5" stroke="#f472b6" strokeWidth="1.6" />
    <rect x="18" y="4" width="10" height="10" rx="1.5" stroke="rgba(244,114,182,0.4)" strokeWidth="1.6" />
    <rect x="4" y="18" width="10" height="10" rx="1.5" stroke="rgba(244,114,182,0.4)" strokeWidth="1.6" />
    <rect x="18" y="18" width="10" height="10" rx="1.5" stroke="#f472b6" strokeWidth="1.6" />
    <circle cx="16" cy="16" r="2" fill="rgba(244,114,182,0.5)" />
  </svg>
);

export const NCCIcon = () => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="6" width="24" height="16" rx="1.6" stroke="#f472b6" strokeWidth="1.8" />
    <polyline points="9 17 13.5 12.5 17.5 15.5 23 9.5" stroke="rgba(244,114,182,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="22" x2="16" y2="26" stroke="rgba(244,114,182,0.4)" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="10.5" y1="26" x2="21.5" y2="26" stroke="rgba(244,114,182,0.4)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const NTHIcon = () => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <rect x="7" y="15" width="18" height="13" rx="2" stroke="#f472b6" strokeWidth="1.8" />
    <path d="M11 15v-4a5 5 0 0 1 10 0v4" stroke="rgba(244,114,182,0.55)" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16" cy="20.5" r="1.7" fill="rgba(244,114,182,0.6)" />
    <line x1="16" y1="22" x2="16" y2="24.5" stroke="rgba(244,114,182,0.6)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const DecodeRushIcon = () => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <path d="M6 22V10l6-4 6 4v12" stroke="rgba(244,114,182,0.45)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="9" width="12" height="16" rx="1.6" stroke="#f472b6" strokeWidth="1.8" />
    <line x1="17.5" y1="14" x2="22.5" y2="14" stroke="rgba(244,114,182,0.6)" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="17.5" y1="17.5" x2="22.5" y2="17.5" stroke="rgba(244,114,182,0.6)" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="17.5" y1="21" x2="20.5" y2="21" stroke="rgba(244,114,182,0.6)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
