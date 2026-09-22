import React, { useEffect } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';

// Type-specific colors from the CTD toast design spec.
const TOAST_STYLES = {
  error: {
    iconBg: '#fc0c0c48',
    accent: '#d10d0d',
    Icon: XCircle,
    role: 'alert',
    defaultTitle: 'Error',
  },
  warning: {
    iconBg: '#ffa30d48',
    accent: '#db970e',
    Icon: AlertTriangle,
    role: 'alert',
    defaultTitle: 'Warning',
  },
  success: {
    iconBg: '#22c55e48',
    accent: '#15803d',
    Icon: CheckCircle2,
    role: 'status',
    defaultTitle: 'Success',
  },
  info: {
    iconBg: '#0ea5e948',
    accent: '#0369a1',
    Icon: Info,
    role: 'status',
    defaultTitle: 'Info',
  },
};

export const Toast = ({ type = 'info', title, description, onClose }) => {
  const style = TOAST_STYLES[type] || TOAST_STYLES.info;
  const { Icon } = style;

  // Let the toast be dismissed with the keyboard from anywhere while it's up.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role={style.role}
      aria-live={style.role === 'alert' ? 'assertive' : 'polite'}
      className="ctd-toast relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl bg-white px-4 py-3.5 shadow-2xl sm:max-w-sm"
    >
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: style.iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: style.accent }} aria-hidden="true" />
      </div>

      <div className="relative min-w-0 flex-1 py-0.5">
        <p className="break-words text-sm font-bold leading-snug" style={{ color: style.accent }}>
          {title || style.defaultTitle}
        </p>
        {description && (
          <p className="mt-0.5 break-words text-xs leading-snug text-[#555]">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="relative -mr-1 -mt-1 shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        style={{ '--tw-ring-color': style.accent }}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};
