"use client";

export default function LegacyLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      <div className="text-center">
        {/* Main Brand Title */}
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase relative">
          GOLD'S <span className="text-[#fff200] animate-pulse">GYM</span>
          <div className="text-[10px] tracking-[0.5em] font-bold text-gray-500 mt-2 block">
            /// LEGACY SERIES
          </div>
        </h1>

        {/* Barbell Style Loading Bar */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {/* Weight Plate 1 */}
          <div className="w-1 h-8 bg-gray-800 rounded-full" />
          
          {/* The Bar */}
          <div className="h-[4px] w-48 bg-neutral-900 overflow-hidden relative rounded-full border border-neutral-800">
            <div className="h-full w-1/3 bg-[#fff200] shadow-[0_0_15px_#fff200] animate-[lift_1.5s_ease-in-out_infinite]" />
          </div>

          {/* Weight Plate 2 */}
          <div className="w-1 h-8 bg-gray-800 rounded-full" />
        </div>

        {/* Motivational Status */}
        <p className="mt-8 text-[10px] uppercase font-black tracking-[0.4em] text-neutral-500 animate-pulse">
          Calibrating Performance…
        </p>
      </div>

      <style jsx>{`
        @keyframes lift {
          0% { 
            transform: translateX(-100%); 
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% { 
            transform: translateX(300%); 
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}