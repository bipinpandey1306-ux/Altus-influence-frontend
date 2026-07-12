import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCampaign } from "@/lib/api-mock";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name required"),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().min(10, "Valid phone required"),
  productName: z.string().min(2, "Product name required"),
  promotionType: z.string().min(1, "Type required"),
  targetAudience: z.string().min(5, "Target audience details required"),
  budgetInr: z.coerce.number().min(10000, "Minimum budget is ₹10,000"),
  durationDays: z.coerce.number().min(1, "Duration required"),
  platforms: z.string(), // We'll handle this as a comma separated string for simplicity in UI, API expects array
  deliverables: z.string().min(10, "Describe required deliverables"),
});

export default function StartCampaign() {
  const { toast } = useToast();
  const createCampaign = useCreateCampaign();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      contactEmail: "",
      contactPhone: "",
      productName: "",
      promotionType: "",
      targetAudience: "",
      budgetInr: 50000,
      durationDays: 14,
      platforms: "Instagram, YouTube",
      deliverables: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createCampaign.mutate({
      data: {
        ...values,
        platforms: values.platforms.split(',').map(s => s.trim()),
      }
    }, {
      onSuccess: () => {
        toast({
          title: "Request Submitted",
          description: "Our brokers will contact you within 24 hours.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "Please check the form and try again.",
        });
      }
    });
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl relative z-10">
      <div className="mb-12 text-center">
        <h1 className="text-5xl mb-4 text-white font-semibold font-serif">Commission a Campaign</h1>
        <p className="text-xl text-gray-300">Engage elite creators for your next major initiative.</p>
      </div>

      <Card className="rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-xl">
        <CardContent className="p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent border-b border-border/40 pb-2">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="businessName" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Business Name</FormLabel><FormControl><Input className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="productName" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Product/Service Name</FormLabel><FormControl><Input className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="contactEmail" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Work Email</FormLabel><FormControl><Input type="email" className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="contactPhone" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Phone Number</FormLabel><FormControl><Input type="tel" className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent border-b border-border/40 pb-2">Campaign Specs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="budgetInr" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Budget (INR)</FormLabel><FormControl><Input type="number" className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent font-serif" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="promotionType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Campaign Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg h-12 bg-background/50 border border-border text-white focus:ring-1 focus:ring-accent">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-md bg-popover border border-border text-white">
                          <SelectItem value="Dedicated Video">Dedicated Video</SelectItem>
                          <SelectItem value="Integrated Mention">Integrated Mention</SelectItem>
                          <SelectItem value="Instagram Reels">Instagram Reels</SelectItem>
                          <SelectItem value="Brand Ambassadorship">Brand Ambassadorship</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="targetAudience" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Target Audience Profile</FormLabel><FormControl><Input className="rounded-lg h-12 bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent" placeholder="e.g. Urban millennials, tech enthusiasts" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="deliverables" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase text-[10px] tracking-wider text-gray-300 font-semibold">Required Deliverables</FormLabel><FormControl><Textarea className="rounded-lg min-h-[120px] bg-background/50 border border-border hover:border-border-strong text-white focus-visible:ring-1 focus-visible:ring-accent resize-none" placeholder="1 Dedicated YouTube video, 2 IG Reels, Content licensing for 30 days..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <Button type="submit" disabled={createCampaign.isPending} className="w-full rounded-lg h-16 text-lg tracking-wide uppercase font-bold bg-gradient-to-r from-[#7f00ff] via-[#b163ff] to-[#d49cff] text-white hover:opacity-95 transition-all shadow-lg hover:shadow-[#7f00ff]/20 btn-premium">
                {createCampaign.isPending ? "Submitting Request..." : "Submit Campaign Request"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
