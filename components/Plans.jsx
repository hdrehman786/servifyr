"use client";

const pricingPlans = [
  {
    name: "Half-Month Pass",
    duration: "15 Days",
    price: "2500",
    features: ["Gym Floor Access", "Basic Support", "Locker Room", "1 Program Enrollment"],
    accent: "gray-500"
  },
  {
    name: "Full-Month Legacy",
    duration: "30 Days",
    price: "4500",
    features: ["24/7 Access", "All Programs", "Free Sauna", "Personal Trainer Consult", "Nutrient Plan"],
    accent: "[#fff200]",
    popular: true
  }
];



export default function SubscriptionPlans() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">
          CHOOSE YOUR <span className="text-[#fff200]">MEMBERSHIP</span>
        </h2>
        <p className="text-gray-500 mt-4 uppercase tracking-[0.3em] text-xs">No long-term contracts. Just results.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pricingPlans.map((plan, i) => (
          <div key={i} className={`relative border ${plan.popular ? 'border-[#fff200]' : 'border-gray-900'} bg-[#0a0a0a] p-10 rounded-3xl flex flex-col`}>
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fff200] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase italic">
                Most Popular
              </span>
            )}
            
            <h3 className="text-2xl font-black uppercase text-white italic">{plan.name}</h3>
            <div className="my-6">
              <span className="text-5xl font-black text-white">RS {plan.price}</span>
              <span className="text-gray-500 uppercase text-xs tracking-widest ml-2">/ {plan.duration}</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-center text-gray-400 text-sm uppercase font-bold tracking-tight">
                  <span className="text-[#fff200] mr-3">✓</span> {feat}
                </li>
              ))}
            </ul>

            <button className={`${plan.popular ? 'bg-[#fff200] text-black' : 'bg-white text-black'} py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform`}>
              Get Started Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}