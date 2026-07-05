import { pgTable, text, integer, numeric, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const influencersTable = pgTable("influencers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  platform: text("platform").notNull(),
  category: text("category").notNull(),
  followers: integer("followers").notNull(),
  engagementRate: numeric("engagement_rate", { precision: 5, scale: 2 }).notNull(),
  location: text("location").notNull(),
  pricePerPostInr: numeric("price_per_post_inr", { precision: 12, scale: 2 }).notNull(),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("4.50"),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url").notNull().default(""),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertInfluencerSchema = createInsertSchema(influencersTable).omit({
  id: true,
  createdAt: true,
});
export type InsertInfluencer = z.infer<typeof insertInfluencerSchema>;
export type Influencer = typeof influencersTable.$inferSelect;
