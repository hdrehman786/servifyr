import ProgramCard from "./ProgramCard";
import React from "react";

const ProgramSlider = ({ data }) => {
  return (
    <section className="relative mb-24">
      <div className="flex flex-col mb-8 px-2">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white">
          {data.category}
        </h2>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            {data.subtitle}
          </p>
          <button className="text-[#fff200] text-[10px] font-bold uppercase border-b-2 border-[#fff200] pb-1 hover:text-white hover:border-white transition-all">
            View Category
          </button>
        </div>
      </div>

      {/* Slider Container with Arrows */}
      <div className="relative group">
        {/* Left Arrow */}
        <button className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-black/50 border border-gray-800 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#fff200] hover:text-black">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* The Grid / Scroll Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.programs.map((program) => (
            <ProgramCard key={program.image} program={program} />
          ))}
        </div>

        {/* Right Arrow */}
        <button className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-black/50 border border-gray-800 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#fff200] hover:text-black">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ProgramSlider;