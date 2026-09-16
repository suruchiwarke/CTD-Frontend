import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const { showError } = useNotification();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      showError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword({ email });
      setIsSuccess(true);
    } catch {
      // Error handled by AuthContext
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

      {/* Main Container matching Figma Screenshot */}
      <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
        
        {/* Title: FORGOT PASSWORD */}
        <h1 className="font-tungsten text-6xl sm:text-7xl md:text-8xl tracking-wide text-gradient-ctd drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-none">
          FORGOT PASSWORD
        </h1>

        {/* Glowing Pink Divider */}
        <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#f472b6] to-transparent shadow-[0_0_10px_#f472b6,0_0_20px_rgba(244,114,182,0.8)] rounded-full mt-2 mb-8" />

        {isSuccess ? (
          <div
            className="w-full rounded-2xl p-8 flex flex-col items-center space-y-4"
            style={{
              background: 'rgba(28, 12, 42, 0.65)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(220, 150, 255, 0.38)',
              boxShadow: '0 15px 45px rgba(10, 2, 20, 0.7)',
            }}
          >
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Email Sent</h3>
            <p className="text-sm text-purple-200/90 leading-relaxed">
              If an account with <span className="text-white font-semibold">{email}</span> exists, you will receive password reset instructions shortly.
            </p>
            <Link to="/login" className="pt-2">
              <Button size="sm">Back to Login</Button>
            </Link>
          </div>
        ) : (
          /* Forgot Password Form */
          <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
            <div className="w-full flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs uppercase font-medium tracking-widest text-purple-200/90 pl-1"
              >
                EMAIL
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
                autoComplete="email"
              />
            </div>

            {/* SUBMIT Button matching Figma */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-3.5 mt-2"
            >
              SUBMIT
            </Button>
          </form>
        )}

        {/* Footer Link */}
        <p className="text-xs text-purple-200/80 mt-8 tracking-wide">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-white hover:text-purple-200 underline font-semibold transition-colors"
          >
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
};
