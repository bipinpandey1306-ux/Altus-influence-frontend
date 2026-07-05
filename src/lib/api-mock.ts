import { useQuery, useMutation } from "@tanstack/react-query";

// Types
export interface Influencer {
  id: string;
  name: string;
  category: string;
  location: string;
  bio: string;
  followers: number;
  engagementRate: number;
  rating: number;
  platform: string;
  pricePerPostInr: number;
  avatarUrl: string;
  tier: string;
  languages: string[];
}

export interface PlatformStats {
  totalPayoutsInr: number;
  totalInfluencers: number;
  avgEngagementRate: number;
  totalBusinesses: number;
}

export interface CaseStudy {
  id: string;
  brandName: string;
  campaignTitle: string;
  category: string;
  stats: { label: string; value: string }[];
  description: string;
  impactSnippet: string;
}

// Initial mock data
const INITIAL_INFLUENCERS: Influencer[] = [
  {
    id: "inf1",
    name: "Technical Guruji",
    category: "Tech",
    location: "Delhi",
    bio: "India's leading tech YouTuber sharing reviews, news, and unboxings in simple Hindi.",
    followers: 23100000,
    engagementRate: 5.8,
    rating: 4.8,
    platform: "YouTube",
    pricePerPostInr: 850000,
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&fit=crop&q=80",
    tier: "Mega",
    languages: ["Hindi", "English"]
  },
  {
    id: "inf2",
    name: "Ranveer Allahbadia",
    category: "Business",
    location: "Mumbai",
    bio: "Co-founder of Monk Entertainment, hosting India's premier podcast covering self-improvement, tech, and startups.",
    followers: 3200000,
    engagementRate: 8.4,
    rating: 4.9,
    platform: "Instagram",
    pricePerPostInr: 350000,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80",
    tier: "Mega",
    languages: ["Hindi", "English"]
  },
  {
    id: "inf3",
    name: "Mumbiker Nikhil",
    category: "Lifestyle",
    location: "Mumbai",
    bio: "Popular motovlogger and lifestyle creator documenting daily adventures and travel logs across India.",
    followers: 4300000,
    engagementRate: 4.2,
    rating: 4.6,
    platform: "YouTube",
    pricePerPostInr: 300000,
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&fit=crop&q=80",
    tier: "Mega",
    languages: ["Hindi", "English"]
  },
  {
    id: "inf4",
    name: "Kusha Kapila",
    category: "Lifestyle",
    location: "Delhi",
    bio: "Creative comic, actress, and internet personality crafting viral pop-culture satires and fashion reviews.",
    followers: 3400000,
    engagementRate: 9.1,
    rating: 4.7,
    platform: "Instagram",
    pricePerPostInr: 450000,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=80",
    tier: "Mega",
    languages: ["Hindi", "English"]
  },
  {
    id: "inf5",
    name: "Amit Bhadana",
    category: "Lifestyle",
    location: "Delhi",
    bio: "Folk comedy writer and creator producing short movies, relatable family sketches, and music tracks on YouTube.",
    followers: 24300000,
    engagementRate: 6.5,
    rating: 4.7,
    platform: "YouTube",
    pricePerPostInr: 1200000,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80",
    tier: "Mega",
    languages: ["Hindi", "English"]
  },
  {
    id: "inf6",
    name: "Jannat Zubair",
    category: "Fashion",
    location: "Mumbai",
    bio: "High-trust television actress and visual content creator showcasing style trends and makeup reels.",
    followers: 49200000,
    engagementRate: 7.2,
    rating: 4.8,
    platform: "Instagram",
    pricePerPostInr: 600000,
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&fit=crop&q=80",
    tier: "Mega",
    languages: ["Hindi", "English"]
  }
];

