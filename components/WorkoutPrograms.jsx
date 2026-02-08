"use client";

import { useUser } from "@/queries/userqueries";
import { useGetPrograms } from "../queries/programqueries";
import SubscriptionPlans from "./Plans";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WorkoutPrograms = () => {

  const { data, isLoading, isError } = useGetPrograms(5);
  const { data: user } = useUser();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-black">
        <div className="animate-pulse text-[#fff200] font-black uppercase tracking-widest">
          Loading Legacy Programs...
        </div>
      </div>
    );
  }

  const checkUser = () => {
    if (!user.data.subscription.isActive) {
        router.forward("/subscription")
    } else {
      console.log("Data is available");
    }
  }


  if (isError) {
    return (
      <div className="h-[200px] flex items-center justify-center text-red-500 font-bold uppercase">
        Failed to load programs. Please refresh.
      </div>
    );
  }


  const programsList = data?.programs || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-black text-white">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">
            Physical <span className="text-[#fff200]">Training Programs</span> We Offer
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
            Monthly & Half-Month Subscriptions Available
          </p>
        </div>
        <Link href={"/programs"} className="text-[10px] font-bold uppercase tracking-widest border-b border-[#fff200] pb-1 hover:text-[#fff200] transition-colors">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {programsList.length > 0 ? (
          programsList.map((p, i) => (
            <div
              key={p._id || i}
              className="relative group rounded-2xl overflow-hidden h-[450px] border border-gray-900 hover:border-[#fff200]/50 transition-all duration-500"
            >
              {/* Image from Backend */}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.6] group-hover:scale-110 transition-all duration-700"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
                {/* Vertical Title (Matching your original design) */}
                <span className="text-white font-black text-center mb-8 [writing-mode:vertical-lr] rotate-180 uppercase tracking-[0.3em] text-sm group-hover:text-[#fff200] transition-colors">
                  {p.title}
                </span>

                {/* Difficulty Badge */}
                <div className="mb-4 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-gray-400">
                  {p.difficulty}
                </div>

                <button onClick={checkUser} className="bg-transparent border border-gray-700 hover:bg-[#fff200] hover:text-black hover:border-[#fff200] text-white w-full py-3 text-[10px] font-black rounded-xl uppercase tracking-widest transition-all duration-300">
                  Start Today
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-600 uppercase text-xs tracking-[0.5em]">
            No programs found in database.
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkoutPrograms;