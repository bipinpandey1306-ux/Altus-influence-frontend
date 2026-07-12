import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListInfluencers,
  useApplyAsInfluencer,
  useUpdateInfluencer,
  useDeleteInfluencer,
  Influencer,
} from "@/lib/api-mock";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCompactNumber, formatINR } from "@/lib/format";
import { Trash2, Edit2, Plus, Users, DollarSign, Activity, Check, Lock, LogOut, Send } from "lucide-react";

function sha256Fallback(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const lengthProperty = 'length';
  let i, j;
  let result = '';
  const words: number[] = [];
  const asciiLength = ascii[lengthProperty] * 8;
  const hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  let asciiIdx = 0;
  const len = ascii.length;
  while (asciiIdx < len) {
    const charCode = ascii.charCodeAt(asciiIdx);
    const wordIdx = asciiIdx >> 2;
    words[wordIdx] = (words[wordIdx] || 0) | (charCode << (24 - (asciiIdx % 4) * 8));
    asciiIdx++;
  }
  const wordCount = (asciiLength >> 5);
  words[wordCount] = (words[wordCount] || 0) | (128 << (24 - (asciiLength % 32)));
  words[((asciiLength + 64 >> 9) << 4) + 15] = asciiLength;
  for (i = 0; i < words.length; i += 16) {
    const w = words.slice(i, i + 16);
    let a = hash[0], b = hash[1], c = hash[2], d = hash[3], e = hash[4], f = hash[5], g = hash[6], h = hash[7];
    for (j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = w[j] || 0;
      } else {
        const s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        const s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + (w[j - 7] || 0) + s1) | 0;
      }
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + k[j] + w[j]) | 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;
      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }
    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }
  for (i = 0; i < 8; i++) {
    const val = hash[i];
    const hex = (val >>> 0).toString(16);
    result += '00000000'.substring(hex.length) + hex;
  }
  return result;
}

// SHA-256 hashing helper function
async function sha256(message: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    } catch (e) {
      console.warn("Subtle crypto failed, falling back to pure JS hashing", e);
    }
  }
  return sha256Fallback(message);
}

