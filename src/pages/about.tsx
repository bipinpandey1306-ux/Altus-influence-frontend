import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Target, TrendingUp, Award, MapPin, Mail, Phone } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider border border-primary/20">
          Our Company
        </span>
        <h1 className="text-5xl md:text-6xl font-serif mt-4 mb-4">Connecting Brands with Elite Creators</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Altus Influence is a state-of-the-art influencer brokerage platform designed by Oravate Technologies. We streamline high-trust creator marketing across India.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-serif mb-6 text-foreground">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            In an era of rapid digital growth, traditional advertising is shifting. High-impact brands need more than just views; they need trust. We build that bridge by partnering with data-verified creators who carry authentic influence in regional and national markets.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By eliminating fake metrics, standardizing pricing benchmarks, and strictly adhering to Indian advertising compliance laws (ASCI), we ensure every campaign delivers true ROI and sustainable brand equity.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-none border-border bg-card p-6 shadow-sm">
            <CardContent className="p-0 space-y-2">
              <div className="text-primary font-bold text-3xl font-serif">150M+</div>
              <span className="text-xs uppercase font-medium text-muted-foreground block">Combined Reach</span>
            </CardContent>
          </Card>
          <Card className="rounded-none border-border bg-card p-6 shadow-sm">
            <CardContent className="p-0 space-y-2">
              <div className="text-primary font-bold text-3xl font-serif">140+</div>
              <span className="text-xs uppercase font-medium text-muted-foreground block">Partner Brands</span>
            </CardContent>
          </Card>
          <Card className="rounded-none border-border bg-card p-6 shadow-sm">
            <CardContent className="p-0 space-y-2">
              <div className="text-primary font-bold text-3xl font-serif">98%</div>
              <span className="text-xs uppercase font-medium text-muted-foreground block">ASCI Compliance</span>
            </CardContent>
          </Card>
          <Card className="rounded-none border-border bg-card p-6 shadow-sm">
            <CardContent className="p-0 space-y-2">
              <div className="text-primary font-bold text-3xl font-serif">3.2x</div>
              <span className="text-xs uppercase font-medium text-muted-foreground block">Avg Campaign ROI</span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="mb-20">
        <h2 className="text-3xl font-serif text-center mb-12">Our Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-none border-border bg-card p-8 shadow-md">
            <CardContent className="p-0 space-y-4">
              <div className="text-primary bg-primary/10 p-3 w-fit">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif">Data-Driven Fit Scores</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No blind matching. We calculate creators' relevance scores based on audience demographics, local language engagement, and content themes.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-border bg-card p-8 shadow-md">
            <CardContent className="p-0 space-y-4">
              <div className="text-emerald-500 bg-emerald-500/10 p-3 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif">ASCI Transparency</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We safeguard brands and creators by mandating legal disclosures (#Ad, #Sponsored) and tracking evolutions in regional advertising guidelines.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-border bg-card p-8 shadow-md">
            <CardContent className="p-0 space-y-4">
              <div className="text-amber-500 bg-amber-500/10 p-3 w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif">Brokerage Standards</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Say goodbye to arbitrary pricing. We offer fair, calculator-backed standard post rates that ensure creators are paid well and brands pay fairly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Office Hubs & Contacts */}
      <div className="border-t border-border/80 pt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-serif mb-6">Our Operations Hubs</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <strong className="text-base text-foreground font-semibold block uppercase tracking-wider text-xs">Bangalore (Tech Hub)</strong>
                <span className="text-sm text-muted-foreground">Oravate Technologies, MG Road Corporate Hub, Bengaluru, Karnataka - 560001</span>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <strong className="text-base text-foreground font-semibold block uppercase tracking-wider text-xs">Mumbai (Creative Hub)</strong>
                <span className="text-sm text-muted-foreground">Altus Influence Studios, BKC Business Plaza, Mumbai, Maharashtra - 400051</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/30 p-8 border border-border flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-serif mb-4">Get In Touch</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Connect with our campaign strategy teams for custom brokerage planning or media kit integrations.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@influencebridge.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 88818 00808</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/start-campaign">
              <Button className="rounded-none uppercase text-xs font-bold tracking-wider px-6 h-12">
                Plan Your Campaign
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
