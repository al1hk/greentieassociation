"use client"
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Heart, 
  Calendar, 
  MapPin, 
  Mail, 
  Instagram, 
  Facebook, 
  ArrowRight, 
  CreditCard,
  Award,
  Users
} from 'lucide-react';
import { Sponsor, NavItem, EventDetails } from './types';

// --- Constants & Data ---

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Our Sponsors', href: '#sponsors' },
  { label: 'Contact', href: '#contact' },
];

const EVENTS: EventDetails[] = [
  {
    title: "2025 Green Tie Gala",
    date: "March 21, 2025",
    location: "The Ritz-Carlton, Grand Cayman",
    description: "The 5th Annual Green Tie Gala was held to support Autism Acceptance and Fair Weather Foundation. A night of elegance, charity, and community spirit.",
    imageUrl: "https://images.unsplash.com/photo-1510924199351-4e9d94df18a6?auto=format&fit=crop&q=80&w=1200" ,
    galleryUrl:"https://dejavuphotosbymaggiejackson.pixieset.com/guestlogin/5thannualgreentiegala/?return=%2F5thannualgreentiegala%2F"
  },
  {
    title: "2024 Green Tie Gala",
    date: "March 22, 2024",
    location: "Grand Cayman", 
    description: "The 2024 Green Tie Gala raised a record US$225,000 for our two charity partners, Cayman Islands Cancer Society and Beacon Farms.",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200",
    galleryUrl:"https://dejavuphotosbymaggiejackson.pixieset.com/fourthannualgreentiegala/"
  },
  {
    title: "2023 Green Tie Gala",
    date: "March 24, 2023",
    location: "Grand Cayman",
    description: "Our 3rd annual Green Tie Gala was another incredible success, supporting Big Brothers Big Sisters of the Cayman Islands and LOUD Silent Voices.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    galleryUrl:"https://janetjarchowphotography.pic-time.com/-greentiegala2023/gallery"
  }
];

const SPONSORS: Sponsor[] = [
  { id: '1', name: 'Grant Thornton', tier: 'TITLE', logoUrl:"https://static.wixstatic.com/media/f33457_ec7d596da8bf46879d4a0f8595590b73~mv2.png/v1/fill/w_792,h_440,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT%20Logo.png" },
  { id: '2', name: 'Wheaton Precious Metals', tier: 'GOLD', logoUrl:"https://static.wixstatic.com/media/f33457_931d83064c2546f8840432e533a42926~mv2.png/v1/fill/w_600,h_279,al_c,lg_1,q_85,enc_avif,quality_auto/Untitled%20design%20(7).png" },
  { id: '3', name: 'Knighthead Annuity', tier: 'SILVER',logoUrl:"https://static.wixstatic.com/media/f33457_a8377dc5438c454d8aca133b21131d3d~mv2.jpg/v1/fill/w_940,h_290,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Knighthead%20Logo.jpg" },
  { id: '4', name: 'North End Re', tier: 'SILVER', logoUrl:"https://static.wixstatic.com/media/f33457_9dc12f64bf694064b89969a89bb6432d~mv2.png/v1/fill/w_940,h_204,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/NorthEndRE_.png" },
  { id: '5', name: 'Dillon Eustace', tier: 'SILVER', logoUrl:"https://static.wixstatic.com/media/f33457_8103d18f5a494c759a42e4e593cf1797~mv2.png/v1/fill/w_600,h_310,al_c,lg_1,q_85,enc_avif,quality_auto/Untitled%20design%20(2).png" },
  { id: '6', name: 'Smart Insurance', tier: 'BRONZE',logoUrl:"https://static.wixstatic.com/media/f33457_5f575006ee724ec1b13e8b3d9f95df2b~mv2.png/v1/fill/w_460,h_124,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Saxon%20Logo.png" },
  { id: '7', name: 'Fortcay Family Office', tier: 'BRONZE',logoUrl:"https://static.wixstatic.com/media/f33457_b09bd924349e4a92a98175047b6381a2~mv2.jpg/v1/fill/w_600,h_143,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/FortCay%20Logo_edited.jpg" },
  { id: '8', name: 'Invenio Global Search', tier: 'BRONZE',logoUrl:"https://static.wixstatic.com/media/f33457_86faf1bf233f4505bfefa5764dda1e7a~mv2.png/v1/fill/w_460,h_114,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/INVENIO.png" },
  { id: '9', name: 'Nelsons', tier: 'BRONZE',logoUrl:"https://static.wixstatic.com/media/f33457_7b324f00f9aa409584ac786d19175863~mv2.png/v1/fill/w_460,h_70,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Nelsons%20Logo.png" },
];

