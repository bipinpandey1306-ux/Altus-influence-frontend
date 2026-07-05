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
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-12 text-center">
        <h1 className="text-5xl mb-4">Join the Network</h1>
        <p className="text-xl text-muted-foreground">Monetize your influence with India's top brands.</p>
      </div>

      <Card className="rounded-none border-border shadow-xl">
        <CardContent className="p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider">Full Name / Handle</FormLabel><FormControl><Input className="rounded-none h-12 bg-muted/50" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider">Primary Location</FormLabel><FormControl><Input className="rounded-none h-12 bg-muted/50" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="platform" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-[10px] tracking-wider">Primary Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none h-12 bg-muted/50"><SelectValue placeholder="Select platform" /></SelectTrigger>
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
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-[10px] tracking-wider">Niche / Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none h-12 bg-muted/50"><SelectValue placeholder="Select category" /></SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
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
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider">Follower Count</FormLabel><FormControl><Input type="number" className="rounded-none h-12 bg-muted/50" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="engagementRate" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider">Avg Engagement (%)</FormLabel><FormControl><Input type="number" step="0.1" className="rounded-none h-12 bg-muted/50" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="pricePerPostInr" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider">Rate per Post (INR)</FormLabel><FormControl><Input type="number" className="rounded-none h-12 bg-muted/50" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <FormField control={form.control} name="bio" render={({ field }) => (
                <FormItem><FormLabel className="uppercase text-[10px] tracking-wider">Short Bio</FormLabel><FormControl><Textarea className="rounded-none min-h-[100px] bg-muted/50 resize-none" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              
              <FormField control={form.control} name="avatarUrl" render={({ field }) => (
                <FormItem><FormLabel className="uppercase text-[10px] tracking-wider">Avatar Image URL (Optional)</FormLabel><FormControl><Input type="url" className="rounded-none h-12 bg-muted/50" placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <Button type="submit" disabled={applyMutation.isPending} className="w-full rounded-none h-16 text-lg tracking-wide uppercase font-medium mt-8">
                {applyMutation.isPending ? "Submitting..." : "Apply to Network"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