const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs1",
    brandName: "PayUtsav",
    campaignTitle: "Fintech App Launch in Tier 2/3 Cities",
    category: "Finance",
    stats: [
      { label: "Reach", value: "4.5M+" },
      { label: "App Installs", value: "85K+" },
      { label: "ROI", value: "3.2x" }
    ],
    description: "We deployed a network of 15 regional finance creators on YouTube explaining UPI savings in local dialects, driving rapid adoption.",
    impactSnippet: "Highly detailed regional explainers led to a 45% increase in user retention."
  },
  {
    id: "cs2",
    brandName: "VoltGadgets",
    campaignTitle: "Wireless Earbuds Product Launch",
    category: "Tech",
    stats: [
      { label: "Video Views", value: "2.8M+" },
      { label: "CTR", value: "8.4%" },
      { label: "Sales Generated", value: "₹45L+" }
    ],
    description: "A focused campaign with 6 tech unboxers on YouTube Shorts and Instagram Reels showcasing product durability and sound comparisons.",
    impactSnippet: "Pre-orders sold out within 72 hours of campaign launch."
  },
  {
    id: "cs3",
    brandName: "IndieGlow",
    campaignTitle: "Organic Skincare Brand Awareness",
    category: "Fashion",
    stats: [
      { label: "Creator Posts", value: "25+" },
      { label: "Engagement", value: "9.2%" },
      { label: "New Followers", value: "30K+" }
    ],
    description: "Nano and Micro skincare creators shared their 30-day glow challenge journeys, generating authentic, high-engagement user reviews.",
    impactSnippet: "User-generated content library was licensed for brand ads."
  }
];

// Load from localStorage or set defaults
function getInfluencers(): Influencer[] {
  const data = localStorage.getItem("ib_influencers");
  if (!data || data === "[]") {
    localStorage.setItem("ib_influencers", JSON.stringify(INITIAL_INFLUENCERS));
    return INITIAL_INFLUENCERS;
  }
  try {
    const parsed = JSON.parse(data);
    // If the saved data contains empty avatars (from previous checkpoint) or old ID structures, refresh once
    if (
      Array.isArray(parsed) && 
      (parsed.length === 0 || 
       !parsed[0].avatarUrl || 
       parsed.some((inf: any) => ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(inf.id)))
    ) {
      localStorage.setItem("ib_influencers", JSON.stringify(INITIAL_INFLUENCERS));
      return INITIAL_INFLUENCERS;
    }
    return parsed;
  } catch (e) {
    localStorage.setItem("ib_influencers", JSON.stringify(INITIAL_INFLUENCERS));
    return INITIAL_INFLUENCERS;
  }
}

function saveInfluencers(data: Influencer[]) {
  localStorage.setItem("ib_influencers", JSON.stringify(data));
}

// Mock hooks
export function useGetPlatformStats() {
  return useQuery<PlatformStats, Error>({
    queryKey: ["platformStats"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
      const influencers = getInfluencers();
      const avgEng = influencers.length > 0
        ? influencers.reduce((acc, curr) => acc + curr.engagementRate, 0) / influencers.length
        : 0;
      return {
        totalPayoutsInr: influencers.length > 0 ? 18500000 : 0,
        totalInfluencers: influencers.length,
        avgEngagementRate: parseFloat(avgEng.toFixed(1)),
        totalBusinesses: influencers.length > 0 ? 142 : 0
      };
    }
  });
}

export function useListInfluencers(params: { search?: string; platform?: string; category?: string; tier?: string; language?: string; location?: string }) {
  return useQuery<Influencer[], Error>({
    queryKey: ["listInfluencers", params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 40));
      let list = getInfluencers();
      
      if (params.platform) {
        list = list.filter((inf) => inf.platform.toLowerCase() === params.platform!.toLowerCase());
      }
      if (params.category) {
        list = list.filter((inf) => inf.category.toLowerCase() === params.category!.toLowerCase());
      }
      if (params.tier) {
        list = list.filter((inf) => inf.tier.toLowerCase() === params.tier!.toLowerCase());
      }
      if (params.language) {
        list = list.filter((inf) => 
          inf.languages.some(lang => lang.toLowerCase() === params.language!.toLowerCase())
        );
      }
      if (params.location) {
        list = list.filter((inf) => inf.location.toLowerCase() === params.location!.toLowerCase());
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter((inf) => 
          inf.name.toLowerCase().includes(q) || 
          inf.bio.toLowerCase().includes(q) ||
          inf.location.toLowerCase().includes(q)
        );
      }
      return list;
    }
  });
}