// --- Helper Functions ---

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Components ---

const SectionTitle: React.FC<{ title: string; subtitle?: string; color?: 'dark' | 'light' }> = ({ title, subtitle, color = 'dark' }) => (
  <div className="text-center mb-16 relative px-4">
    <h2 className={`text-3xl md:text-5xl font-bold uppercase tracking-wider mb-6 ${color === 'light' ? 'text-white' : 'text-slate-800'}`}>
      {title}
    </h2>
    <div className={`h-1.5 w-24 mx-auto rounded-full mb-8 ${color === 'light' ? 'bg-emerald-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`}></div>
    {subtitle && (
      <p className={`max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed ${color === 'light' ? 'text-emerald-50' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'white'; 
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all duration-500 tracking-wide text-sm md:text-base";
  
  const variants = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer",
    outline: "border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700 cursor-pointer",
    white: "bg-white text-emerald-900 hover:bg-emerald-50 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SponsorDisplay: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  const { tier, logoUrl, name } = sponsor;
  
  // Base classes for the card container
  let containerClass = "relative flex items-center justify-center rounded-2xl transition-all duration-500 w-full bg-white overflow-hidden group border";
  let imageClass = "object-contain transition-all duration-500 filter";

  // Tier specific styling
  switch (tier) {
    case 'TITLE':
      containerClass += " h-56 md:h-72 border-emerald-100 hover:border-emerald-300 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.2)]";
      imageClass += " max-h-[75%] max-w-[80%] opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-110";
      break;
    case 'GOLD':
      containerClass += " h-48 md:h-60 border-amber-100 hover:border-amber-300 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.2)]";
      imageClass += " max-h-[70%] max-w-[75%] opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-110";
      break;
    case 'SILVER':
      containerClass += " h-36 md:h-44 border-slate-100 hover:border-slate-300 hover:shadow-lg";
      imageClass += " max-h-[60%] max-w-[70%] opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-110";
      break;
    case 'BRONZE':
      containerClass += " h-28 md:h-36 border-orange-50 hover:border-orange-200 hover:shadow-md";
      imageClass += " max-h-[55%] max-w-[65%] opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-110";
      break;
  }

  return (
    <div className={containerClass}>
      {/* Decorative subtle background for higher tiers */}
      {(tier === 'TITLE' || tier === 'GOLD') && (
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr ${tier === 'TITLE' ? 'from-emerald-50/50 via-transparent to-transparent' : 'from-amber-50/50 via-transparent to-transparent'}`}></div>
      )}
      
      {logoUrl ? (
        <img src={logoUrl} alt={`${name} logo`} className={imageClass} />
      ) : (
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{name}</span>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothScroll(e, href);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Area */}
        <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center gap-3 group cursor-pointer">
          <div className={`p-2.5 rounded-xl transition-colors duration-300 ${scrolled ? 'bg-emerald-700 text-white' : 'bg-white/90 text-emerald-800'}`}>
             <Award size={26} />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold uppercase tracking-wide leading-none ${scrolled ? 'text-slate-800' : 'text-white'}`}>
              Green Tie
            </span>
            <span className={`text-xs font-bold uppercase tracking-[0.2em] leading-none ${scrolled ? 'text-emerald-600' : 'text-emerald-200'}`}>
              Charitable
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className={`text-sm font-bold uppercase tracking-widest hover:text-emerald-400 transition-colors duration-300 relative group cursor-pointer ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={scrolled ? "text-slate-800" : "text-white"} /> : <Menu className={scrolled ? 'text-slate-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-2xl md:hidden flex flex-col p-6 gap-4 animate-fade-in border-t border-slate-100 max-h-[85vh] overflow-y-auto">
           {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => onMobileNavClick(e, item.href)}
              className="text-slate-600 font-bold uppercase tracking-wider p-3 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- Main App ---

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <img 
              src="https://wgl-dsites.net/bighearts/wp-content/uploads/2020/10/home-1_slider-1_2.jpg" 
              alt="Charity Gala Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-emerald-950/60 to-slate-900/40 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white pt-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-900/30 backdrop-blur-md">
            <span className="text-emerald-300 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              Established 2020 • Cayman Islands
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight drop-shadow-lg">
            Supporting the Community <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              We Call Home
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            Join us in making a difference. The Green Tie Charitable Association is dedicated to supporting local causes through elegant events and community partnership.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button variant="primary" onClick={() => document.getElementById('events')?.scrollIntoView({behavior: 'smooth'})}>
              View Latest Events
            </Button>
            <Button variant="white" onClick={() => document.getElementById('donate')?.scrollIntoView({behavior: 'smooth'})}>
              Become a Sponsor
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ArrowRight className="rotate-90" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl transform md:rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://wgl-dsites.net/bighearts/wp-content/uploads/2020/08/home-1_01-1.png" 
                  alt="Community Support" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-emerald-900/10 hover:bg-transparent transition-colors duration-500"></div>
             </div>
             {/* Decorative blob */}
             <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>
             <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="h-0.5 w-8 bg-emerald-500"></div>
               <span className="text-emerald-700 font-bold uppercase tracking-widest text-sm">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight">
              Dedicated to <br/><span className="text-emerald-700">Sustainable Impact</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p>
                The Green Tie Charitable Association was founded with a singular mission: to unite leaders, businesses, and individuals in the Cayman Islands to foster meaningful change.
              </p>
              <p>
                Through our annual Gala and various community initiatives, we raise vital funds for local non-profits, focusing on healthcare, education, and social welfare.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-10">
               <div className="p-6 bg-white rounded-2xl hover:bg-emerald-50 transition-colors duration-300 border border-slate-100 hover:border-emerald-200">
                  <div className="text-4xl font-bold text-emerald-700 mb-2">5+</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Years Active</div>
               </div>
               <div className="p-6 bg-white rounded-2xl hover:bg-blue-50 transition-colors duration-300 border border-slate-100 hover:border-blue-200">
                  <div className="text-4xl font-bold text-blue-700 mb-2">$500k+</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Raised</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 md:py-32 bg-slate-50 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Our Events" 
            subtitle="Celebrating our community achievements and the generous spirits that make them possible."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {EVENTS.map((event, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                     <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-widest mb-2 bg-black/20 backdrop-blur-sm inline-block px-2 py-1 rounded">
                        <Calendar size={12} /> {event.date}
                     </div>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors">{event.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {event.description}
                  </p>
                  <div className="pt-6 border-t border-slate-100 mt-auto">
                    {event.galleryUrl ? (
                      <span className="text-emerald-700/50 font-bold text-sm uppercase tracking-wider flex items-center gap-2 cursor-default group/link">
                        View Gallery <ArrowRight size={16} className="text-emerald-400/50" />
                      </span>
                    ) : (
                      <span className="text-slate-300 text-sm italic">Gallery coming soon</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-slate-400 uppercase tracking-widest text-sm font-medium">Stay tuned for upcoming events in 2026</p>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle 
            title="Our Generous Sponsors" 
            subtitle="Gratefully acknowledging the partners who make our work possible."
          />

          <div className="space-y-20 max-w-6xl mx-auto">
            
            {/* Title Sponsor */}
            {SPONSORS.filter(s => s.tier === 'TITLE').length > 0 && (
              <div className="text-center">
                 <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-12 bg-emerald-200"></div>
                    <h3 className="text-emerald-900 font-bold uppercase tracking-[0.2em] text-sm">Title Sponsor</h3>
                    <div className="h-px w-12 bg-emerald-200"></div>
                 </div>
                 <p className="max-w-3xl mx-auto text-slate-500 mb-10 leading-relaxed italic">
                   "The Green Tie Charitable Association is grateful for the commitment and support that <span className="font-semibold text-emerald-800 not-italic">Grant Thornton Cayman Islands</span> has shown to the Green Tie Gala since our inaugural event."
                 </p>
                 <div className="max-w-2xl mx-auto px-4">
                   {SPONSORS.filter(s => s.tier === 'TITLE').map(s => (
                      <SponsorDisplay key={s.id} sponsor={s} />
                   ))}
                 </div>
              </div>
            )}

            {/* Gold Sponsor */}
            {SPONSORS.filter(s => s.tier === 'GOLD').length > 0 && (
              <div className="text-center">
                 <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-12 bg-amber-200"></div>
                    <h3 className="text-amber-700 font-bold uppercase tracking-[0.2em] text-sm">Gold Sponsor</h3>
                    <div className="h-px w-12 bg-amber-200"></div>
                 </div>
                 <p className="max-w-3xl mx-auto text-slate-500 mb-10 leading-relaxed italic">
                   "<span className="font-semibold text-amber-700 not-italic">Wheaton Precious Metals</span> has been an incredible partner to the Green Tie Charitable Association and we thank them for their generous support at the 2025 Green Tie Gala."
                 </p>
                 <div className="max-w-lg mx-auto px-4">
                   {SPONSORS.filter(s => s.tier === 'GOLD').map(s => (
                      <SponsorDisplay key={s.id} sponsor={s} />
                   ))}
                 </div>
              </div>
            )}

            {/* Silver & Bronze Intro Text */}
            <div className="text-center max-w-2xl mx-auto pt-8">
              <p className="text-slate-700 text-lg leading-relaxed">
                The association would like to thank each of our <span className="font-bold text-slate-700">Silver</span> and <span className="font-bold text-orange-700">Bronze</span> Sponsors for the 2025 Green Tie Gala.
              </p>
            </div>

            {/* Silver Sponsors */}
            {SPONSORS.filter(s => s.tier === 'SILVER').length > 0 && (
              <div className="text-center">
                <h3 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs mb-8">Silver Sponsors</h3>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center px-4">
                  {SPONSORS.filter(s => s.tier === 'SILVER').map(s => (
                      <SponsorDisplay key={s.id} sponsor={s} />
                  ))}
                </div>
              </div>
            )}

            {/* Bronze Sponsors */}
            {SPONSORS.filter(s => s.tier === 'BRONZE').length > 0 && (
              <div className="text-center">
                <h3 className="text-orange-800/60 font-bold uppercase tracking-[0.2em] text-xs mb-8">Bronze Sponsors</h3>
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 items-center px-4">
                  {SPONSORS.filter(s => s.tier === 'BRONZE').map(s => (
                      <SponsorDisplay key={s.id} sponsor={s} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Payment / Donation Info - MODIFIED */}
      <section id="donate" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-900/50 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-emerald-900/50 rounded-2xl mb-8 border border-emerald-800/50 shadow-lg">
              <Heart className="text-emerald-400 w-10 h-10 fill-emerald-400/20 mx-auto" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Support Our Cause</h2>
            
            <p className="text-emerald-100/80 text-lg md:text-xl mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Your direct contributions help us plan better events and donate more to the charities that need it most. Every contribution makes a tangible difference in our community.
            </p>

            {/* Replacement Content */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
              {/* Option 1: Sponsorship */}
              <div className="bg-emerald-900/30 backdrop-blur-md border border-emerald-800/50 p-8 rounded-2xl hover:bg-emerald-800/30 transition-all duration-300 group shadow-lg">
                  <div className="w-12 h-12 bg-emerald-800/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-700/30">
                      <Award className="text-emerald-300 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Become a Sponsor</h3>
                  <p className="text-emerald-200/70 text-sm mb-6 leading-relaxed">
                      Partner with us for our next gala. Gain visibility while supporting vital local causes.
                  </p>
                  <button type="button" className="inline-flex items-center text-emerald-300 font-semibold text-sm uppercase tracking-wider hover:text-white transition-colors group-hover:translate-x-1 cursor-default">
                      Inquire Now <ArrowRight size={16} className="ml-2" />
                  </button>
              </div>

              {/* Option 2: Direct Donation */}
              <div className="bg-emerald-900/30 backdrop-blur-md border border-emerald-800/50 p-8 rounded-2xl hover:bg-emerald-800/30 transition-all duration-300 group shadow-lg">
                   <div className="w-12 h-12 bg-emerald-800/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-700/30">
                      <Users className="text-emerald-300 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Make a Donation</h3>
                  <p className="text-emerald-200/70 text-sm mb-6 leading-relaxed">
                      Contact us directly for wire transfer details or to purchase tickets for upcoming events.
                  </p>
                  <button type="button" className="inline-flex items-center text-emerald-300 font-semibold text-sm uppercase tracking-wider hover:text-white transition-colors group-hover:translate-x-1 cursor-default">
                      Contact Us <ArrowRight size={16} className="ml-2" />
                  </button>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <div className="p-1 bg-emerald-600 rounded">
                    <Award size={20} className="text-white" />
                 </div>
                 <h3 className="text-white text-lg font-bold uppercase tracking-wider">Green Tie Charitable</h3>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                Dedicated to supporting local causes through elegant events and community partnership in the Cayman Islands.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 group transition-colors cursor-default">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                     <Mail size={18} />
                   </div>
                   <span className="text-slate-300 group-hover:text-white transition-colors text-sm">greentiegalacayman@gmail.com</span>
                 </div>
                 <div className="flex items-center gap-4 group">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500">
                     <MapPin size={18} />
                   </div>
                   <span className="text-slate-300 text-sm">Grand Cayman, Cayman Islands</span>
                 </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:pl-10">
              <h3 className="text-white text-lg font-bold uppercase tracking-wider mb-8">Navigation</h3>
              <ul className="space-y-4">
                {NAV_ITEMS.map(item => (
                  <li key={item.label}>
                    <a 
                      href={item.href} 
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <ArrowRight size={14} className="text-emerald-700" /> {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social / Newsletter */}
            <div>
              <h3 className="text-white text-lg font-bold uppercase tracking-wider mb-8">Connect</h3>
              <p className="text-slate-400 mb-8 text-sm">
                Follow us on social media for the latest updates, event photos, and community news.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center cursor-default">
                  <Instagram size={22} />
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center cursor-default">
                  <Facebook size={22} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
             {/* Left Side: Copyright */}
             <p className="text-xs text-slate-600 order-3 md:order-1 text-center md:text-left">
               &copy; {new Date().getFullYear()} Green Tie Gala. All rights reserved.
             </p>

             {/* Center: Designing Dose */}
             <div className="flex flex-col items-center order-1 md:order-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Website Created and Powered by
                </span>
                <a 
                  href="https://designingdose.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-['Playfair_Display'] text-base md:text-lg text-emerald-200/80 hover:text-emerald-400 transition-colors tracking-wide"
                >
                  Designing Dose
                </a>
             </div>

             {/* Right Side: Community Text */}
             <div className="flex items-center gap-1 text-xs text-slate-600 order-2 md:order-3">
                Proudly serving the <span className="text-emerald-500">Cayman Islands</span> community
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}