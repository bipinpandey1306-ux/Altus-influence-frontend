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
import { Trash2, Edit2, Plus, Users, DollarSign, Activity, Check, Lock, LogOut } from "lucide-react";

// SHA-256 hashing helper function
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
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
    return sessionStorage.getItem("altus_admin_auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const hash = await sha256(password);
    // Hashed value of "@12345@Bcp"
    if (hash === "89fbbac5ad9ec312dfed68d6e577c706a146e136a07a6e40d26b8a57c9f31ee5") {
      sessionStorage.setItem("altus_admin_auth", "true");
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
      <div className="flex-1 flex items-center justify-center py-24 px-4 bg-gradient-to-br from-background via-[#fdfdfd] to-secondary/30">
        <Card className="w-full max-w-md rounded-none border border-border shadow-xl bg-card p-8 flex flex-col gap-6 relative overflow-hidden">
          {/* Subtle neon top border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 text-primary flex items-center justify-center border border-primary/20 mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground">Admin Authorization</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Restricted Access Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-bold text-foreground">Password</label>
              <Input
                type="password"
                placeholder="Enter Administrator Password"
                className="rounded-none h-12 bg-transparent text-base border-border focus-visible:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {error && <p className="text-xs text-destructive font-medium mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-none uppercase text-xs font-bold tracking-widest bg-primary text-primary-foreground hover:bg-primary/95 transition-all mt-2"
            >
              Access Dashboard
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider border border-primary/20">
            Admin Portal
          </span>
          <h1 className="text-5xl font-serif mt-3 mb-2">Creator Management Dashboard</h1>
          <p className="text-lg text-muted-foreground">Add, update, or remove influencers in the system database.</p>
        </div>
        <Button 
          variant="outline"
          className="rounded-none uppercase text-xs font-bold tracking-widest border-destructive/30 hover:bg-destructive hover:text-white transition-colors h-11 px-6 flex items-center gap-2 self-start md:self-end"
          onClick={() => {
            sessionStorage.removeItem("altus_admin_auth");
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
        <Card className="rounded-none border-border shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase text-muted-foreground font-medium block">Total Registered</span>
              <span className="text-3xl font-serif font-bold">{totalCreators}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 text-emerald-500">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase text-muted-foreground font-medium block">Avg Price Per Post</span>
              <span className="text-3xl font-serif font-bold">{formatINR(avgPrice)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border shadow-md">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-amber-500/10 p-3 text-amber-500">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase text-muted-foreground font-medium block">Avg Engagement Rate</span>
              <span className="text-3xl font-serif font-bold">{avgEng}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Add / Edit Form */}
        <div className="lg:col-span-4">
          <Card className="rounded-none border-border shadow-md sticky top-24">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">
                {editingId ? "Edit Influencer Details" : "Register New Creator"}
              </CardTitle>
              <CardDescription>
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
                        <FormLabel className="text-xs uppercase tracking-wider font-bold">Creator Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Rohan Sharma" className="rounded-none" {...field} />
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
                          <FormLabel className="text-xs uppercase tracking-wider font-bold">Platform</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none">
                                <SelectValue placeholder="Platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
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
                          <FormLabel className="text-xs uppercase tracking-wider font-bold">Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
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
                          <FormLabel className="text-xs uppercase tracking-wider font-bold">Followers</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 150000" className="rounded-none" {...field} />
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
                          <FormLabel className="text-xs uppercase tracking-wider font-bold">Post Price (INR)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 25000" className="rounded-none" {...field} />
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
                          <FormLabel className="text-xs uppercase tracking-wider font-bold">Engagement %</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5.2" className="rounded-none" {...field} />
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
                          <FormLabel className="text-xs uppercase tracking-wider font-bold">Location (State)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none">
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
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
                        <FormLabel className="text-xs uppercase tracking-wider font-bold">Creator Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe content style and audience reach details..." 
                            className="rounded-none h-24" 
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
                      className="flex-1 rounded-none uppercase text-xs font-bold tracking-wider"
                      disabled={createMutation.isPending || updateMutation.isPending}
                    >
                      {editingId ? "Save Profile" : "Add Creator"}
                    </Button>
                    {editingId && (
                      <Button 
                        type="button" 
                        variant="outline"
                        className="rounded-none uppercase text-xs font-bold tracking-wider"
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
          <h2 className="text-2xl font-serif">Registered Creator Profiles</h2>
          
          <Card className="rounded-none border-border shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary text-secondary-foreground text-xs uppercase tracking-wider border-b">
                  <tr>
                    <th className="px-6 py-4">Creator</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4 text-right">Followers</th>
                    <th className="px-6 py-4 text-right">Price per Post</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-muted-foreground">
                        Loading database...
                      </td>
                    </tr>
                  ) : influencers?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-muted-foreground">
                        No creators registered yet. Use the form on the left to add the first profile!
                      </td>
                    </tr>
                  ) : (
                    influencers?.map((inf) => (
                      <tr key={inf.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          <div>
                            <span className="text-base text-foreground font-semibold block">{inf.name}</span>
                            <span className="text-xs text-muted-foreground uppercase">{inf.category} • {inf.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-medium uppercase tracking-wider">
                            {inf.platform}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {formatCompactNumber(inf.followers)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-primary">
                          {formatINR(inf.pricePerPostInr)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-primary rounded-none"
                              onClick={() => handleEditClick(inf)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-none"
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
