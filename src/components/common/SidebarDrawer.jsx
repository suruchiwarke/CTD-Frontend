import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const SidebarDrawer = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-[#12071f]/95 border-l border-purple-500/30 backdrop-blur-2xl shadow-2xl flex flex-col z-10 px-8 py-8 animate-in slide-in-from-right duration-300">
        {/* Close Button at top right */}
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="p-2 text-purple-200 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Navigation Links LEFT ALIGNED */}
        <nav className="flex flex-col space-y-6 text-left font-medium tracking-widest text-lg items-start w-full">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `transition-colors uppercase block w-full text-left ${
                isActive ? 'text-white font-bold' : 'text-purple-300/80 hover:text-white'
              }`
            }
          >
            HOME
          </NavLink>

          <NavLink
            to="/about"
            onClick={onClose}
            className={({ isActive }) =>
              `transition-colors uppercase block w-full text-left ${
                isActive ? 'text-white font-bold' : 'text-purple-300/80 hover:text-white'
              }`
            }
          >
            ABOUT
          </NavLink>

          <NavLink
            to="/events"
            onClick={onClose}
            className={({ isActive }) =>
              `transition-colors uppercase block w-full text-left ${
                isActive ? 'text-white font-bold' : 'text-purple-300/80 hover:text-white'
              }`
            }
          >
            EVENTS
          </NavLink>

          <NavLink
            to="/web-team"
            onClick={onClose}
            className={({ isActive }) =>
              `transition-colors uppercase block w-full text-left ${
                isActive ? 'text-white font-bold' : 'text-purple-300/80 hover:text-white'
              }`
            }
          >
            WEB TEAM
          </NavLink>

          <NavLink
            to="/sponsors"
            onClick={onClose}
            className={({ isActive }) =>
              `transition-colors uppercase block w-full text-left ${
                isActive ? 'text-white font-bold' : 'text-purple-300/80 hover:text-white'
              }`
            }
          >
            SPONSORS
          </NavLink>

          <NavLink
            to="/cart"
            onClick={onClose}
            className={({ isActive }) =>
              `transition-colors uppercase flex items-center gap-2 w-full text-left ${
                isActive ? 'text-white font-bold' : 'text-purple-300/80 hover:text-white'
              }`
            }
          >
            <ShoppingCart className="w-5 h-5 text-pink-400" />
            <span>CART {cartCount > 0 && `(${cartCount})`}</span>
          </NavLink>

          {isAuthenticated ? (
            <div className="pt-6 border-t border-purple-500/30 flex flex-col items-start w-full space-y-4">
              <div className="flex items-center gap-2 text-purple-200 text-sm">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                  {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
                <span className="font-semibold">{user?.fullName || user?.username}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 text-base font-semibold uppercase tracking-wider"
              >
                <LogOut className="w-4 h-4" />
                <span>LOGOUT</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={onClose}
              className={({ isActive }) =>
                `transition-colors uppercase block w-full text-left ${
                  isActive ? 'text-white font-bold' : 'text-purple-300/80 hover:text-white'
                }`
              }
            >
              LOGIN
            </NavLink>
          )}
        </nav>

        {/* External Social / Branch Links at bottom */}
        <div className="mt-auto pt-8 border-t border-purple-500/20 flex flex-col items-start gap-4 w-full">
          <p className="text-xs text-purple-300/60 uppercase tracking-wider text-left">
            PICT IEEE Student Branch
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/pictieee/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-lg border border-purple-400/30 text-purple-200 hover:text-white hover:border-purple-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/pisbieee/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg border border-purple-400/30 text-purple-200 hover:text-white hover:border-purple-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
