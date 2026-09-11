import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Sun, Moon, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.login(email, password);
      login(response.user);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed');
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
            Where ideas find their voice.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
            A quiet corner of the internet for writers who&rsquo;d rather finish a messy draft than perfect one that never ships.
          </p>

          <div className="mt-10 -rotate-2 rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between">
              <span className="badge badge-primary">Essay</span>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                <Clock size={12} />
                <span>6 min read</span>
              </div>
            </div>
            <h3 className="mt-3 font-serif text-lg font-medium text-gray-900 dark:text-gray-100">
              On Writing Badly First
            </h3>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
              Every clean draft was once a mess. Here&rsquo;s why that&rsquo;s the whole point, and how to stop waiting for the good version.
            </p>
            <div className="mt-4 flex items-center gap-2.5 border-t border-gray-200/70 pt-4 dark:border-white/10">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-xs font-semibold text-white">
                M
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mira Chen</span>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-gray-500 dark:text-gray-600">
          Publish something today. Even a small one.
        </p>
      </div>

      {/* Auth form */}
      <div className="relative flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:min-h-0 lg:justify-center lg:px-20 lg:py-0">
        <div className="flex items-center justify-between lg:absolute lg:right-12 lg:top-10">
          <Logo size={36} wordmarkClassName="text-lg text-gray-900 dark:text-white" className="lg:hidden" />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center lg:flex-none">
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in to keep writing where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 dark:border-gray-800 dark:bg-gray-custom">
                <Mail size={17} className="shrink-0 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-gray-100 dark:placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 dark:border-gray-800 dark:bg-gray-custom">
                <Lock size={17} className="shrink-0 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary !py-3 flex w-full items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign in</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-5 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-custom dark:text-gray-500">
            Demo account &mdash;{' '}
            <span className="text-gray-700 dark:text-gray-400">john@example.com / password123</span>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            New to BlogFoundry?{' '}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
