import { useGetPlatformStats, useListInfluencers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatLakhs, formatCompactNumber } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, TrendingUp, Users, Target, PhoneCall, Sparkles, LineChart } from "lucide-react";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetPlatformStats();
  const { data: influencers, isLoading: infLoading } = useListInfluencers({ search: "" });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl leading-[1.1] mb-6">
              Precision influence for <span className="text-primary italic">premium</span> brands.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              We broker high-impact campaigns between India's most trusted brands and elite social creators. No noise, just measurable influence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/start-campaign">
                <Button size="lg" className="rounded-none h-14 px-8 text-base bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full sm:w-auto">
                  Commission a Campaign <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/influencers">
                <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-base w-full sm:w-auto">
                  Explore Directory
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <span className="text-sm uppercase tracking-widest text-primary font-medium">How It Works</span>
            <h2 className="text-4xl mt-4">From brief to brand impact, in three steps.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 text-primary">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="font-serif text-3xl text-primary">01</span>
              <h3 className="text-xl font-serif">Tell us your goals</h3>
              <p className="text-secondary-foreground/70 leading-relaxed">
                Submit your campaign brief and budget. Our team reviews it and understands exactly what you want to achieve.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-serif text-3xl text-primary">02</span>
              <h3 className="text-xl font-serif">We match the right creators</h3>
              <p className="text-secondary-foreground/70 leading-relaxed">
                We hand-pick influencers from our vetted directory by platform, category, and audience fit for maximum resonance.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 text-primary">
                <LineChart className="w-6 h-6" />
              </div>
              <span className="font-serif text-3xl text-primary">03</span>
              <h3 className="text-xl font-serif">Launch & track results</h3>
              <p className="text-secondary-foreground/70 leading-relaxed">
                Campaigns go live and we keep you updated, so every rupee spent translates into measurable brand impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsLoading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-none" />)
            ) : stats ? (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Network Value</span>
                  <span className="text-4xl md:text-5xl font-serif text-foreground">{formatLakhs(stats.totalPayoutsInr)}</span>
                </div>
                <div className="flex flex-col gap-2 border-l pl-8">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Elite Creators</span>
                  <span className="text-4xl md:text-5xl font-serif text-foreground">{formatCompactNumber(stats.totalInfluencers)}</span>
                </div>
                <div className="flex flex-col gap-2 border-l pl-8">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Avg Engagement</span>
                  <span className="text-4xl md:text-5xl font-serif text-foreground">{stats.avgEngagementRate.toFixed(1)}%</span>
                </div>
                <div className="flex flex-col gap-2 border-l pl-8">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Active Brands</span>
                  <span className="text-4xl md:text-5xl font-serif text-foreground">{stats.totalBusinesses}</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Influencer Showcase */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl mb-4">Elite Directory</h2>
              <p className="text-muted-foreground text-lg">Curated voices moving Indian markets.</p>
            </div>
            <Link href="/influencers">
              <Button variant="ghost" className="rounded-none font-medium hover:text-primary hidden sm:flex">
                View all creators <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {infLoading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-96 w-full rounded-none" />)
            ) : influencers?.slice(0, 3).map((inf) => (
              <Link key={inf.id} href={`/influencers/${inf.id}`}>
                <Card className="rounded-none border-border/50 hover:border-primary/50 transition-all cursor-pointer group h-full bg-card hover:shadow-xl">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      {inf.avatarUrl ? (
                         <img src={inf.avatarUrl} alt={inf.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-serif text-6xl text-muted-foreground bg-muted">
                          {inf.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium uppercase tracking-wider">
                        {inf.platform}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-serif mb-1 group-hover:text-primary transition-colors">{inf.name}</h3>
                        <p className="text-muted-foreground text-sm uppercase tracking-wide">{inf.category}</p>
                      </div>
                      <div className="mt-6 flex justify-between items-center border-t pt-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground uppercase">Followers</span>
                          <span className="font-medium">{formatCompactNumber(inf.followers)}</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-xs text-muted-foreground uppercase">Engagement</span>
                          <span className="font-medium text-primary">{inf.engagementRate}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <Link href="/influencers" className="mt-8 block sm:hidden">
            <Button variant="outline" className="w-full rounded-none">View all creators</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
