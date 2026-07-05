import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db, influencersTable, campaignsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/stats/summary", async (_req, res) => {
  const [influencerStats] = await db
    .select({
      totalInfluencers: sql<number>`count(*)::int`,
      avgEngagementRate: sql<number>`coalesce(avg(${influencersTable.engagementRate}), 0)::float`,
    })
    .from(influencersTable);

  const [campaignStats] = await db
    .select({
      totalCampaigns: sql<number>`count(*)::int`,
      totalBusinesses: sql<number>`count(distinct ${campaignsTable.contactEmail})::int`,
      totalPayoutsInr: sql<number>`coalesce(sum(${campaignsTable.budgetInr}), 0)::float`,
    })
    .from(campaignsTable);

  res.json({
    totalInfluencers: influencerStats?.totalInfluencers ?? 0,
    totalBusinesses: campaignStats?.totalBusinesses ?? 0,
    totalCampaigns: campaignStats?.totalCampaigns ?? 0,
    totalPayoutsInr: campaignStats?.totalPayoutsInr ?? 0,
    avgEngagementRate: influencerStats?.avgEngagementRate ?? 0,
  });
});

export default router;
