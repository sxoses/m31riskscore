import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  scores: jsonb("scores").notNull(), // Store category scores as JSON
});

export const configurations = pgTable("configurations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  weights: jsonb("weights").notNull(), // Store weight configuration as JSON
  description: text("description").default(""),
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
});

export const insertConfigurationSchema = createInsertSchema(configurations).omit({
  id: true,
});

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;
export type InsertConfiguration = z.infer<typeof insertConfigurationSchema>;
export type Configuration = typeof configurations.$inferSelect;

// Type definitions for scorecard data structures
export interface CategoryScores {
  team: number[];
  technology: number[];
  market: number[];
  blockchain: number[];
  business: number[];
  risk: number[];
  [key: string]: number[]; // Index signature for dynamic access
}

export interface WeightConfiguration {
  team: number;
  technology: number;
  market: number;
  blockchain: number;
  business: number;
  risk: number;
}

export interface CategoryDefinition {
  name: string;
  subcategories: string[];
}

export interface ScorecardData {
  configurations: Record<string, WeightConfiguration>;
  categories: Record<string, CategoryDefinition>;
  companies: Record<string, CategoryScores>;
}
