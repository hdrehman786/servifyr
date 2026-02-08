import { DEV_CLIENT_PAGES_MANIFEST } from "next/dist/shared/lib/constants";


const Contact = () => (
  <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold italic tracking-tighter mb-4">// Contact Us</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-sm">
          Have questions? Reach out to our team of professional trainers and we'll get back to you shortly.
        </p>
        
        <form className="space-y-4 max-w-md">
          <input 
            type="text" 
            placeholder="Enter your name..." 
            className="w-full bg-black border border-gray-800 rounded-full px-6 py-3 text-sm focus:border-[#fff200] outline-none transition"
          />
          <input 
            type="email" 
            placeholder="xyz@gmail.com" 
            className="w-full bg-black border border-gray-800 rounded-full px-6 py-3 text-sm focus:border-[#fff200] outline-none transition"
          />
          <textarea 
            placeholder="Enter your message..." 
            rows="4"
            className="w-full bg-black border border-gray-800 rounded-[2rem] px-6 py-4 text-sm focus:border-[#fff200] outline-none transition"
          ></textarea>
        </form>
      </div>

      {/* This space can be used for a map or additional branding as per your layout */}
      <div className="flex items-center justify-center">
        <div className="w-full h-full bg-[#111] rounded-[3rem] p-10 flex items-center justify-center">
           <span className="text-gray-700 font-bold uppercase tracking-widest">Find us on map</span>
        </div>
      </div>
    </div>
  </section>
);


export default Contact;