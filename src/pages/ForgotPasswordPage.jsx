import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, KeyRound, Lock } from 'lucide-react';
import { authApi } from '../api/auth';
import { useNotification } from '../context/NotificationContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const Field = ({ id, label, children }) => (
  <div className="w-full flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs uppercase font-medium tracking-widest text-purple-200/90 pl-1">
      {label}
    </label>
    {children}
  </div>
);

// Steps: 1 = email, 2 = OTP, 3 = new password, 4 = done
const SUBMIT_LABEL = { 1: 'SEND OTP', 2: 'VERIFY OTP', 3: 'RESET PASSWORD' };

export const ForgotPasswordPage = () => {
  const { showError } = useNotification();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (step === 1) {
        await authApi.requestOtp(email);
        setStep(2);
      } else if (step === 2) {
        await authApi.verifyOtp(email, otp);
        setStep(3);
      } else {
        await authApi.changePassword(email, otp, newPassword);
        setStep(4);
      }
    } catch (err) {
      showError(err.message || 'Something went wrong. Please try again.');
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

        {step === 4 ? (
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
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Password Reset</h3>
            <p className="text-sm text-purple-200/90 leading-relaxed">
              Your password for <span className="text-white font-semibold">{email}</span> has been updated. You can now log in with your new password.
            </p>
            <Link to="/login" className="pt-2">
              <Button size="sm">Back to Login</Button>
            </Link>
          </div>
        ) : (
          /* Forgot Password Form */
          <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
            {step === 1 && (
              <Field id="email" label="EMAIL">
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
              </Field>
            )}

            {step === 2 && (
              <>
                <p className="text-sm text-purple-200/90 leading-relaxed text-center">
                  Enter the 6-digit OTP sent to <span className="text-white font-semibold">{email}</span>.
                </p>
                <Field id="otp" label="OTP">
                  <Input
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.trim())}
                    icon={<KeyRound className="w-4 h-4" />}
                    inputMode="numeric"
                    maxLength={6}
                    required
                    autoComplete="one-time-code"
                  />
                </Field>
              </>
            )}

            {step === 3 && (
              <Field id="new-password" label="NEW PASSWORD">
                <Input
                  id="new-password"
                  isPassword
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  required
                  autoComplete="new-password"
                />
              </Field>
            )}

            {/* SUBMIT Button matching Figma */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-3.5 mt-2"
            >
              {SUBMIT_LABEL[step]}
            </Button>

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-xs text-purple-300 hover:text-white transition-colors tracking-wide text-center"
              >
                Resend OTP / use a different email
              </button>
            )}
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
