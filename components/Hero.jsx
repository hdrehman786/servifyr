import gyminterior from "../media/gyminterior.jpeg"

const Hero = () => (
  <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    <div>
      <h2 className="text-xl uppercase tracking-widest text-gray-400 mb-2">make your</h2>
      <h1 className="text-7xl font-black uppercase mb-6 leading-tight">BODY SHAPE</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        Every gym goer deserves the best possible result. Join us today and start your journey towards your fitness goal.
      </p>
      <button className="bg-[#fff200] text-black px-8 py-3 font-bold rounded-full hover:scale-105 transition">
        Get Started
      </button>
    </div>
    <div className="rounded-3xl overflow-hidden shadow-2xl">
      <img src={gyminterior.src} alt="Gym Interior" className="w-full h-full object-cover" />
    </div>
  </section>
);


export default Hero;