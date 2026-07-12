import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApplyAsInfluencer } from "@/lib/api-mock";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name required"),
  platform: z.string().min(1, "Platform required"),
  category: z.string().min(1, "Category required"),
  followers: z.coerce.number().min(1000, "Minimum 1K followers required"),
  engagementRate: z.coerce.number().min(0, "Invalid rate"),
  location: z.string().min(2, "Location required"),
  pricePerPostInr: z.coerce.number().min(0, "Invalid rate"),
  bio: z.string().min(10, "Bio required"),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export default function JoinInfluencer() {
  const { toast } = useToast();
  const applyMutation = useApplyAsInfluencer();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      platform: "Instagram",
      category: "Lifestyle",
      followers: 10000,
      engagementRate: 3.5,
      location: "Mumbai",
      pricePerPostInr: 5000,
      bio: "",
      avatarUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    applyMutation.mutate({
      data: values
    }, {
      onSuccess: () => {
        toast({
          title: "Application Received",
          description: "Our curation team will review your profile.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Application Failed",
          description: "Please check your inputs and try again.",
        });
      }
    });
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl relative z-10">
      <div className="mb-12 text-center">
        <h1 className="text-5xl mb-4 text-white font-semibold font-serif">Join the Network</h1>
        <p className="text-xl text-gray-300">Monetize your influence with India's top brands.</p>
      </div>

      <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-xl">
        <CardContent className="p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Full Name / Handle</FormLabel><FormControl><Input className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Primary Location</FormLabel><FormControl><Input className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="platform" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Primary Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg h-12 bg-background/50 border border-border text-white focus:ring-1 focus:ring-accent">
                          <SelectValue placeholder="Select platform" />
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
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Niche / Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg h-12 bg-background/50 border border-border text-white focus:ring-1 focus:ring-accent">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-md bg-popover border border-border text-white">
                        <SelectItem value="Tech">Tech</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="followers" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Follower Count</FormLabel><FormControl><Input type="number" className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="engagementRate" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Avg Engagement (%)</FormLabel><FormControl><Input type="number" step="0.1" className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="pricePerPostInr" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Rate per Post (INR)</FormLabel><FormControl><Input type="number" className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent font-serif" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <FormField control={form.control} name="bio" render={({ field }) => (
                <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Short Bio</FormLabel><FormControl><Textarea className="rounded-lg min-h-[100px] bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent resize-none" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              
              <FormField control={form.control} name="avatarUrl" render={({ field }) => (
                <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Avatar Image URL (Optional)</FormLabel><FormControl><Input type="url" className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <Button type="submit" disabled={applyMutation.isPending} className="w-full rounded-lg h-16 text-lg tracking-wide uppercase font-bold bg-gradient-to-r from-[#7f00ff] via-[#b163ff] to-[#d49cff] text-white hover:opacity-95 transition-all shadow-lg hover:shadow-[#7f00ff]/20 mt-8 btn-premium">
                {applyMutation.isPending ? "Submitting..." : "Apply to Network"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
