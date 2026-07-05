import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Influencers from "@/pages/influencers";
import InfluencerProfile from "@/pages/influencer-profile";
import StartCampaign from "@/pages/start-campaign";
// Missing JoinInfluencer right now, I'll create a stub or inline it to be fast.
import JoinInfluencer from "@/pages/join-influencer";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/influencers" component={Influencers} />
        <Route path="/influencers/:id" component={InfluencerProfile} />
        <Route path="/start-campaign" component={StartCampaign} />
        <Route path="/join-as-influencer" component={JoinInfluencer} />
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
