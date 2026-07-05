import { Router, type IRouter } from "express";
import { db, campaignsTable } from "@workspace/db";
import { CreateCampaignBody } from "@workspace/api-zod";

const router: IRouter = Router();

function serializeCampaign(row: typeof campaignsTable.$inferSelect) {
  return {
    id: row.id,
    businessName: row.businessName,
    contactEmail: row.contactEmail,
    contactPhone: row.contactPhone,
    productName: row.productName,
    promotionType: row.promotionType,
    targetAudience: row.targetAudience,
    budgetInr: Number(row.budgetInr),
    durationDays: row.durationDays,
    platforms: row.platforms,
    deliverables: row.deliverables,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

router.get("/campaigns", async (_req, res) => {
  const rows = await db.select().from(campaignsTable);
  res.json(rows.map(serializeCampaign));
});

router.post("/campaigns", async (req, res) => {
  const parsed = CreateCampaignBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid campaign request", details: parsed.error.issues });
    return;
  }

  const [row] = await db
    .insert(campaignsTable)
    .values({
      businessName: parsed.data.businessName,
      contactEmail: parsed.data.contactEmail,
      contactPhone: parsed.data.contactPhone,
      productName: parsed.data.productName,
      promotionType: parsed.data.promotionType,
      targetAudience: parsed.data.targetAudience,
      budgetInr: String(parsed.data.budgetInr),
      durationDays: parsed.data.durationDays,
      platforms: parsed.data.platforms,
      deliverables: parsed.data.deliverables,
      status: "new",
    })
    .returning();

  res.status(201).json(serializeCampaign(row!));
});

export default router;
