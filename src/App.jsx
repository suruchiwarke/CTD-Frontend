import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/common/Navbar';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { WebTeamPage } from './pages/WebTeamPage';
import { SponsorsPage } from './pages/SponsorsPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-black text-white relative selection:bg-pink-600 selection:text-white">
              <ScrollToTop />
              
              {/* Global Navbar */}
              <Navbar />

              {/* Application Routes */}
              <div className="flex-1 flex flex-col">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/events/:eventId" element={<EventDetailPage />} />
                  <Route
                    path="/decode-rush"
                    element={<Navigate to="/events/decode-rush" replace />}
                  />
                  <Route path="/web-team" element={<WebTeamPage />} />
                  <Route path="/sponsors" element={<SponsorsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </div>
            </div>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;
