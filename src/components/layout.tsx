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
  // No WhatsApp Chat Box states needed as it is a direct link button

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
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> +91 88818 00808
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918881800808"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer focus:outline-none"
        aria-label="Contact us on WhatsApp"
        id="whatsapp-floating-button"
      >
        <svg className="w-8 h-8 fill-current text-white animate-pulse" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </div>
  );
}
