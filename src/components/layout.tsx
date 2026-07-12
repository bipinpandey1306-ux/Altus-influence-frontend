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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background Ambient Glow Orbs - ThiranX Inspired */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-600/8 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] left-[-15%] w-[550px] h-[550px] rounded-full bg-[#7f00ff]/6 blur-[120px] animate-pulse-glow-slow" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-md relative">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={altusLogoLight} alt="Altus Influence Logo" className="h-8 w-8 object-contain" />
            <span className="font-serif text-2xl tracking-tight text-white font-semibold">Altus Influence</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            <Link href="/" className={location === "/" ? "text-accent" : "text-muted-foreground hover:text-accent transition-colors"}>Our Work</Link>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground hover:text-accent transition-colors uppercase cursor-pointer outline-none flex items-center gap-1">
                Services <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-md bg-popover border border-border p-4 w-64 shadow-2xl relative z-50">
                <DropdownMenuLabel className="text-[10px] text-accent uppercase font-bold tracking-widest mb-1 p-0">YouTube</DropdownMenuLabel>
                <DropdownMenuItem className="p-0 mb-2 focus:bg-transparent rounded-none">
                  <Link href="/influencers?platform=YouTube" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-1 block w-full normal-case">Hire YouTubers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-4 focus:bg-transparent rounded-none">
                  <Link href="/start-campaign?platform=YouTube&service=Production" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-1 block w-full normal-case">Youtube Video Production</Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-2 bg-border/40" />
                
                <DropdownMenuLabel className="text-[10px] text-accent uppercase font-bold tracking-widest mb-1 mt-2 p-0">Instagram</DropdownMenuLabel>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers?platform=Instagram" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-0.5 block w-full normal-case">Hire Instagrammers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-0.5 block w-full normal-case">Hire Influencers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers?tier=Micro" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-0.5 block w-full normal-case">Hire Micro Influencers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers?tier=Nano" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-0.5 block w-full normal-case">Hire Nano Influencers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 mb-1 focus:bg-transparent rounded-none">
                  <Link href="/influencers?language=Hindi" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-0.5 block w-full normal-case">Hire Regional Influencers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 focus:bg-transparent rounded-none">
                  <Link href="/influencers?tier=Mega" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-0.5 block w-full normal-case">Hire Celebrity Influencers</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/influencers" className={location.startsWith("/influencers") ? "text-accent" : "text-muted-foreground hover:text-accent transition-colors"}>Creators</Link>
            <Link href="/join-as-influencer" className={location === "/join-as-influencer" ? "text-accent" : "text-muted-foreground hover:text-accent transition-colors"}>Barter</Link>
            <Link href="/about" className={location === "/about" ? "text-accent" : "text-muted-foreground hover:text-accent transition-colors"}>About</Link>
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
          
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className={location === "/" ? "text-accent" : "text-foreground"}>Our Work</Link>
          
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
                <Link href="/influencers?platform=YouTube" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Hire YouTubers</Link>
                <Link href="/start-campaign?platform=YouTube&service=Production" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">YouTube Video Production</Link>
                <Link href="/influencers?platform=Instagram" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Hire Instagrammers</Link>
                <Link href="/influencers" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Hire Influencers</Link>
                <Link href="/influencers?tier=Micro" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Hire Micro Influencers</Link>
                <Link href="/influencers?tier=Nano" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Hire Nano Creators</Link>
                <Link href="/influencers?language=Hindi" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Hire Regional Influencers</Link>
                <Link href="/influencers?tier=Mega" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Hire Celebrity Influencers</Link>
              </div>
            )}
          </div>
          
          <Link href="/influencers" onClick={() => setMobileMenuOpen(false)} className={location.startsWith("/influencers") ? "text-accent" : "text-foreground"}>Creators</Link>
          <Link href="/join-as-influencer" onClick={() => setMobileMenuOpen(false)} className={location === "/join-as-influencer" ? "text-accent" : "text-foreground"}>Barter</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={location === "/about" ? "text-accent" : "text-foreground"}>About</Link>
        </div>
      )}
      <main className="flex-1 flex flex-col relative z-10">
        {children}
      </main>
      <footer className="border-t border-border/20 bg-[#04000a] text-white pt-16 pb-0 relative z-10">
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Services */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-medium border-b border-white/10 pb-2 text-white">Platform Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/influencers?platform=YouTube" className="hover:text-accent transition-colors">Hire YouTubers</Link></li>
              <li><Link href="/start-campaign?platform=YouTube&service=Production" className="hover:text-accent transition-colors">YouTube Video Production</Link></li>
              <li><Link href="/influencers?platform=Instagram" className="hover:text-accent transition-colors">Hire Instagrammers</Link></li>
              <li><Link href="/influencers?tier=Micro" className="hover:text-accent transition-colors">Hire Micro Influencers</Link></li>
              <li><Link href="/influencers?tier=Nano" className="hover:text-accent transition-colors">Hire Nano & Celebrity Creators</Link></li>
            </ul>
          </div>

          {/* Column 3: Niche Categories */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-medium border-b border-white/10 pb-2 text-white">Top Niches</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/influencers?category=Tech" className="hover:text-accent transition-colors">Tech & Gadget Creators</Link></li>
              <li><Link href="/influencers?category=Finance" className="hover:text-accent transition-colors">Finance & Stock Influencers</Link></li>
              <li><Link href="/influencers?category=Fashion" className="hover:text-accent transition-colors">Fashion & Beauty Influencers</Link></li>
              <li><Link href="/influencers?category=Lifestyle" className="hover:text-accent transition-colors">Lifestyle & Travel Creators</Link></li>
              <li><Link href="/influencers?category=Business" className="hover:text-accent transition-colors">Startup & Business Advisors</Link></li>
            </ul>
          </div>

          {/* Column 4: Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-medium border-b border-white/10 pb-2 text-white">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/start-campaign" className="hover:text-accent transition-colors">Start Campaign</Link></li>
              <li><Link href="/join-as-influencer" className="hover:text-accent transition-colors">Join as Creator</Link></li>
              <li><Link href="/asci-guidelines" className="hover:text-accent transition-colors">ASCI Guidelines</Link></li>
            </ul>
          </div>
        </div>

        {/* Contacts & Copyright bottom block */}
        <div className="bg-[#0e0019] py-12 border-t border-border/20 mt-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-xs text-gray-400">
            {/* Contacts */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent block">Contact Channels</span>
              <div className="space-y-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> info@oravate.in
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
    </div>
  );
}
