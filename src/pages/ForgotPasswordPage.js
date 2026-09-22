import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Sun, Moon, Loader2, MailCheck, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';

const RESEND_COOLDOWN_SECONDS = 60;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const requestReset = async (isResend) => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = isResend
        ? await api.resendPasswordReset(email)
        : await api.forgotPassword(email);
      toast.success(response.message || 'Check your email for a reset link');
      setSubmitted(true);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      if (typeof error.secondsRemaining === 'number') {
        setCooldown(error.secondsRemaining);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    requestReset(false);
  };

  const handleResend = () => {
    requestReset(true);
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
            Locked out happens to everyone.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
            Enter the email on your account and we&rsquo;ll send you a link to get back in.
          </p>
        </div>

        <p className="relative text-xs text-gray-500 dark:text-gray-600">
          Publish something today. Even a small one.
        </p>
      </div>

      {/* Forgot password form */}
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
          <Link
            to="/login"
            className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft size={15} />
            Back to sign in
          </Link>

          {!submitted ? (
            <>
              <div className="mb-8">
                <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">
                  Forgot your password?
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  We&rsquo;ll email you a link to reset it.
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

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary !py-3 flex w-full items-center justify-center space-x-2"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span>Send reset link</span>}
                </button>
              </form>
            </>
          ) : (
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                <MailCheck size={22} />
              </div>
              <h2 className="font-serif text-2xl font-medium text-gray-900 dark:text-white">Check your email</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                If an account exists for <span className="font-medium text-gray-700 dark:text-gray-300">{email}</span>,
                a reset link is on its way. The link expires in 30 minutes.
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={loading || cooldown > 0}
                className="btn-secondary mt-6 flex w-full items-center justify-center space-x-2 !py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>{cooldown > 0 ? `Resend email (${cooldown}s)` : 'Resend email'}</span>
                )}
              </button>
            </div>
          )}

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

export default ForgotPasswordPage;
