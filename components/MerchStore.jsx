import merch1 from "../media/merch1.jpg";
import merch2 from "../media/merch2.jpg";
import merch3 from "../media/merch3.jpg";
import merch4 from "../media/merch4.jpg";

const prd = [
  { name: 'Shirt', img: merch1 },
  { name: 'Bag', img: merch3 },
  { name: 'Bottle', img: merch2 },
  { name: 'Shirt', img: merch4 }
];

const MerchStore = () => (
  <section className="max-w-7xl mx-auto px-6 py-20 bg-black">
    {/* Header Section */}
    <div className="flex justify-between items-end mb-12 border-b border-gray-900 pb-6">
      <div>
        <h2 className="text-[#fff200] text-sm font-bold tracking-[0.3em] uppercase mb-2">Exclusive Gear</h2>
        <h3 className="text-4xl font-black italic tracking-tighter text-white">// GET OUR MERCH</h3>
      </div>
      <button className="border border-gray-700 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-full hover:bg-[#fff200] hover:text-black hover:border-[#fff200] transition-all duration-300">
        View All Products
      </button>
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {prd.map((item, i) => (
        <div key={i} className="group cursor-pointer">
          {/* Image Container / Podium */}
          <div className="relative aspect-square bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[2.5rem] p-10 flex justify-center items-center overflow-hidden border border-gray-900 group-hover:border-gray-700 transition-all duration-500">
            
            {/* Ambient Glow behind image */}
            <div className="absolute inset-0 bg-[#fff200] opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-500"></div>

            <img 
              src={item.img.src} 
              alt={item.name} 
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out" 
            />

            {/* "Quick View" Overlay shown on hover */}
            <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/20 uppercase tracking-widest">
                    Quick View
                </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-6 text-center">
            <h4 className="text-white font-black uppercase tracking-widest text-lg group-hover:text-[#fff200] transition-colors">
                {item.name}
            </h4>
            <p className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-tighter">Premium Collection</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default MerchStore;