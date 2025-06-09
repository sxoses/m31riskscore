import { 
  companies, 
  configurations, 
  type Company, 
  type Configuration, 
  type InsertCompany, 
  type InsertConfiguration 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Company operations
  getCompany(id: number): Promise<Company | undefined>;
  getAllCompanies(): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: number, company: InsertCompany): Promise<Company | undefined>;
  deleteCompany(id: number): Promise<boolean>;

  // Configuration operations
  getConfiguration(id: number): Promise<Configuration | undefined>;
  getAllConfigurations(): Promise<Configuration[]>;
  createConfiguration(configuration: InsertConfiguration): Promise<Configuration>;
  updateConfiguration(id: number, configuration: InsertConfiguration): Promise<Configuration | undefined>;
  deleteConfiguration(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getCompany(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company || undefined;
  }

  async getAllCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db
      .insert(companies)
      .values(insertCompany)
      .returning();
    return company;
  }

  async updateCompany(id: number, insertCompany: InsertCompany): Promise<Company | undefined> {
    const [company] = await db
      .update(companies)
      .set(insertCompany)
      .where(eq(companies.id, id))
      .returning();
    return company || undefined;
  }

  async deleteCompany(id: number): Promise<boolean> {
    const result = await db.delete(companies).where(eq(companies.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getConfiguration(id: number): Promise<Configuration | undefined> {
    const [configuration] = await db.select().from(configurations).where(eq(configurations.id, id));
    return configuration || undefined;
  }

  async getAllConfigurations(): Promise<Configuration[]> {
    return await db.select().from(configurations);
  }

  async createConfiguration(insertConfiguration: InsertConfiguration): Promise<Configuration> {
    const [configuration] = await db
      .insert(configurations)
      .values(insertConfiguration)
      .returning();
    return configuration;
  }

  async updateConfiguration(id: number, insertConfiguration: InsertConfiguration): Promise<Configuration | undefined> {
    const [configuration] = await db
      .update(configurations)
      .set(insertConfiguration)
      .where(eq(configurations.id, id))
      .returning();
    return configuration || undefined;
  }

  async deleteConfiguration(id: number): Promise<boolean> {
    const result = await db.delete(configurations).where(eq(configurations.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export const storage = new DatabaseStorage();
