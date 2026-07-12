import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Target, TrendingUp, Award, MapPin, Mail, Phone } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl relative z-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="bg-primary/10 text-accent px-3 py-1 text-xs font-bold uppercase tracking-wider border border-border/40 rounded-md">
          Our Company
        </span>
        <h1 className="text-5xl md:text-6xl font-serif text-white font-semibold mt-4 mb-4">Connecting Brands with Elite Creators</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Altus Influence is a state-of-the-art influencer brokerage platform designed by Oravate Technologies. We streamline high-trust creator marketing across India.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-serif text-white font-semibold mb-6">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            In an era of rapid digital growth, traditional advertising is shifting. High-impact brands need more than just views; they need trust. We build that bridge by partnering with data-verified creators who carry authentic influence in regional and national markets.
          </p>
          <p className="text-gray-300 leading-relaxed">
            By eliminating fake metrics, standardizing pricing benchmarks, and strictly adhering to Indian advertising compliance laws (ASCI), we ensure every campaign delivers true ROI and sustainable brand equity.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm hover:border-border-strong hover:shadow-hover transition-all duration-300">
            <CardContent className="p-0 space-y-2">
              <div className="text-accent font-bold text-3xl font-serif">150M+</div>
              <span className="text-xs uppercase font-medium text-gray-400 block">Combined Reach</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm hover:border-border-strong hover:shadow-hover transition-all duration-300">
            <CardContent className="p-0 space-y-2">
              <div className="text-accent font-bold text-3xl font-serif">140+</div>
              <span className="text-xs uppercase font-medium text-gray-400 block">Partner Brands</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm hover:border-border-strong hover:shadow-hover transition-all duration-300">
            <CardContent className="p-0 space-y-2">
              <div className="text-accent font-bold text-3xl font-serif">98%</div>
              <span className="text-xs uppercase font-medium text-gray-400 block">ASCI Compliance</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm hover:border-border-strong hover:shadow-hover transition-all duration-300">
            <CardContent className="p-0 space-y-2">
              <div className="text-accent font-bold text-3xl font-serif">3.2x</div>
              <span className="text-xs uppercase font-medium text-gray-400 block">Avg Campaign ROI</span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="mb-20">
        <h2 className="text-3xl font-serif text-white font-semibold text-center mb-12">Our Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 shadow-md hover:border-border-strong hover:shadow-hover transition-all duration-300">
            <CardContent className="p-0 space-y-4">
              <div className="text-accent bg-[#7f00ff]/10 border border-[#7f00ff]/20 p-3 w-fit rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white font-semibold">Data-Driven Fit Scores</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                No blind matching. We calculate creators' relevance scores based on audience demographics, local language engagement, and content themes.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 shadow-md hover:border-border-strong hover:shadow-hover transition-all duration-300">
            <CardContent className="p-0 space-y-4">
              <div className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 w-fit rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white font-semibold">ASCI Transparency</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                We safeguard brands and creators by mandating legal disclosures (#Ad, #Sponsored) and tracking evolutions in regional advertising guidelines.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 shadow-md hover:border-border-strong hover:shadow-hover transition-all duration-300">
            <CardContent className="p-0 space-y-4">
              <div className="text-amber-400 bg-amber-500/10 border border-amber-500/20 p-3 w-fit rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white font-semibold">Brokerage Standards</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Say goodbye to arbitrary pricing. We offer fair, calculator-backed standard post rates that ensure creators are paid well and brands pay fairly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Office Hubs & Contacts */}
      <div className="border-t border-border/20 pt-16 max-w-xl mx-auto relative z-10">
        <div className="bg-card/60 backdrop-blur-md p-8 md:p-12 border border-border rounded-2xl flex flex-col justify-between shadow-md text-center">
          <div>
            <h3 className="text-3xl font-serif text-white font-semibold mb-4">Get In Touch</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Connect with our campaign strategy teams for custom brokerage planning or media kit integrations.
            </p>
            <a href="mailto:info@oravate.in" className="flex justify-center items-center gap-3 text-base text-gray-300 hover:text-accent transition-colors mb-6 inline-flex">
              <Mail className="w-5 h-5 text-accent" />
              <span className="font-medium">info@oravate.in</span>
            </a>
          </div>
          <div className="mt-4">
            <Link href="/start-campaign">
              <Button className="rounded-lg uppercase text-xs font-bold tracking-wider px-8 h-12 bg-gradient-to-r from-[#7f00ff] via-[#b163ff] to-[#d49cff] text-white hover:opacity-95 transition-all shadow-lg hover:shadow-[#7f00ff]/20 btn-premium">
                Plan Your Campaign
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
