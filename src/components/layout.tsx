import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import altusLogoDark from "@/assets/altus-logo-dark.png";
import altusLogoLight from "@/assets/altus-logo-light.png";
import { ChevronDown, ChevronUp, ChevronRight, Instagram, Youtube, Linkedin, Facebook, Twitter, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={altusLogoDark} alt="Altus Influence Logo" className="h-8 w-8 object-contain" />
            <span className="font-serif text-2xl tracking-tight text-primary">Altus Influence</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            <Link href="/" className={location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>Our Work</Link>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground hover:text-primary transition-colors uppercase cursor-pointer outline-none flex items-center gap-1">
                Services <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none bg-card border-border p-4 w-64 shadow-xl">
                <DropdownMenuLabel className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1 p-0">YouTube</DropdownMenuLabel>
                <DropdownMenuItem className="p-0 mb-2 focus:bg-transparent rounded-none">
                  <Link href="/influencers?platform=YouTube" className="text-sm font-medium hover:text-primary transition-colors py-1 block w-full normal-case">Hire YouTubers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-4 focus:bg-transparent rounded-none">
                  <Link href="/start-campaign?platform=YouTube&service=Production" className="text-sm font-medium hover:text-primary transition-colors py-1 block w-full normal-case">Youtube Video Production</Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-2 bg-border" />
                
                <DropdownMenuLabel className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1 mt-2 p-0">Instagram</DropdownMenuLabel>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers?platform=Instagram" className="text-sm font-medium hover:text-primary transition-colors py-0.5 block w-full normal-case">Hire Instagrammers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers" className="text-sm font-medium hover:text-primary transition-colors py-0.5 block w-full normal-case">Hire Influencers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers?tier=Micro" className="text-sm font-medium hover:text-primary transition-colors py-0.5 block w-full normal-case">Hire Micro Influencers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers?tier=Nano" className="text-sm font-medium hover:text-primary transition-colors py-0.5 block w-full normal-case">Hire Nano Influencers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers?language=Hindi" className="text-sm font-medium hover:text-primary transition-colors py-0.5 block w-full normal-case">Hire Regional Influencers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 focus:bg-transparent rounded-none">
                  <Link href="/influencers?tier=Mega" className="text-sm font-medium hover:text-primary transition-colors py-0.5 block w-full normal-case">Hire Celebrity Influencers</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/influencers" className={location.startsWith("/influencers") ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>Creators</Link>
            <Link href="/join-as-influencer" className={location === "/join-as-influencer" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>Barter</Link>
            <Link href="/about" className={location === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>About</Link>
          </nav>

          {/* Hamburger button for mobile devices */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-foreground focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>

        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/98 backdrop-blur-md pt-20 px-6 flex flex-col gap-6 text-lg font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-top duration-200 overflow-y-auto">
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="absolute top-6 right-6 p-2 text-foreground cursor-pointer"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
          
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className={location === "/" ? "text-primary" : "text-foreground"}>Our Work</Link>
          
          {/* Collapsible Mobile Services */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between text-muted-foreground text-[10px] uppercase tracking-widest font-bold w-full cursor-pointer py-1 text-left focus:outline-none"
            >
              <span>Services</span>
              {mobileServicesOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 flex flex-col gap-3 font-normal normal-case text-base text-muted-foreground mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <Link href="/influencers?platform=YouTube" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Hire YouTubers</Link>
                <Link href="/start-campaign?platform=YouTube&service=Production" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">YouTube Video Production</Link>
                <Link href="/influencers?platform=Instagram" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Hire Instagrammers</Link>
                <Link href="/influencers" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Hire Influencers</Link>
                <Link href="/influencers?tier=Micro" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Hire Micro Influencers</Link>
                <Link href="/influencers?tier=Nano" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Hire Nano Creators</Link>
                <Link href="/influencers?language=Hindi" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Hire Regional Influencers</Link>
                <Link href="/influencers?tier=Mega" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Hire Celebrity Influencers</Link>
              </div>
            )}
          </div>
          
          <Link href="/influencers" onClick={() => setMobileMenuOpen(false)} className={location.startsWith("/influencers") ? "text-primary" : "text-foreground"}>Creators</Link>
          <Link href="/join-as-influencer" onClick={() => setMobileMenuOpen(false)} className={location === "/join-as-influencer" ? "text-primary" : "text-foreground"}>Barter</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={location === "/about" ? "text-primary" : "text-foreground"}>About</Link>
        </div>
      )}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="border-t border-border/10 bg-[#111827] text-white pt-16 pb-0">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Column 1: Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <img src={altusLogoLight} alt="Altus Influence Logo" className="h-8 w-8 object-contain" />
              <span className="font-serif text-2xl text-white font-semibold tracking-tight">Altus Influence</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              India's premier influencer brokerage and campaign matching platform. We help high-growth companies execute ASCI-compliant regional and national creator campaigns.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Services */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-medium border-b border-white/10 pb-2 text-white">Platform Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/influencers?platform=YouTube" className="hover:text-white transition-colors">Hire YouTubers</Link></li>
              <li><Link href="/start-campaign?platform=YouTube&service=Production" className="hover:text-white transition-colors">YouTube Video Production</Link></li>
              <li><Link href="/influencers?platform=Instagram" className="hover:text-white transition-colors">Hire Instagrammers</Link></li>
              <li><Link href="/influencers?tier=Micro" className="hover:text-white transition-colors">Hire Micro Influencers</Link></li>
              <li><Link href="/influencers?tier=Nano" className="hover:text-white transition-colors">Hire Nano & Celebrity Creators</Link></li>
            </ul>
          </div>

          {/* Column 3: Niche Categories */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-medium border-b border-white/10 pb-2 text-white">Top Niches</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/influencers?category=Tech" className="hover:text-white transition-colors">Tech & Gadget Creators</Link></li>
              <li><Link href="/influencers?category=Finance" className="hover:text-white transition-colors">Finance & Stock Influencers</Link></li>
              <li><Link href="/influencers?category=Fashion" className="hover:text-white transition-colors">Fashion & Beauty Influencers</Link></li>
              <li><Link href="/influencers?category=Lifestyle" className="hover:text-white transition-colors">Lifestyle & Travel Creators</Link></li>
              <li><Link href="/influencers?category=Business" className="hover:text-white transition-colors">Startup & Business Advisors</Link></li>
            </ul>
          </div>

          {/* Column 4: Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-medium border-b border-white/10 pb-2 text-white">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/start-campaign" className="hover:text-white transition-colors">Start Campaign</Link></li>
              <li><Link href="/join-as-influencer" className="hover:text-white transition-colors">Join as Creator</Link></li>
              <li><Link href="/asci-guidelines" className="hover:text-white transition-colors">ASCI Guidelines</Link></li>
            </ul>
          </div>
        </div>

        {/* Contacts, Offices & Copyright bottom block matching influglue #0D121D */}
        <div className="bg-[#0D121D] py-12 border-t border-white/5 mt-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-gray-400">
            {/* Hubs */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary block">Operations Hubs</span>
              <div className="space-y-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Mumbai Studio (BKC)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Bangalore Tech Hub (MG Road)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Delhi NCR Office
                </span>
              </div>
            </div>

            {/* Contacts */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary block">Contact Channels</span>
              <div className="space-y-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> support@influencebridge.com
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> +91 98765 43210
                </span>
              </div>
            </div>

            {/* Copyright block */}
            <div className="flex flex-col justify-end md:items-end">
              <p className="text-gray-500 text-[11px] leading-relaxed md:text-right">
                &copy; {new Date().getFullYear()} Oravate Technologies. All rights reserved.
                <span className="block mt-1 font-serif text-[12px] text-gray-400 italic">
                  Altus Influence is a product of Oravate Technologies.
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Option */}
      <a
        href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20Altus%20Influence%20services.%20Let's%20discuss."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group cursor-pointer"
        aria-label="WhatsApp Us"
      >
        {/* Glow / Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-pulse scale-110 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Text Label Pill (Appears on hover) */}
        <span className="bg-[#111827] text-white text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-full border border-white/10 shadow-lg translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
          WhatsApp Us
        </span>
        
        {/* WhatsApp Icon Circle */}
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.067 5.248 5.313 0 11.783 0c3.137.001 6.086 1.222 8.31 3.448 2.224 2.226 3.455 5.171 3.453 8.31-.005 6.472-5.251 11.72-11.72 11.72-2.003-.001-3.972-.515-5.717-1.498L0 24zM6.48 5.621c-.244-.544-.502-.556-.733-.565-.19-.008-.407-.008-.624-.008-.217 0-.57.081-.869.408-.299.327-1.14 1.115-1.14 2.72 0 1.605 1.168 3.155 1.331 3.372.163.217 2.298 3.51 5.566 4.921 2.72 1.176 3.274.942 3.872.886.598-.056 1.928-.788 2.2-.1.508c.272-.734.272-1.36.19-1.498-.081-.137-.299-.218-.624-.38-.327-.163-1.928-.952-2.227-1.06-.299-.11-.517-.163-.733.163-.217.327-.842 1.06-1.032 1.277-.19.218-.38.245-.707.081-.327-.163-1.38-.508-2.63-1.624-1.05-.935-1.758-2.088-1.963-2.441-.205-.353-.022-.544.152-.716.157-.154.327-.38.49-.571.163-.19.217-.327.327-.544.11-.218.056-.408-.022-.571-.078-.163-.733-1.766-.991-2.39z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
