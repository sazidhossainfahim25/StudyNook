'use client';

import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    if (error) {
      toast.error(error.message || 'Register failed!');
    } else {
      toast.success('Registration Successful');
      router.push('/');
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
    <section>
      <div className="min-h-screen py-10 lg:py-16 flex items-center justify-center relative overflow-hidden bg-[url('/images/img.jpeg')] bg-cover bg-center">
        {/* Deep Overlay for Glass Effect Contrast */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px]"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[90%] sm:max-w-md lg:max-w-xl mx-auto"
        >
          {/* Main Card with Premium Glassmorphism */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden">
            <form onSubmit={onSubmit} className="p-6 sm:p-10 flex flex-col gap-4">
              {/* Header Section */}
              <div className="text-center mb-2">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Create Account
                </h2>
                <p className="text-slate-500 text-sm mt-1.5">
                  Please fill in the details to create your account
                </p>
              </div>

              {/* Responsive Form Grid for Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="form-control w-full">
                  <label className="mb-1.5 text-sm font-semibold text-slate-700">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm shadow-sm placeholder:text-slate-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="form-control w-full">
                  <label className="mb-1.5 text-sm font-semibold text-slate-700">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm shadow-sm placeholder:text-slate-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div className="form-control w-full">
                <label className="mb-1.5 text-sm font-semibold text-slate-700">
                  Profile Image URL
                </label>
                <input
                  name="image"
                  type="text"
                  className="w-full px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm shadow-sm placeholder:text-slate-400"
                  placeholder="Image URL"
                />
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="mb-1.5 text-sm font-semibold text-slate-700">Password *</label>
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
              <div className="flex flex-col gap-3.5 mt-2">
                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl text-base shadow-md transition-colors"
                  type="submit"
                >
                  Create Account
                </motion.button>

                {/* Styled Divider */}
                <div className="relative flex py-1.5 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                    OR
                  </span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Google Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handlGoogleLogin}
                  className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
                  type="button"
                >
                  <FcGoogle className="text-2xl shrink-0" />
                  <span>Continue with Google</span>
                </motion.button>

                {/* Redirect Link */}
                <p className="text-center text-slate-500 mt-2 text-sm">
                  Already have an account?
                  <Link
                    href="/login"
                    className="text-orange-600 font-bold ml-1.5 hover:text-orange-700 hover:underline transition"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterPage;
