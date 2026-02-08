'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { LoginApi } from '../../../utils/fetchapi';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useQueryClient } from '@tanstack/react-query';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginApi(credentials);
      toast.success(res.data.message);
      queryClient.invalidateQueries(['user']);
      router.refresh();
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-4 md:p-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-16 rounded-[3rem] shadow-sm">
        
        {/* Left Side: Form */}
        <div className="flex flex-col w-full max-w-md mx-auto lg:mx-0">
          <h1 className="text-5xl font-bold text-black mb-2 tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-gray-500 mb-10 font-medium">
            Start your fitness journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="xyz@gmail.com"
              required
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-full border border-gray-300 bg-[#fdfdfd] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-full border border-gray-300 bg-[#fdfdfd] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />

            <div className="flex items-center justify-between px-2 text-xs font-semibold text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-yellow-400" />
                Keep me signed in
              </label>
              <Link href="/forgot-password" size="sm" className="hover:text-black">
                Forgot your password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-[#fff200] hover:bg-yellow-400 text-black font-bold rounded-full transition-all active:scale-[0.98] shadow-md text-lg"
            >
              Login
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button 
              type="button" 
              className="w-full py-4 border border-black rounded-full flex items-center justify-center gap-3 font-bold hover:bg-gray-50 transition-all"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Login with Google
            </button>
          </form>

          {/* Navigation to Register */}
          <div className="mt-8 text-center lg:text-left">
            <p className="text-gray-600 font-medium">
              Don't have an account?{' '}
              <Link href="/register" className="text-black font-bold underline underline-offset-4 hover:text-yellow-600 transition-colors">
                Create an account
              </Link>
            </p>
          </div>

          <p className="mt-8 text-[10px] text-gray-400 text-center lg:text-left leading-tight">
            By signing up, you agree to the Terms & Conditions and Privacy Policy
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:block relative h-full min-h-[500px]">
          <img 
             src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGd5bXxlbnwwfHwwfHx8MA%3D%3DF"
            // src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop" 
            alt="Workout" 
            className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;