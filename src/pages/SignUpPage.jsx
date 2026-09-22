import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Phone, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    category: 'Junior category',
  });

  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = [
    { value: 'Junior category', label: 'Junior category' },
    { value: 'Senior category', label: 'Senior category' },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(formData);
      // Redirect to login page after signup
      navigate('/login');
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

      {/* Main Glassmorphic Signup Card matching Figma */}
      <div
        className="relative z-10 w-full max-w-[460px] rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300"
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
        <p className="font-aldrich text-xs sm:text-sm tracking-[0.45em] text-purple-200/90 uppercase mt-0.5 mb-6">
          TECH DAYZ
        </p>

        {/* Form Title: SIGN UP */}
        <h3 className="font-aldrich text-lg sm:text-xl font-bold tracking-[0.35em] text-white uppercase mb-6">
          SIGN UP
        </h3>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3.5">
          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            icon={<UserIcon className="w-4 h-4" />}
            required
            autoComplete="username"
          />

          <Input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            icon={<UserIcon className="w-4 h-4" />}
            required
            autoComplete="name"
          />

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            icon={<Mail className="w-4 h-4" />}
            required
            autoComplete="email"
          />

          <Input
            name="password"
            isPassword
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            icon={<Lock className="w-4 h-4" />}
            required
            autoComplete="new-password"
          />

          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            icon={<Phone className="w-4 h-4" />}
            required
            autoComplete="tel"
          />

          <Select
            name="category"
            options={categoryOptions}
            value={formData.category}
            onChange={handleChange}
            icon={<Users className="w-4 h-4" />}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            withArrow
            className="w-full mt-4 py-3"
          >
            SIGN UP
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-xs text-purple-200/80 mt-6 tracking-wide font-aldrich">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-white hover:text-purple-200 underline font-semibold transition-colors"
          >
            Log In here
          </Link>
        </p>
      </div>
    </div>
  );
};
