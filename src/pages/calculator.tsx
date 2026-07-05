import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompactNumber, formatINR } from "@/lib/format";
import { Instagram, Youtube, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export default function EarningsCalculator() {
  const [platform, setPlatform] = useState<"instagram" | "youtube">("instagram");
  const [followers, setFollowers] = useState<number>(50000); // Default 50k
  const [engagement, setEngagement] = useState<number>(4.5); // Default 4.5%

  // Calculate pricing estimates based on Indian influencer market standards
  const calculateEstimates = () => {
    let baseRate = 0;
    let reachMultiplier = 0.85; // Est percentage of followers reached organically

    if (platform === "instagram") {
      // Instagram pricing standard formula: followers * (engagement/100) * factor + base
      // Nano/Micro: ~₹0.15 - ₹0.30 per follower. Macro/Mega: ~₹0.30 - ₹0.60 per follower depending on engagement.
      const engFactor = engagement / 4.5; // normalized around 4.5%
      baseRate = followers * 0.35 * engFactor;
      if (followers < 20000) baseRate = followers * 0.25 * engFactor;
      else if (followers > 500000) baseRate = followers * 0.5 * engFactor;

      // Adjust for minimums
      baseRate = Math.max(1500, baseRate);

      const postRate = Math.round(baseRate);
      const reelRate = Math.round(baseRate * 1.35); // Reels cost ~35% more
      const storyRate = Math.round(baseRate * 0.4); // Stories cost ~40% of a post
      const estReach = Math.round(followers * (engagement / 100) * 3); // Approx views/reach

      return {
        primaryLabel: "Instagram Reel",
        primaryVal: reelRate,
        secondaryLabel: "Standard Grid Post",
        secondaryVal: postRate,
        tertiaryLabel: "Instagram Story",
        tertiaryVal: storyRate,
        estReach,
      };
    } else {
      // YouTube standard unboxing / mention formula
      // YouTube creators charge higher because of longer content lifespan and high production effort
      const engFactor = engagement / 3.0; // normalized around 3% for YouTube
      baseRate = followers * 0.65 * engFactor;
      if (followers < 50000) baseRate = followers * 0.45 * engFactor;
      else if (followers > 1000000) baseRate = followers * 0.85 * engFactor;

      baseRate = Math.max(5000, baseRate);

      const dedicatedVideoRate = Math.round(baseRate);
      const integratedMentionRate = Math.round(baseRate * 0.45); // Integrations cost ~45%
      const youtubeShortsRate = Math.round(baseRate * 0.35); // Shorts are cheaper
      const estViews = Math.round(followers * (engagement / 100) * 2.5);

      return {
        primaryLabel: "Dedicated Video Review",
        primaryVal: dedicatedVideoRate,
        secondaryLabel: "Integrated 60s Mention",
        secondaryVal: integratedMentionRate,
        tertiaryLabel: "YouTube Shorts",
        tertiaryVal: youtubeShortsRate,
        estReach: estViews, // Estimated video views
      };
    }
  };

  const estimates = calculateEstimates();

  // Slider bounds based on platform
  const maxFollowers = platform === "instagram" ? 1000000 : 5000000;
  const followerStep = platform === "instagram" ? 5000 : 10000;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider border border-primary/20">
          Interactive Tool
        </span>
        <h1 className="text-5xl md:text-6xl font-serif mt-4 mb-4">Influencer Earnings Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get real-time fair market value estimates for paid promotions in the Indian creator economy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Controls */}
        <div className="md:col-span-7 space-y-8">
          <Card className="rounded-none border-border/60 shadow-xl bg-card">
            <CardContent className="p-8 space-y-8">
              {/* Platform Selector */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                  Select Channel / Platform
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setPlatform("instagram");
                      setFollowers(100000);
                      setEngagement(5.0);
                    }}
                    className={`flex items-center justify-center gap-2 h-14 border rounded-none font-medium transition-all ${
                      platform === "instagram"
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Instagram className="w-5 h-5" /> Instagram
                  </button>
                  <button
                    onClick={() => {
                      setPlatform("youtube");
                      setFollowers(250000);
                      setEngagement(3.5);
                    }}
                    className={`flex items-center justify-center gap-2 h-14 border rounded-none font-medium transition-all ${
                      platform === "youtube"
                        ? "border-primary bg-primary/5 text-primary shadow-sm"
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Youtube className="w-5 h-5" /> YouTube
                  </button>
                </div>
              </div>

              {/* Followers Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {platform === "instagram" ? "Followers Count" : "Subscribers Count"}
                  </label>
                  <span className="text-2xl font-serif font-semibold">
                    {formatCompactNumber(followers)}
                  </span>
                </div>
                <Slider
                  value={[followers]}
                  onValueChange={(val) => setFollowers(val[0])}
                  min={5000}
                  max={maxFollowers}
                  step={followerStep}
                  className="py-4"
                />
                <div className="flex justify-between text-[10px] uppercase text-muted-foreground/60">
                  <span>5K</span>
                  <span>{formatCompactNumber(maxFollowers / 2)}</span>
                  <span>{formatCompactNumber(maxFollowers)}</span>
                </div>
              </div>

              {/* Engagement Rate Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Average Engagement Rate
                  </label>
                  <span className="text-2xl font-serif font-semibold text-primary">
                    {engagement.toFixed(1)}%
                  </span>
                </div>
                <Slider
                  value={[engagement]}
                  onValueChange={(val) => setEngagement(val[0])}
                  min={1.0}
                  max={15.0}
                  step={0.1}
                  className="py-4"
                />
                <div className="flex justify-between text-[10px] uppercase text-muted-foreground/60">
                  <span>1.0% (Low)</span>
                  <span>4.5% (Avg)</span>
                  <span>15.0% (Elite)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Calculations */}
        <div className="md:col-span-5 flex flex-col justify-between h-full space-y-6">
          <Card className="rounded-none border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 via-card to-card relative overflow-hidden flex-1">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-16 h-16 text-primary" />
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">
                  Estimated Rates
                </h3>

                <div className="space-y-2">
                  <span className="text-xs uppercase text-muted-foreground font-medium block">
                    {estimates.primaryLabel}
                  </span>
                  <span className="text-4xl font-serif text-foreground font-bold">
                    {formatINR(estimates.primaryVal)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block mb-1">
                      {estimates.secondaryLabel}
                    </span>
                    <span className="text-lg font-serif font-semibold">
                      {formatINR(estimates.secondaryVal)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block mb-1">
                      {estimates.tertiaryLabel}
                    </span>
                    <span className="text-lg font-serif font-semibold">
                      {formatINR(estimates.tertiaryVal)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <span className="text-[10px] uppercase text-muted-foreground block mb-1">
                    {platform === "instagram" ? "Estimated Organic Reach" : "Estimated Video Views"}
                  </span>
                  <span className="text-xl font-serif text-foreground font-medium">
                    {formatCompactNumber(estimates.estReach)} <span className="text-xs font-sans text-muted-foreground">/ campaign post</span>
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <Link
                  href={`/start-campaign?budget=${estimates.primaryVal * 2}&platform=${platform === "instagram" ? "Instagram" : "YouTube"}`}
                >
                  <Button className="w-full rounded-none h-14 text-sm font-semibold uppercase tracking-wider">
                    Plan Campaign <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <span className="text-[10px] text-muted-foreground/60 text-center block mt-3 leading-relaxed">
                  *Estimates are calculated using regional brand benchmarks (ASCI compliant) and exclude agency commissions.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
