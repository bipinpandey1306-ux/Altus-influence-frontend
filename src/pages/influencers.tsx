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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl mb-4">Directory</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">Discover and filter India's top creators by niche, platform, and performance metrics.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-card p-4 border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, bio, or location..." 
            className="pl-9 rounded-none h-10 bg-transparent border-0 focus-visible:ring-0 text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-px bg-border hidden lg:block" />
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-full lg:w-[150px] rounded-none border-0 focus:ring-0 shadow-none bg-transparent">
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="YouTube">YouTube</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="X">X</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-px bg-border hidden lg:block" />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full lg:w-[150px] rounded-none border-0 focus:ring-0 shadow-none bg-transparent">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-px bg-border hidden lg:block" />
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="w-full lg:w-[150px] rounded-none border-0 focus:ring-0 shadow-none bg-transparent">
            <SelectValue placeholder="All Tiers" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="Nano">Nano (&lt;10K)</SelectItem>
            <SelectItem value="Micro">Micro (10K-100K)</SelectItem>
            <SelectItem value="Macro">Macro (100K-1M)</SelectItem>
            <SelectItem value="Mega">Mega (1M+)</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-px bg-border hidden lg:block" />
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full lg:w-[150px] rounded-none border-0 focus:ring-0 shadow-none bg-transparent">
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Hindi">Hindi</SelectItem>
            <SelectItem value="Tamil">Tamil</SelectItem>
            <SelectItem value="Telugu">Telugu</SelectItem>
            <SelectItem value="Bengali">Bengali</SelectItem>
            <SelectItem value="Gujarati">Gujarati</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-px bg-border hidden lg:block" />
        <Select value={locationState} onValueChange={setLocationState}>
          <SelectTrigger className="w-full lg:w-[150px] rounded-none border-0 focus:ring-0 shadow-none bg-transparent">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Mumbai">Maharashtra</SelectItem>
            <SelectItem value="Bangalore">Karnataka</SelectItem>
            <SelectItem value="Delhi">Delhi</SelectItem>
            <SelectItem value="Goa">Goa</SelectItem>
            <SelectItem value="Ahmedabad">Gujarat</SelectItem>
            <SelectItem value="Hyderabad">Telangana</SelectItem>
            <SelectItem value="Patna">Bihar</SelectItem>
            <SelectItem value="Kolkata">West Bengal</SelectItem>
            <SelectItem value="Chennai">Tamil Nadu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-80 w-full rounded-none" />)
        ) : influencers?.length === 0 ? (
          <div className="col-span-full py-24 text-center border bg-card">
            <p className="text-xl text-muted-foreground">No creators found matching your criteria.</p>
          </div>
        ) : (
          influencers?.map((inf) => (
            <Link key={inf.id} href={`/influencers/${inf.id}`}>
              <Card className="rounded-none border-border/50 hover:border-primary transition-colors cursor-pointer h-full group bg-card hover:shadow-lg flex flex-col">
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {inf.avatarUrl ? (
                      <img src={inf.avatarUrl} alt={inf.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-serif text-5xl text-muted-foreground bg-muted">
                        {inf.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-background px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {inf.platform}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif mb-1 group-hover:text-primary">{inf.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">{inf.category}</p>
                    
                    <div className="mt-auto grid grid-cols-2 gap-4 border-t pt-4">
                      <div>
                        <div className="text-[10px] uppercase text-muted-foreground mb-1">Followers</div>
                        <div className="font-medium">{formatCompactNumber(inf.followers)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-muted-foreground mb-1">Engagement</div>
                        <div className="font-medium text-primary">{inf.engagementRate}%</div>
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
