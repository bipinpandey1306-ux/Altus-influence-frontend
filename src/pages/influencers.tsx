import { useState, useEffect } from "react";
import { useListInfluencers } from "@/lib/api-mock";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCompactNumber, formatINR } from "@/lib/format";
import { Search } from "lucide-react";

export default function Influencers() {
  const [platform, setPlatform] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [tier, setTier] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [locationState, setLocationState] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setPlatform(searchParams.get("platform") || "");
    setTier(searchParams.get("tier") || "");
    setLanguage(searchParams.get("language") || "");
    setLocationState(searchParams.get("location") || "");
  }, [window.location.search]);

  const { data: influencers, isLoading } = useListInfluencers({
    platform: platform === "all" ? undefined : platform || undefined,
    category: category === "all" ? undefined : category || undefined,
    tier: tier === "all" ? undefined : tier || undefined,
    language: language === "all" ? undefined : language || undefined,
    location: locationState === "all" ? undefined : locationState || undefined,
    search: search || undefined
  });

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="mb-12">
        <h1 className="text-5xl mb-4 text-white font-semibold font-serif">Directory</h1>
        <p className="text-xl text-gray-300 max-w-2xl">Discover and filter India's top creators by niche, platform, and performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 bg-[#0e0019]/60 backdrop-blur-md p-4 border border-border rounded-2xl shadow-lg">
        <div className="relative col-span-1 lg:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by name, bio..." 
            className="pl-9 rounded-lg h-10 bg-background/50 border border-border hover:border-border-strong focus-visible:ring-1 focus-visible:ring-accent text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-full rounded-lg border border-border bg-background/50 hover:border-border-strong hover:bg-background transition-all focus:ring-1 focus:ring-accent shadow-none text-white">
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent className="rounded-md bg-popover border border-border text-white">
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="YouTube">YouTube</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="X">X</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full rounded-lg border border-border bg-background/50 hover:border-border-strong hover:bg-background transition-all focus:ring-1 focus:ring-accent shadow-none text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-md bg-popover border border-border text-white">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="w-full rounded-lg border border-border bg-background/50 hover:border-border-strong hover:bg-background transition-all focus:ring-1 focus:ring-accent shadow-none text-white">
            <SelectValue placeholder="All Tiers" />
          </SelectTrigger>
          <SelectContent className="rounded-md bg-popover border border-border text-white">
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="Nano">Nano (&lt;10K)</SelectItem>
            <SelectItem value="Micro">Micro (10K-100K)</SelectItem>
            <SelectItem value="Macro">Macro (100K-1M)</SelectItem>
            <SelectItem value="Mega">Mega (1M+)</SelectItem>
          </SelectContent>
        </Select>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full rounded-lg border border-border bg-background/50 hover:border-border-strong hover:bg-background transition-all focus:ring-1 focus:ring-accent shadow-none text-white">
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent className="rounded-md bg-popover border border-border text-white">
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Hindi">Hindi</SelectItem>
            <SelectItem value="Tamil">Tamil</SelectItem>
            <SelectItem value="Telugu">Telugu</SelectItem>
            <SelectItem value="Bengali">Bengali</SelectItem>
            <SelectItem value="Gujarati">Gujarati</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-80 w-full rounded-2xl" />)
        ) : influencers?.length === 0 ? (
          <div className="col-span-full py-24 text-center border border-border bg-card/40 rounded-2xl">
            <p className="text-xl text-gray-400">No creators found matching your criteria.</p>
          </div>
        ) : (
          influencers?.map((inf) => (
            <Link key={inf.id} href={`/influencers/${inf.id}`}>
              <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md hover:border-border-strong hover:shadow-hover transition-all duration-300 cursor-pointer h-full group overflow-hidden flex flex-col">
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {inf.avatarUrl ? (
                      <img src={inf.avatarUrl} alt={inf.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-serif text-5xl text-gray-400 bg-muted">
                        {inf.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/70 text-white border border-border/30 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {inf.platform}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif mb-1 text-white group-hover:text-accent transition-colors">{inf.name}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">{inf.category}</p>
                    
                    <div className="mt-auto grid grid-cols-2 gap-4 border-t border-border/40 pt-4">
                      <div>
                        <div className="text-[10px] uppercase text-gray-400 mb-1">Followers</div>
                        <div className="font-semibold text-white">{formatCompactNumber(inf.followers)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-gray-400 mb-1">Engagement</div>
                        <div className="font-semibold text-accent">{inf.engagementRate}%</div>
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
  );
}
