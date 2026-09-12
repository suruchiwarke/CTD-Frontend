import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { User as UserIcon, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SidebarDrawer } from './SidebarDrawer';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'EVENTS', path: '/events' },
    { name: 'WEB TEAM', path: '/web-team' },
    { name: 'SPONSORS', path: '/sponsors' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#06020c]/40 backdrop-blur-md border-b border-purple-900/20 transition-all duration-300">
        {/* Full width container with left and right corner padding */}
        <div className="w-full px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Logos on Left Corner: CTD | PICT IEEE */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* CTD Logo -> Home */}
            <Link
              to="/"
              className="flex items-center group transition-transform duration-200 hover:scale-105"
              aria-label="CTD Home"
            >
              <img
                src="/assets/logos/ctd-logo.png"
                alt="CTD Logo"
                className="h-7 sm:h-9 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              />
            </Link>

            {/* Vertical Separator */}
            <div className="w-[1.5px] h-6 sm:h-8 bg-purple-300/40 rounded-full" />

            {/* PICT IEEE Logo -> External PICT IEEE Site */}
            <a
              href="https://pictieee.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center group transition-transform duration-200 hover:scale-105"
              aria-label="PICT IEEE Student Branch Official Website"
            >
              <img
                src="/assets/logos/pisb-logo.png"
                alt="PICT IEEE Student Branch Logo"
                className="h-6 sm:h-8 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              />
            </a>
          </div>

          {/* Desktop Center Navigation Links (Hidden on Auth pages) */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className="relative group py-2 text-xs lg:text-sm font-semibold tracking-widest text-purple-200/80 hover:text-white transition-colors uppercase"
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_8px_#f472b6] rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          )}

          {/* Right Corner Area: Circular Profile Logo (if logged in) OR Login button / 3 lines */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {isAuthPage ? (
              /* On Login, Signup, Forgot Password pages -> Show 3 Horizontal Lines */
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 text-purple-200 hover:text-white rounded-lg hover:bg-purple-950/50 transition-colors focus:outline-none"
                aria-label="Open navigation drawer"
              >
                <Menu className="w-7 h-7" />
              </button>
            ) : (
              /* On Normal pages */
              <>
                {isAuthenticated ? (
                  /* Small Circular Profile Logo Only */
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="w-10 h-10 rounded-full border border-purple-400/50 bg-gradient-to-br from-purple-900/80 to-purple-950/80 flex items-center justify-center text-purple-100 hover:text-white hover:border-purple-300 hover:shadow-[0_0_15px_rgba(216,180,254,0.4)] transition-all transform hover:scale-105 focus:outline-none"
                      aria-label="User Profile"
                      title={user?.fullName || user?.username || 'Profile'}
                    >
                      <UserIcon className="w-5 h-5 text-purple-200" />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#1a0c2e]/95 border border-purple-500/40 backdrop-blur-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-4 py-3 border-b border-purple-800/40">
                          <p className="text-[10px] text-purple-300/70 uppercase tracking-widest">Signed in as</p>
                          <p className="text-sm font-bold text-white truncate mt-0.5">{user?.fullName || user?.username}</p>
                          <p className="text-xs text-purple-300/80 truncate">{user?.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-purple-900/40 flex items-center gap-2 font-semibold uppercase tracking-wider transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-purple-400/40 bg-purple-950/30 text-purple-100 hover:text-white hover:border-purple-300 hover:bg-purple-900/40 hover:shadow-[0_0_15px_rgba(216,180,254,0.3)] transition-all text-xs lg:text-sm font-bold tracking-widest uppercase"
                  >
                    <UserIcon className="w-4 h-4 text-purple-300" />
                    <span>LOGIN</span>
                  </Link>
                )}

                {/* Mobile hamburger on standard pages */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="md:hidden p-2 text-purple-200 hover:text-white rounded-lg hover:bg-purple-950/50 transition-colors focus:outline-none"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Slide-out navigation drawer */}
      <SidebarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
