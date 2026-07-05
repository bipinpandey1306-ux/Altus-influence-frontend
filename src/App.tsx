import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Influencers from "@/pages/influencers";
import InfluencerProfile from "@/pages/influencer-profile";
import StartCampaign from "@/pages/start-campaign";
import JoinInfluencer from "@/pages/join-influencer";
import EarningsCalculator from "@/pages/calculator";
import AsciGuidelines from "@/pages/asci-guidelines";
import AdminPanel from "@/pages/admin";
import AboutUs from "@/pages/about";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/influencers" component={Influencers} />
        <Route path="/influencers/:id" component={InfluencerProfile} />
        <Route path="/start-campaign" component={StartCampaign} />
        <Route path="/join-as-influencer" component={JoinInfluencer} />
        <Route path="/calculator" component={EarningsCalculator} />
        <Route path="/asci-guidelines" component={AsciGuidelines} />
        <Route path="/portal-admin" component={AdminPanel} />
        <Route path="/about" component={AboutUs} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
