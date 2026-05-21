'use client';

import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      toast.error(error.message || 'Login failed!');
    } else {
      toast.success('Login Successful! Welcome back.');
    }
  };

  const handlGoogleLogin = async () => {
    try {
      await authClient.signIn.social({ provider: 'google' });
    } catch (err) {
      toast.error('Google login failed!');
    }
  };

  return (
    <div className="min-h-screen py-10 lg:py-16 flex items-center justify-center relative overflow-hidden bg-[url('/images/img.jpeg')] bg-cover bg-center">
      {/* Background Overlay for Better Readability */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[90%] sm:max-w-md lg:max-w-lg mx-auto"
      >
        {/* Main Card with Premium Glassmorphism */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden">
          <form onSubmit={handleLogin} className="p-8 lg:p-10 flex flex-col gap-5">
            {/* Header Section */}
            <div className="text-center mb-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">Please enter your details to login</p>
            </div>

            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label mb-1.5">
                <span className="text-sm font-semibold text-slate-700">Email Address</span>
              </label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm shadow-sm placeholder:text-slate-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <span className="text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline cursor-pointer transition">
                  Forgot?
                </span>
              </div>
              <input
                name="password"
                type="password"
                className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm shadow-sm placeholder:text-slate-400"
                placeholder="Enter your password"
                autoComplete="new-password"
                required
              />
            </div>

            {/* Action Buttons & Navigation */}
            <div className="flex flex-col gap-3.5 mt-4">
              {/* Email Sign In Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl text-base shadow-md transition-colors"
                type="submit"
              >
                Sign In
              </motion.button>

              {/* Styled Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  or continue with
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Google Login Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handlGoogleLogin}
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
                type="button"
              >
                <FcGoogle className="text-2xl shrink-0" />
                <span>Google Account</span>
              </motion.button>

              {/* Redirect link to Register */}
              <p className="text-center text-slate-500 mt-3 text-sm">
                Don&apos;t have an account?
                <Link
                  href="/register"
                  className="text-orange-600 font-bold ml-1.5 hover:text-orange-700 hover:underline transition"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
