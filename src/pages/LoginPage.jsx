import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password, keepSignedIn });
      navigate('/');
    } catch {
      // Error handled by AuthContext via NotificationContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black px-4 pt-24 pb-12">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/assets/backgrounds/blurred-background.png')`,
        }}
      />

      {/* Main Glassmorphic Login Card matching Figma */}
      <div
        className="relative z-10 w-full max-w-[440px] rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300"
        style={{
          background: 'rgba(28, 12, 42, 0.65)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(220, 150, 255, 0.38)',
          boxShadow: '0 15px 45px rgba(10, 2, 20, 0.7), inset 0 0 25px rgba(220, 150, 255, 0.1)',
        }}
      >
        {/* Card Header: CREDENZ TECH DAYZ */}
        <h2 className="font-tungsten text-6xl sm:text-7xl tracking-wide text-gradient-ctd leading-none drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
          CREDENZ
        </h2>
        <p className="font-aldrich text-xs sm:text-sm tracking-[0.45em] text-purple-200/90 uppercase mt-0.5">
          TECH DAYZ
        </p>
        <p className="font-aldrich text-[11px] sm:text-xs tracking-[0.3em] text-purple-300/70 uppercase mt-1 mb-6">
          5 OCT - 7 OCT 2026
        </p>

        {/* Form Title: LOGIN */}
        <h3 className="font-aldrich text-lg sm:text-xl font-bold tracking-[0.35em] text-white uppercase mb-6">
          LOGIN
        </h3>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            required
            autoComplete="email"
          />

          <Input
            isPassword
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            required
            autoComplete="current-password"
          />

          {/* Keep me signed in & Forgot Password row */}
          <div className="flex items-center justify-between text-xs text-purple-200/90 pt-1 pb-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 rounded border-purple-400/40 bg-purple-950/60 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-purple-500"
              />
              <span>Keep me signed in</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-purple-300 hover:text-white transition-colors tracking-wide"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            withArrow
            className="w-full mt-2 py-3"
          >
            LOGIN
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-xs text-purple-200/80 mt-8 tracking-wide">
          New here?{' '}
          <Link
            to="/signup"
            className="text-white hover:text-purple-200 underline font-semibold transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
