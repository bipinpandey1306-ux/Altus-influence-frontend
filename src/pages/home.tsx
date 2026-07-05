import { useState } from "react";
import { useGetPlatformStats, useListInfluencers, useListCaseStudies } from "@/lib/api-mock";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatLakhs, formatCompactNumber } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Youtube, 
  Instagram, 
  Tv, 
  MessageSquare, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  Briefcase,
  Gem,
  Award
} from "lucide-react";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetPlatformStats();
  const { data: caseStudies, isLoading: caseStudiesLoading } = useListCaseStudies();
  
  // List top YouTubers and Instagrammers from the database
  const { data: topYoutubers, isLoading: ytLoading } = useListInfluencers({ platform: "YouTube" });
  const { data: topInstagrammers, isLoading: igLoading } = useListInfluencers({ platform: "Instagram" });

  // FAQ Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const services = [
    {
      title: "YouTube Influencer Marketing",
      icon: <Youtube className="w-8 h-8 text-primary" />,
      desc: "Drive dedicated tutorials, product placements, and long-form reviews to establish credibility and capture search intent."
    },
    {
      title: "Instagram Influencer Marketing",
      icon: <Instagram className="w-8 h-8 text-[#E1306C]" />,
      desc: "Create dynamic visual awareness via Reels, carousels, and engaging Stories linked directly to your landing pages."
    },
    {
      title: "Micro-Influencer Campaigns",
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      desc: "Execute targeted, high-conversion collaborations with hyper-local communities at highly cost-effective rates."
    },
    {
      title: "Vernacular & Regional Reach",
      icon: <MessageSquare className="w-8 h-8 text-emerald-500" />,
      desc: "Connect authentically across India in local languages including Hindi, Tamil, Telugu, Kannada, Bengali, and Gujarati."
    }
  ];

  const categories = [
    { name: "Tech & Gadgets", icon: <Cpu className="w-6 h-6" />, slug: "Tech" },
    { name: "Finance & FinTech", icon: <TrendingUp className="w-6 h-6" />, slug: "Finance" },
    { name: "Fashion & Beauty", icon: <Gem className="w-6 h-6" />, slug: "Fashion" },
    { name: "Lifestyle & Travel", icon: <Tv className="w-6 h-6" />, slug: "Lifestyle" },
    { name: "Startup & Business", icon: <Briefcase className="w-6 h-6" />, slug: "Business" }
  ];

  const faqs = [
    {
      q: "What is Influencer Marketing and how does it benefit my brand?",
      a: "Influencer marketing connects brands with social media creators who have established authority and trust within their niche. By promoting your products, creators act as a trusted voice, driving brand awareness, consumer trust, and high-conversion sales."
    },
    {
      q: "Why are Micro-Influencers in India highly recommended?",
      a: "Micro-influencers (10K to 100K followers) often command up to 3x higher engagement rates than macro-celebrities. In India's diverse demographic landscape, they provide a cost-effective channel to tap into vernacular language hubs and hyper-local target audiences."
    },
    {
      q: "How are creator pricing metrics calculated on your platform?",
      a: "We calculate pricing based on audience reach, average engagement rate, platform-specific post formats, and production value. Our platform features an interactive Earnings Calculator to evaluate fair market value per post."
    },
    {
      q: "Are the influencer marketing campaigns ASCI compliant?",
      a: "Yes. Altus Influence mandates strict compliance with the Advertising Standards Council of India (ASCI). All sponsored campaigns must clearly display disclosure labels (e.g. #ad, #sponsored, #collaboration) to ensure transparency."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-28 pb-36 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/20">
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider border border-primary/20">
              India's Premier Brokerage Platform
            </span>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mt-4 mb-6">
              Precision influence for <span className="text-primary font-bold">premium</span> brands.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              We broker high-trust campaign placements between India's leading companies and verified social media creators. Vetted profiles, standardized pricing, zero middleman noise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/start-campaign">
                <Button size="lg" className="rounded-none h-14 px-8 text-sm uppercase tracking-wider font-bold bg-primary text-primary-foreground hover:bg-primary/95 w-full sm:w-auto">
                  Commission a Campaign <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/influencers">
                <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-sm uppercase tracking-wider font-bold w-full sm:w-auto bg-transparent hover:bg-secondary/40">
                  Explore Directory
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="absolute inset-0 bg-primary/10 -m-4 border border-primary/20" />
            <img 
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80" 
              alt="Influencer Marketing Campaign" 
              className="object-cover w-full aspect-[4/3] border border-border shadow-2xl relative z-10 filter grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
      </section>

      {/* Influencer Marketing Services */}
      <section className="py-24 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">What We Offer</span>
            <h2 className="text-4xl font-serif mt-3 mb-4">Influencer Marketing Services</h2>
            <p className="text-muted-foreground">
              End-to-end campaign match-making tailored to deliver true brand engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="rounded-none border-border bg-background p-8 hover:shadow-lg transition-all hover:border-primary/50 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="bg-secondary p-3 w-fit">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Influencer Marketing Services */}
      <section className="py-24 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Custom Enterprise Plans</span>
            <h2 className="text-4xl font-serif mt-3 mb-4">Bespoke Influencer Marketing Services</h2>
            <p className="text-muted-foreground">
              Highly optimized creator campaigns custom built for specific brand launch goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-none border-border bg-card p-8 hover:shadow-lg transition-all hover:border-primary/50 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="bg-primary/10 p-3 w-fit text-primary">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground">Viral Meme Campaigns</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Broker multi-page viral meme campaigns to dominate social feeds, trigger trending status, and drive high organic word-of-mouth conversion.
                </p>
              </div>
            </Card>

            <Card className="rounded-none border-border bg-card p-8 hover:shadow-lg transition-all hover:border-primary/50 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="bg-emerald-500/10 p-3 w-fit text-emerald-500">
                  <Gem className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground">Influencer Gifting & Barter</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Establish authentic, cost-free product reviews by seeding your brand items directly to vetted micro-creators in exchange for honest social coverage.
                </p>
              </div>
            </Card>

            <Card className="rounded-none border-border bg-card p-8 hover:shadow-lg transition-all hover:border-primary/50 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="bg-amber-500/10 p-3 w-fit text-amber-500">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground">Celebrity Advocacy Placements</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acquire massive visual reach and trust association by partnering with major, verified actors and content pioneers for national product launches.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Micro-Influencers in India Section */}
      <section className="py-24 bg-secondary/30 border-b">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Campaign Strategy</span>
            <h2 className="text-4xl font-serif">The Power of Micro-Influencers in India</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Unlike global macro-celebrities with disconnected audiences, Indian micro-influencers (10K - 100K followers) foster hyper-engaged micro-communities built on mutual interests, localized context, and local languages.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              They offer brands a highly authentic, compliance-friendly promotional tool that achieves double the conversion rate at a fraction of the traditional media buying costs.
            </p>
            <div className="pt-2">
              <Link href="/influencers?tier=Micro">
                <Button className="rounded-none uppercase text-xs font-bold tracking-wider px-6 h-12">
                  View Micro Influencers <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-card border p-6 flex flex-col justify-between h-36">
              <span className="text-3xl font-serif font-bold text-primary">6.7%</span>
              <span className="text-xs uppercase text-muted-foreground font-semibold">Avg Engagement Rate</span>
            </div>
            <div className="bg-card border p-6 flex flex-col justify-between h-36">
              <span className="text-3xl font-serif font-bold text-primary">85%+</span>
              <span className="text-xs uppercase text-muted-foreground font-semibold">Audience Trust index</span>
            </div>
            <div className="bg-card border p-6 flex flex-col justify-between h-36">
              <span className="text-3xl font-serif font-bold text-primary">30%</span>
              <span className="text-xs uppercase text-muted-foreground font-semibold">Lower Acquisition Cost</span>
            </div>
            <div className="bg-card border p-6 flex flex-col justify-between h-36">
              <span className="text-3xl font-serif font-bold text-primary">100%</span>
              <span className="text-xs uppercase text-muted-foreground font-semibold">ASCI Guideline Safety</span>
            </div>
          </div>
        </div>
      </section>

      {/* Business Segments and Categories */}
      <section className="py-24 bg-background border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Who We Serve</span>
            <h2 className="text-4xl font-serif mt-3 mb-4">Business Segments and Categories</h2>
            <p className="text-muted-foreground">
              We recruit, audit, and match creators across major industry vertices to maximize relevance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, idx) => (
              <Link key={idx} href={`/influencers?category=${cat.slug}`}>
                <div className="border border-border/80 bg-card p-8 flex flex-col items-center gap-4 cursor-pointer hover:border-primary hover:shadow-lg transition-all">
                  <div className="text-primary bg-primary/10 p-3">
                    {cat.icon}
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-foreground">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsLoading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-none" />)
            ) : stats ? (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Network Value</span>
                  <span className="text-4xl md:text-5xl font-serif text-foreground font-bold">{formatLakhs(stats.totalPayoutsInr)}</span>
                </div>
                <div className="flex flex-col gap-2 border-l pl-8">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Elite Creators</span>
                  <span className="text-4xl md:text-5xl font-serif text-foreground font-bold">{formatCompactNumber(stats.totalInfluencers)}</span>
                </div>
                <div className="flex flex-col gap-2 border-l pl-8">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Avg Engagement</span>
                  <span className="text-4xl md:text-5xl font-serif text-foreground font-bold">{stats.avgEngagementRate.toFixed(1)}%</span>
                </div>
                <div className="flex flex-col gap-2 border-l pl-8">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Active Brands</span>
                  <span className="text-4xl md:text-5xl font-serif text-foreground font-bold">{stats.totalBusinesses}</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Top YouTubers in India */}
      <section className="py-24 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Platform Elite</span>
              <h2 className="text-4xl font-serif mt-2">Top YouTubers in India</h2>
              <p className="text-muted-foreground text-sm">Long-form video influencers with dedicated audiences.</p>
            </div>
            <Link href="/influencers?platform=YouTube">
              <Button variant="ghost" className="rounded-none font-medium hover:text-primary hidden sm:flex">
                View all YouTubers <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ytLoading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-96 w-full rounded-none" />)
            ) : topYoutubers?.length === 0 ? (
              <div className="col-span-3 text-center py-10 border border-dashed border-border text-muted-foreground text-sm">
                No YouTube creators registered in the database yet. Add profiles in the Admin Panel.
              </div>
            ) : (
              topYoutubers?.slice(0, 3).map((inf) => (
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
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                          {inf.platform}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-serif mb-1 group-hover:text-primary transition-colors">{inf.name}</h3>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">{inf.category} • {inf.location}</p>
                        </div>
                        <div className="mt-6 flex justify-between items-center border-t pt-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground uppercase">Subscribers</span>
                            <span className="font-semibold text-sm">{formatCompactNumber(inf.followers)}</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] text-muted-foreground uppercase">Engagement</span>
                            <span className="font-semibold text-sm text-primary">{inf.engagementRate}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Top Instagram Influencers in India */}
      <section className="py-24 bg-secondary/10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Visual Creators</span>
              <h2 className="text-4xl font-serif mt-2">Top Instagram Influencers in India</h2>
              <p className="text-muted-foreground text-sm">Visual trendsetters driving app engagement and Reels.</p>
            </div>
            <Link href="/influencers?platform=Instagram">
              <Button variant="ghost" className="rounded-none font-medium hover:text-primary hidden sm:flex">
                View all Instagrammers <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {igLoading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-96 w-full rounded-none" />)
            ) : topInstagrammers?.length === 0 ? (
              <div className="col-span-3 text-center py-10 border border-dashed border-border text-muted-foreground text-sm">
                No Instagram creators registered in the database yet. Add profiles in the Admin Panel.
              </div>
            ) : (
              topInstagrammers?.slice(0, 3).map((inf) => (
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
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                          {inf.platform}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-serif mb-1 group-hover:text-primary transition-colors">{inf.name}</h3>
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">{inf.category} • {inf.location}</p>
                        </div>
                        <div className="mt-6 flex justify-between items-center border-t pt-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground uppercase">Followers</span>
                            <span className="font-semibold text-sm">{formatCompactNumber(inf.followers)}</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] text-muted-foreground uppercase">Engagement</span>
                            <span className="font-semibold text-sm text-primary">{inf.engagementRate}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Success Stories</span>
            <h2 className="text-4xl font-serif mt-3 mb-4">Real Campaign ROI Cases</h2>
            <p className="text-muted-foreground text-sm">
              We help premium brands drive conversions, product launches, and brand equity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudiesLoading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-80 w-full rounded-none" />)
            ) : caseStudies?.map((cs) => (
              <Card key={cs.id} className="rounded-none border-border/60 bg-card shadow-md flex flex-col justify-between p-8">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-1">
                      {cs.brandName}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase">{cs.category}</span>
                  </div>
                  <h3 className="text-xl font-serif mb-4 leading-snug font-bold">{cs.campaignTitle}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {cs.description}
                  </p>
                </div>
                <div className="border-t pt-6">
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    {cs.stats.map((s, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-lg font-serif font-bold text-foreground">{s.value}</span>
                        <span className="text-[9px] uppercase text-muted-foreground">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs italic text-primary/80 bg-primary/5 p-3 border border-primary/10">
                    &ldquo;{cs.impactSnippet}&rdquo;
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 bg-secondary/20 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Help Desk</span>
            <h2 className="text-4xl font-serif mt-3 mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Got queries? Here are details about matching creators, campaign operations, and fair pricing.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card border border-border shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-serif text-lg md:text-xl font-semibold text-foreground">
                    {faq.q}
                  </span>
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 ml-4" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6 pt-2 border-t border-border/40 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Calculator & Action Banner */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <span className="text-xs uppercase tracking-widest bg-primary-foreground/10 px-3 py-1 font-bold border border-primary-foreground/20">
            Interactive Calculator
          </span>
          <h2 className="text-4xl font-serif mt-5 mb-4 font-bold">Estimate Campaign Rates In Real-Time</h2>
          <p className="text-primary-foreground/80 mb-8 leading-relaxed text-sm md:text-base">
            Curious about market rates for your target platform? Use our client-side fair price tool to compute cost boundaries.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/calculator">
              <Button size="lg" className="rounded-none h-14 px-8 text-sm font-bold uppercase tracking-wider bg-white text-primary hover:bg-white/90">
                Open Calculator <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
