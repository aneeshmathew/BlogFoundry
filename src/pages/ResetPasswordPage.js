import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, Sun, Moon, Loader2, KeyRound } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('This reset link is missing its token. Please request a new one.');
      return;
    }

    if (!password || !confirmPassword) {
      toast.error('Please fill in both fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await api.resetPassword(token, password);
      toast.success(response.message || 'Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#0A0A0B] lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Editorial panel — hidden on small screens */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-paper px-14 py-12 dark:from-[#1a0b2e] dark:via-[#12071f] dark:to-black lg:flex lg:flex-col lg:justify-between">
        <span className="pointer-events-none absolute -left-10 -top-24 select-none font-serif text-[22rem] leading-none text-primary-900/5 dark:text-white/5">
          &ldquo;
        </span>

        <Logo size={40} wordmarkClassName="text-xl text-gray-900 dark:text-white" />

        <div className="relative max-w-md">
          <h1 className="font-serif text-4xl font-medium leading-[1.15] text-gray-900 dark:text-white">
            Almost back in.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
            Choose a new password and you&rsquo;ll be right back to where you left off.
          </p>
        </div>

        <p className="relative text-xs text-gray-500 dark:text-gray-600">
          Publish something today. Even a small one.
        </p>
      </div>

      {/* Reset password form */}
      <div className="relative flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:min-h-0 lg:justify-center lg:px-20 lg:py-0">
        <div className="flex items-center justify-between lg:absolute lg:right-12 lg:top-10">
          <Logo size={36} wordmarkClassName="text-lg text-gray-900 dark:text-white" className="lg:hidden" />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center lg:flex-none">
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">Set a new password</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Make it something you&rsquo;ll remember this time.
            </p>
          </div>

          {!token && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400">
              <KeyRound size={15} className="mt-0.5 shrink-0" />
              <span>
                This link is missing its reset token. Please use the link from your email, or{' '}
                <Link to="/forgot-password" className="font-medium underline">
                  request a new one
                </Link>
                .
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                New password
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 dark:border-gray-800 dark:bg-gray-custom">
                <Lock size={17} className="shrink-0 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-gray-100 dark:placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm new password
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 dark:border-gray-800 dark:bg-gray-custom">
                <Lock size={17} className="shrink-0 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-gray-100 dark:placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary !py-3 flex w-full items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span>Reset password</span>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Remembered it after all?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
