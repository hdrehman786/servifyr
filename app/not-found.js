import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-6">

            {/* Background "Ghost" Text for Visual Impact */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                <h1 className="text-[30vw] font-black italic uppercase leading-none text-white">
                    LOST
                </h1>
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center">

                {/* Visual Accent */}
                <h4 className="text-[#fff200] font-black italic tracking-[0.3em] uppercase text-sm mb-4">
                    /// Error 404
                </h4>

                {/* Main Heading */}
                <h1 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                    OUT OF <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fff200] to-yellow-600">
                        REACH
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-500 font-medium text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed">
                    The page you are looking for has been moved, deleted, or never existed. Focus on your goals and get back to the grind.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        href="/"
                        className="bg-[#fff200] text-black font-black px-10 py-4 rounded-full uppercase tracking-widest text-sm hover:bg-white hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,242,0,0.2)]"
                    >
                        Return Home
                    </Link>

                    <Link
                        href="/programs"
                        className="text-white font-bold uppercase tracking-widest text-sm border-b-2 border-gray-800 hover:border-[#fff200] pb-1 transition-all"
                    >
                        View Programs
                    </Link>
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-20">
                <div className="w-12 h-[2px] bg-white"></div>
                <span className="text-white font-bold uppercase tracking-widest text-[10px]">
                    Gold's Gym Legacy
                </span>
            </div>
        </div>
    );
}