export function useGetInfluencer(id: string, options?: any) {
  return useQuery<Influencer | null, Error>({
    queryKey: ["getInfluencer", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
      const list = getInfluencers();
      return list.find((inf) => inf.id === id) || null;
    },
    ...options?.query
  });
}

export function useListCaseStudies() {
  return useQuery<CaseStudy[], Error>({
    queryKey: ["listCaseStudies"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
      return MOCK_CASE_STUDIES;
    }
  });
}

export function useCreateCampaign() {
  return useMutation({
    mutationFn: async (variables: { data: any }) => {
      await new Promise((resolve) => setTimeout(resolve, 80));
      
      const campaigns = JSON.parse(localStorage.getItem("ib_campaigns") || "[]");
      const newCampaign = {
        id: Math.random().toString(36).substring(2, 9),
        ...variables.data,
        status: "pending",
        createdAt: new Date().toISOString()
      };
      campaigns.push(newCampaign);
      localStorage.setItem("ib_campaigns", JSON.stringify(campaigns));
      return newCampaign;
    }
  });
}

export function useApplyAsInfluencer() {
  return useMutation({
    mutationFn: async (variables: { data: any }) => {
      await new Promise((resolve) => setTimeout(resolve, 80));
      
      const influencers = getInfluencers();
      const newInfluencer: Influencer = {
        id: Math.random().toString(36).substring(2, 9),
        name: variables.data.name,
        category: variables.data.category,
        platform: variables.data.platform,
        followers: Number(variables.data.followers),
        engagementRate: Number(variables.data.engagementRate || "4.5"),
        rating: 4.5,
        location: variables.data.location || "India",
        bio: variables.data.bio || `Creator on ${variables.data.platform}`,
        pricePerPostInr: Number(variables.data.pricePerPostInr || "20000"),
        avatarUrl: "",
        tier: Number(variables.data.followers) < 10000 ? "Nano" : Number(variables.data.followers) < 100000 ? "Micro" : Number(variables.data.followers) < 1000000 ? "Macro" : "Mega",
        languages: variables.data.languages || ["Hindi", "English"]
      };
      
      influencers.push(newInfluencer);
      saveInfluencers(influencers);
      return newInfluencer;
    }
  });
}

export function useUpdateInfluencer() {
  return useMutation({
    mutationFn: async (variables: { id: string; data: any }) => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      const influencers = getInfluencers();
      const index = influencers.findIndex((inf) => inf.id === variables.id);
      if (index === -1) throw new Error("Influencer not found");
      
      const updated: Influencer = {
        ...influencers[index],
        ...variables.data,
        followers: Number(variables.data.followers || influencers[index].followers),
        pricePerPostInr: Number(variables.data.pricePerPostInr || influencers[index].pricePerPostInr),
        engagementRate: Number(variables.data.engagementRate || influencers[index].engagementRate),
        rating: Number(variables.data.rating || influencers[index].rating),
        tier: Number(variables.data.followers || influencers[index].followers) < 10000 ? "Nano" : Number(variables.data.followers || influencers[index].followers) < 100000 ? "Micro" : Number(variables.data.followers || influencers[index].followers) < 1000000 ? "Macro" : "Mega",
      };
      
      influencers[index] = updated;
      saveInfluencers(influencers);
      return updated;
    }
  });
}

export function useDeleteInfluencer() {
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 40));
      let influencers = getInfluencers();
      influencers = influencers.filter((inf) => inf.id !== id);
      saveInfluencers(influencers);
      return id;
    }
  });
}
