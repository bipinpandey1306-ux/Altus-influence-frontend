import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl tracking-tight text-primary">InfluenceBridge</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className={location === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground transition-colors"}>Home</Link>
            <Link href="/influencers" className={location.startsWith("/influencers") ? "text-primary" : "text-muted-foreground hover:text-foreground transition-colors"}>Directory</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/join-as-influencer">
              <Button variant="ghost" className="hidden md:inline-flex rounded-none font-medium">For Influencers</Button>
            </Link>
            <Link href="/start-campaign">
              <Button className="rounded-none font-medium">Start Campaign</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="border-t py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="font-serif text-2xl text-primary">InfluenceBridge</span>
            <p className="mt-4 text-sm text-secondary-foreground/70 max-w-xs">
              India's premier influencer brokerage platform. We connect high-trust brands with elite creators.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link href="/influencers" className="hover:text-primary transition-colors">Directory</Link></li>
              <li><Link href="/start-campaign" className="hover:text-primary transition-colors">For Brands</Link></li>
              <li><Link href="/join-as-influencer" className="hover:text-primary transition-colors">For Creators</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
