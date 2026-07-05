import { pgTable, text, integer, numeric, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const campaignsTable = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessName: text("business_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  productName: text("product_name").notNull(),
  promotionType: text("promotion_type").notNull(),
  targetAudience: text("target_audience").notNull(),
  budgetInr: numeric("budget_inr", { precision: 12, scale: 2 }).notNull(),
  durationDays: integer("duration_days").notNull(),
  platforms: text("platforms").array().notNull(),
  deliverables: text("deliverables").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCampaignSchema = createInsertSchema(campaignsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaignsTable.$inferSelect;
