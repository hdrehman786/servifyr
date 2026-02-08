
const AboutUs = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col space-y-8">
          <div>
            <h4 className="text-[#fff200] font-black italic tracking-widest text-lg mb-4">
              /// About Us
            </h4>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight tracking-tighter">
              Our Legacy, <br />
              <span className="text-white">Your Strength</span>
            </h2>
          </div>

          <div className="space-y-6 text-gray-400 font-medium leading-relaxed max-w-xl text-lg">
            <p>
              For over 50 years, Gold's Gym has been the authority in bodybuilding. 
              Starting in Venice, California in 1965, we have grown into a global 
              sanctuary for those dedicated to pushing their limits and transforming 
              their lives.
            </p>
            <p>
              We are more than a gym—we are a community. Our sanctuary is where 
              dedication meets results. We provide the tools, the atmosphere, 
              and the expertise to help you build your best self and master 
              your fitness journey.
            </p>
          </div>

          <div>
            <button className="bg-[#fff200] text-black font-black px-10 py-4 rounded-full uppercase tracking-widest hover:bg-yellow-400 transition-all active:scale-95 shadow-[0_10px_20px_rgba(255,242,0,0.2)]">
              Join The Movement
            </button>
          </div>
        </div>

        {/* Right Side: Stacked Images */}
        <div className="relative flex flex-col space-y-6">
          {/* Top Image - Gray Border */}
          <div className="rounded-[3rem] overflow-hidden border-8 border-[#1a1a1a] shadow-2xl transform lg:-translate-x-6">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
              alt="Gym Interior" 
              className="w-full h-72 object-cover"
            />
          </div>

          {/* Bottom Image - Yellow Border */}
          <div className="rounded-[3rem] overflow-hidden border-8 border-[#fff200] shadow-2xl transform lg:translate-x-6">
            <img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop" 
              alt="Heavy Lifting Area" 
              className="w-full h-72 object-cover"
            />
          </div>

          {/* Background Decorative Element */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#fff200] opacity-5 blur-[100px]"></div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;