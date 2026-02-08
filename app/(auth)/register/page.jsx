"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { RegisterApi } from '../../../utils/fetchapi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', phoneNumber: '' });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await RegisterApi(credentials);
      if (res.data.success) {
        toast.success(res.data.message);
        router.replace("/login")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <section className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4 md:p-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-16 rounded-[3rem] shadow-sm">

        {/* Left Column: Form */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">
            Track Your Progress & More!
          </h1>
          <p className="text-gray-500 mb-8 font-medium">
            Start your fitness journey today
          </p>

          <div className="space-y-4 w-full max-w-md">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-full border border-gray-300 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="xyz@gmail.com"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-full border border-gray-300 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={credentials.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-full border border-gray-300 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-full border border-gray-300 bg-[#f9f9f9] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />

            {/* Checkbox Section */}
            <div className="flex items-start gap-3 py-2">
              <input
                type="checkbox"
                id="updates"
                className="mt-1 w-5 h-5 accent-yellow-400 rounded"
              />
              <label htmlFor="updates" className="text-xs text-gray-600 leading-tight">
                Send me email notifications for new program launches, website or store updates (optional)
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-[#fff200] hover:bg-yellow-400 text-black font-bold rounded-full transition-all active:scale-[0.98] shadow-md text-lg mt-4"
            >
              Create Account
            </button>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                Already a member? <Link href="/login" className="font-bold underline">Login</Link>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="hidden lg:block relative h-full min-h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D"
            // src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop" 
            alt="Fitness"
            className="absolute inset-0 w-full h-full object-cover rounded-[3rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;