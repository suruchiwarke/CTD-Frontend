import React from 'react';

export const FormError = ({ message, onClose, className = '' }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 sm:top-6 sm:right-8 z-50 transition-all duration-300 transform translate-y-0 opacity-100 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className="flex items-center gap-4 px-6 py-4 rounded-md shadow-2xl border-2 cursor-pointer transition-transform hover:scale-[1.02]"
        style={{
          backgroundColor: '#F8DFD4',
          borderColor: '#8B2626',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(139, 38, 38, 0.3)',
        }}
        onClick={onClose}
        title="Click to dismiss"
      >
        {/* Figma Red Circled X Icon */}
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#8B2626] bg-transparent">
          <svg
            className="w-6 h-6 text-[#8B2626]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Figma Error Text */}
        <div className="flex flex-col">
          <span
            className="text-base sm:text-lg font-bold tracking-wider uppercase select-none"
            style={{ color: '#7B1E1E', fontFamily: 'Aldrich, "Times New Roman", serif, sans-serif' }}
          >
            {message}
          </span>
        </div>

        {/* Close indicator */}
        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-4 text-[#8B2626] hover:opacity-75 focus:outline-none"
            aria-label="Close error banner"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
