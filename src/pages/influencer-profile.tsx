import { useParams } from "wouter";
import { useGetInfluencer } from "@/lib/api-mock";
import { formatCompactNumber, formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, Instagram, Youtube, Linkedin, Twitter, Target } from "lucide-react";

export default function InfluencerProfile() {
  const params = useParams<{ id: string }>();
  const id = params.id as string;
  const { data: influencer, isLoading } = useGetInfluencer(id, { query: { enabled: !!id, queryKey: ['getInfluencer', id] } });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 animate-pulse">
        <div className="h-[400px] bg-muted w-full mb-8"></div>
        <div className="h-12 bg-muted w-1/3 mb-4"></div>
        <div className="h-4 bg-muted w-1/4 mb-8"></div>
      </div>
    );
  }

  if (!influencer) {
    return <div className="container mx-auto px-4 py-24 text-center">Creator not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <Link href="/influencers" className="text-sm font-medium text-muted-foreground hover:text-primary uppercase tracking-wider">
          ← Back to Directory
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Col - Visual */}
        <div className="md:col-span-5">
          <div className="aspect-[4/5] bg-muted w-full overflow-hidden border">
            {influencer.avatarUrl ? (
              <img src={influencer.avatarUrl} alt={influencer.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-serif text-9xl text-muted-foreground bg-muted">
                {influencer.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Right Col - Details */}
        <div className="md:col-span-7 flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider border border-primary/20">
                {influencer.category}
              </span>
              <span className="flex items-center text-sm font-medium text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" /> {influencer.location}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-4">{influencer.name}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {influencer.bio}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Followers</div>
              <div className="text-2xl font-serif">{formatCompactNumber(influencer.followers)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Engagement</div>
              <div className="text-2xl font-serif text-primary">{influencer.engagementRate}%</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Rating</div>
              <div className="text-2xl font-serif flex items-center gap-1">
                {influencer.rating} <Star className="w-4 h-4 fill-primary text-primary" />
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Platform</div>
              <div className="text-lg font-medium">{influencer.platform}</div>
            </div>
          </div>

          <div className="bg-card border p-8 mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Standard Rate</div>
              <div className="text-3xl font-serif">{formatINR(influencer.pricePerPostInr)} <span className="text-base font-sans text-muted-foreground font-normal">/ post</span></div>
            </div>
            <Link href={`/start-campaign?influencer=${influencer.name}`}>
              <Button size="lg" className="rounded-none w-full sm:w-auto h-14 px-8 text-base">
                Request Campaign
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