// Form Validation Schema
const influencerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  platform: z.string().min(1, "Platform is required"),
  category: z.string().min(1, "Category is required"),
  followers: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Followers must be a positive number",
  }),
  pricePerPostInr: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  engagementRate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Engagement rate must be a non-negative number",
  }),
  location: z.string().min(1, "Location state is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type FormValues = z.infer<typeof influencerSchema>;

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("altus_admin_auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const hash = await sha256(password);
    // Hashed value of "@12345@Bcp"
    if (hash === "89fbbac5ad9ec312dfed68d6e577c706a146e136a07a6e40d26b8a57c9f31ee5") {
      localStorage.setItem("altus_admin_auth", "true");
      setIsAuthenticated(true);
      toast({
        title: "Welcome Back",
        description: "Admin panel access authorized successfully.",
      });
    } else {
      setError("Invalid administrator password.");
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "The password you entered is incorrect.",
      });
    }
  };

  const { data: influencers, isLoading } = useListInfluencers({});
  const createMutation = useApplyAsInfluencer();
  const updateMutation = useUpdateInfluencer();
  const deleteMutation = useDeleteInfluencer();

  const form = useForm<FormValues>({
    resolver: zodResolver(influencerSchema),
    defaultValues: {
      name: "",
      platform: "Instagram",
      category: "Tech",
      followers: "",
      pricePerPostInr: "",
      engagementRate: "4.5",
      location: "Mumbai",
      bio: "",
    },
  });

  // Calculate quick stats
  const totalCreators = influencers?.length || 0;
  const avgPrice = totalCreators > 0 
    ? Math.round(influencers!.reduce((acc, curr) => acc + curr.pricePerPostInr, 0) / totalCreators) 
    : 0;
  const avgEng = totalCreators > 0 
    ? parseFloat((influencers!.reduce((acc, curr) => acc + curr.engagementRate, 0) / totalCreators).toFixed(1)) 
    : 0;

  // Handle Edit Action: Load data into form
  const handleEditClick = (inf: Influencer) => {
    setEditingId(inf.id);
    form.reset({
      name: inf.name,
      platform: inf.platform,
      category: inf.category,
      followers: inf.followers.toString(),
      pricePerPostInr: inf.pricePerPostInr.toString(),
      engagementRate: inf.engagementRate.toString(),
      location: inf.location,
      bio: inf.bio,
    });
    toast({
      title: "Edit Mode Activated",
      description: `Loaded details for ${inf.name}. Scroll up or check the form.`,
    });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingId(null);
    form.reset({
      name: "",
      platform: "Instagram",
      category: "Tech",
      followers: "",
      pricePerPostInr: "",
      engagementRate: "4.5",
      location: "Mumbai",
      bio: "",
    });
  };

  // Delete Action
  const handleDeleteClick = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        queryClient.invalidateQueries({ queryKey: ["listInfluencers"] });
        queryClient.invalidateQueries({ queryKey: ["platformStats"] });
        toast({
          title: "Influencer Deleted",
          description: `Successfully removed ${name} from the database.`,
        });
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: "Something went wrong.",
        });
      }
    }
  };

  // Form Submit Action (Insert or Update)
  const onSubmit = async (values: FormValues) => {
    try {
      const formattedData = {
        name: values.name,
        platform: values.platform,
        category: values.category,
        followers: Number(values.followers),
        pricePerPostInr: Number(values.pricePerPostInr),
        engagementRate: Number(values.engagementRate),
        location: values.location,
        bio: values.bio,
        languages: ["English", "Hindi"], // default languages list
      };

      if (editingId) {
        // Update Action
        await updateMutation.mutateAsync({ id: editingId, data: formattedData });
        setEditingId(null);
        toast({
          title: "Influencer Updated",
          description: `Successfully updated profile of ${values.name}.`,
        });
      } else {
        // Create Action
        await createMutation.mutateAsync({ data: formattedData });
        toast({
          title: "Influencer Added",
          description: `Successfully registered ${values.name} as a creator.`,
        });
      }

      // Reset form and refresh queries
      form.reset({
        name: "",
        platform: "Instagram",
        category: "Tech",
        followers: "",
        pricePerPostInr: "",
        engagementRate: "4.5",
        location: "Mumbai",
        bio: "",
      });
      queryClient.invalidateQueries({ queryKey: ["listInfluencers"] });
      queryClient.invalidateQueries({ queryKey: ["platformStats"] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "Please check your inputs and try again.",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 px-4 bg-background relative z-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#7f00ff]/10 blur-[100px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#b163ff]/8 blur-[100px]" />
        </div>

        <Card className="w-full max-w-md rounded-2xl border border-border shadow-2xl bg-card/60 backdrop-blur-md p-8 flex flex-col gap-6 relative overflow-hidden z-10">
          {/* Subtle neon top border */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7f00ff] via-[#b163ff] to-[#d49cff]" />
          
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-[#7f00ff]/10 text-accent flex items-center justify-center border border-[#7f00ff]/30 rounded-xl mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Admin Authorization</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Restricted Access Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-bold text-gray-300">Password</label>
              <Input
                type="password"
                placeholder="Enter Administrator Password"
                className="rounded-lg h-12 bg-background/50 text-base border-border hover:border-border-strong text-white focus-visible:ring-accent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {error && <p className="text-xs text-rose-500 font-medium mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-lg uppercase text-xs font-bold tracking-widest bg-gradient-to-r from-[#7f00ff] via-[#b163ff] to-[#d49cff] text-white hover:opacity-95 transition-all mt-2 btn-premium"
            >
              Access Dashboard
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border/20 pb-6">
        <div>
          <span className="bg-[#7f00ff]/10 text-accent px-3 py-1 text-xs font-bold uppercase tracking-wider border border-[#7f00ff]/20 rounded-md">
            Admin Portal
          </span>
          <h1 className="text-5xl font-serif text-white font-semibold mt-3 mb-2">Creator Management Dashboard</h1>
          <p className="text-lg text-gray-300">Add, update, or remove influencers in the system database.</p>
        </div>
        <Button 
          variant="outline"
          className="rounded-lg uppercase text-xs font-bold tracking-widest border border-destructive/40 text-rose-400 hover:bg-destructive hover:text-white transition-colors h-11 px-6 flex items-center gap-2 self-start md:self-end"
          onClick={() => {
            localStorage.removeItem("altus_admin_auth");
            setIsAuthenticated(false);
            toast({
              title: "Logged Out",
              description: "You have been logged out of the admin panel.",
            });
          }}
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-md hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-[#7f00ff]/10 border border-[#7f00ff]/25 p-3 text-accent rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400 font-medium block">Total Registered</span>
              <span className="text-3xl font-serif font-bold text-white">{totalCreators}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-md hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 text-emerald-400 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400 font-medium block">Avg Price Per Post</span>
              <span className="text-3xl font-serif font-bold text-white">{formatINR(avgPrice)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-md hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-amber-500/10 border border-amber-500/25 p-3 text-amber-400 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase text-gray-400 font-medium block">Avg Engagement Rate</span>
              <span className="text-3xl font-serif font-bold text-accent">{avgEng}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Add / Edit Form */}
        <div className="lg:col-span-4">
          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-md sticky top-24">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-white font-semibold">
                {editingId ? "Edit Influencer Details" : "Register New Creator"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {editingId ? "Modify fields below to update creator profile." : "Fill details below to add a creator to directory."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-300">Creator Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Rohan Sharma" className="rounded-lg bg-background/50 border border-border text-white focus-visible:ring-accent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {/* Platform */}
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-300">Platform</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-lg bg-background/50 border border-border text-white focus:ring-accent">
                                <SelectValue placeholder="Platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-md bg-popover border border-border text-white">
                              <SelectItem value="Instagram">Instagram</SelectItem>
                              <SelectItem value="YouTube">YouTube</SelectItem>
                              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                              <SelectItem value="X">X</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-300">Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-lg bg-background/50 border border-border text-white focus:ring-accent">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-md bg-popover border border-border text-white">
                              <SelectItem value="Tech">Tech</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Fashion">Fashion</SelectItem>
                              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                              <SelectItem value="Business">Business</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Followers */}
                    <FormField
                      control={form.control}
                      name="followers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-300">Followers</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 150000" className="rounded-lg bg-background/50 border border-border text-white focus-visible:ring-accent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price */}
                    <FormField
                      control={form.control}
                      name="pricePerPostInr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-300">Post Price (INR)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 25000" className="rounded-lg bg-background/50 border border-border text-white focus-visible:ring-accent font-serif" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Engagement */}
                    <FormField
                      control={form.control}
                      name="engagementRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-300">Engagement %</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5.2" className="rounded-lg bg-background/50 border border-border text-white focus-visible:ring-accent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Location */}
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-300">Location (State)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-lg bg-background/50 border border-border text-white focus:ring-accent">
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-md bg-popover border border-border text-white">
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Bio */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-300">Creator Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe content style and audience reach details..." 
                            className="rounded-lg bg-background/50 border border-border text-white focus-visible:ring-accent h-24 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      type="submit" 
                      className="flex-1 rounded-lg uppercase text-xs font-bold tracking-wider bg-gradient-to-r from-[#7f00ff] via-[#b163ff] to-[#d49cff] text-white hover:opacity-95 btn-premium h-11"
                      disabled={createMutation.isPending || updateMutation.isPending}
                    >
                      {editingId ? "Save Profile" : "Add Creator"}
                    </Button>
                    {editingId && (
                      <Button 
                        type="button" 
                        variant="outline"
                        className="rounded-lg uppercase text-xs font-bold tracking-wider border border-border text-accent hover:bg-white/5 h-11 px-4"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Database Table */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-2xl font-serif text-white font-semibold">Registered Creator Profiles</h2>
          
          <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0e0019]/90 text-gray-300 border-b border-border/40 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Creator</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4 text-right">Followers</th>
                    <th className="px-6 py-4 text-right">Price per Post</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400">
                        Loading database...
                      </td>
                    </tr>
                  ) : influencers?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-400">
                        No creators registered yet. Use the form on the left to add the first profile!
                      </td>
                    </tr>
                  ) : (
                    influencers?.map((inf) => (
                      <tr key={inf.id} className="hover:bg-[#7f00ff]/5 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          <div>
                            <span className="text-base text-white font-semibold block">{inf.name}</span>
                            <span className="text-xs text-gray-400 uppercase">{inf.category} • {inf.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-accent/10 text-accent border border-accent/20 rounded-md px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
                            {inf.platform}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-white">
                          {formatCompactNumber(inf.followers)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-accent">
                          {formatINR(inf.pricePerPostInr)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-400 hover:text-accent rounded-lg"
                              onClick={() => handleEditClick(inf)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-400 hover:text-rose-500 rounded-lg"
                              onClick={() => handleDeleteClick(inf.id, inf.name)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
