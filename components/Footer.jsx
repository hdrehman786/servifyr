import logo from "../media/logo.png";
const Footer = () => (
  <footer className="bg-black py-16 border-t border-gray-900">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
      {/* Logo from your previous context */}
      <img 
        src={logo.src} 
        alt="Gold's Gym" 
        className="h-20 w-auto mb-8"
      />
      
      <p className="text-[10px] text-gray-500 text-center max-w-2xl leading-relaxed uppercase tracking-tighter">
        Join our fitness community and transform your life with expert guidance and world-class facilities. 
        © 2024 Gold's Gym. All rights reserved. 
        <br />
        By signing up, you agree to the Terms & Conditions and Privacy Policy.
      </p>

      {/* Social Links placeholder */}
      <div className="flex gap-6 mt-6">
        {['FB', 'IG', 'TW', 'YT'].map(social => (
          <span key={social} className="text-xs font-bold text-gray-600 hover:text-[#fff200] cursor-pointer transition">
            {social}
          </span>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;