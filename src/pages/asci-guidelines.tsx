import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Info, FileText, AlertCircle } from "lucide-react";

export default function AsciGuidelines() {
  const [checklist, setChecklist] = useState({
    disclosure: false,
    placement: false,
    duration: false,
    language: false,
    claimProof: false,
    noFilters: false,
  });

  const allChecked = Object.values(checklist).every(Boolean);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
          Compliance & Standards
        </span>
        <h1 className="text-5xl md:text-6xl font-serif mt-4 mb-4">ASCI Compliance Center</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ensure your sponsored campaigns align with the Advertising Standards Council of India (ASCI) regulations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Interactive Compliance Checklist */}
        <div className="md:col-span-7 space-y-6">
          <h2 className="text-2xl font-serif mb-4">Campaign Compliance Checklist</h2>
          
          <Card className="rounded-none border-border shadow-md bg-card">
            <CardContent className="p-6 space-y-6">
              
              <div className="flex items-start gap-4">
                <Checkbox 
                  id="disclosure" 
                  checked={checklist.disclosure}
                  onCheckedChange={() => toggleCheck("disclosure")}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="disclosure" className="text-sm font-semibold uppercase tracking-wider cursor-pointer">
                    Sponsored Disclosure Label
                  </label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Post contains a clear label: <strong>#Ad, #Sponsored, #Collaboration, #Partnership,</strong> or <strong>#FreeGift</strong>. Generic tags like #collab or #sp are not compliant.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t pt-6">
                <Checkbox 
                  id="placement" 
                  checked={checklist.placement}
                  onCheckedChange={() => toggleCheck("placement")}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="placement" className="text-sm font-semibold uppercase tracking-wider cursor-pointer">
                    Prominent Placement
                  </label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The disclosure is not hidden in a cluster of hashtags or inside "see more". It is superimposition on videos, or visible in the first two lines of text.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t pt-6">
                <Checkbox 
                  id="duration" 
                  checked={checklist.disclosure} // linked to disclosure status or toggle
                  onCheckedChange={() => toggleCheck("duration")}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="duration" className="text-sm font-semibold uppercase tracking-wider cursor-pointer">
                    Superimposition Duration
                  </label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For videos under 15s, the label is visible for at least 3s. For videos over 15s, it is visible for 1/3rd of the video duration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t pt-6">
                <Checkbox 
                  id="language" 
                  checked={checklist.language}
                  onCheckedChange={() => toggleCheck("language")}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="language" className="text-sm font-semibold uppercase tracking-wider cursor-pointer">
                    Matching Language
                  </label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The disclosure label is in the same language as the video/audio content (e.g. Hindi, Tamil, Telugu explainers have regional disclosure terms).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t pt-6">
                <Checkbox 
                  id="claimProof" 
                  checked={checklist.claimProof}
                  onCheckedChange={() => toggleCheck("claimProof")}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="claimProof" className="text-sm font-semibold uppercase tracking-wider cursor-pointer">
                    Substantiated Claims
                  </label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Any specific claims (e.g. "cures dandruff", "guarantees 10% returns") are backed by scientific tests or clinical evidence prior to posting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t pt-6">
                <Checkbox 
                  id="noFilters" 
                  checked={checklist.noFilters}
                  onCheckedChange={() => toggleCheck("noFilters")}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="noFilters" className="text-sm font-semibold uppercase tracking-wider cursor-pointer">
                    No Deceptive Filters
                  </label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No beauty or skin-altering filters were used in skincare or cosmetics campaigns that could exaggerate product efficacy.
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Status Card and Informational Resources */}
        <div className="md:col-span-5 space-y-6">
          {/* Status Panel */}
          <Card className={`rounded-none border shadow-md transition-all ${
            allChecked 
              ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300"
              : "border-border bg-card"
          }`}>
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <ShieldCheck className={`w-16 h-16 ${allChecked ? "text-emerald-500" : "text-muted-foreground/30"}`} />
              </div>
              <h3 className="text-xl font-serif">ASCI Compliance Score</h3>
              <p className="text-sm text-muted-foreground">
                {allChecked 
                  ? "Congratulations! Your content matches all requirements for ASCI compliance."
                  : "Please check all criteria on the left to verify your campaign compliance."}
              </p>
              {allChecked && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 py-2 text-xs uppercase tracking-wider font-bold">
                  ✓ Verified ASCI Compliant
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guidelines info card */}
          <Card className="rounded-none border shadow-md bg-card">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-serif flex items-center gap-2 border-b pb-2">
                <Info className="w-5 h-5 text-primary" /> Key ASCI Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <div className="flex gap-2">
                  <span className="font-bold text-foreground">1.</span>
                  <span><strong>Virtual Influencers</strong> are also bound by these regulations. They must explicitly disclose advertising.</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-foreground">2.</span>
                  <span><strong>Material Connections</strong> (discounts, family relation, free trips) require disclosure even without direct payment.</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-foreground">3.</span>
                  <span>ASCI guidelines apply to all media formats including podcasts, video logs, and short-form posts.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
