import { Router, type IRouter } from "express";
import { eq, and, ilike, or } from "drizzle-orm";
import { db, influencersTable } from "@workspace/db";
import {
  ApplyAsInfluencerBody,
  ListInfluencersQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function serializeInfluencer(row: typeof influencersTable.$inferSelect) {
  return {
    id: row.id,
    name: row.name,
    platform: row.platform,
    category: row.category,
    followers: row.followers,
    engagementRate: Number(row.engagementRate),
    location: row.location,
    pricePerPostInr: Number(row.pricePerPostInr),
    rating: Number(row.rating),
    bio: row.bio,
    avatarUrl: row.avatarUrl,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

router.get("/influencers", async (req, res) => {
  const parsed = ListInfluencersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }
  const { platform, category, search } = parsed.data;

  const conditions = [];
  if (platform) conditions.push(eq(influencersTable.platform, platform));
  if (category) conditions.push(eq(influencersTable.category, category));
  if (search) {
    conditions.push(
      or(
        ilike(influencersTable.name, `%${search}%`),
        ilike(influencersTable.bio, `%${search}%`),
      ),
    );
  }

  const rows = await db
    .select()
    .from(influencersTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json(rows.map(serializeInfluencer));
});

router.post("/influencers", async (req, res) => {
  const parsed = ApplyAsInfluencerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid influencer application", details: parsed.error.issues });
    return;
  }

  const [row] = await db
    .insert(influencersTable)
    .values({
      name: parsed.data.name,
      platform: parsed.data.platform,
      category: parsed.data.category,
      followers: parsed.data.followers,
      engagementRate: parsed.data.engagementRate !== undefined ? String(parsed.data.engagementRate) : "3.50",
      location: parsed.data.location,
      pricePerPostInr: String(parsed.data.pricePerPostInr),
      bio: parsed.data.bio,
      avatarUrl: parsed.data.avatarUrl ?? "",
      status: "pending",
    })
    .returning();

  res.status(201).json(serializeInfluencer(row!));
});

router.get("/influencers/:id", async (req, res) => {
  const [row] = await db
    .select()
    .from(influencersTable)
    .where(eq(influencersTable.id, req.params.id!));

  if (!row) {
    res.status(404).json({ error: "Influencer not found" });
    return;
  }

  res.json(serializeInfluencer(row));
});

export default router;
