import { 
  companies, 
  configurations, 
  type Company, 
  type Configuration, 
  type InsertCompany, 
  type InsertConfiguration 
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private companies: Map<number, Company>;
  private configurations: Map<number, Configuration>;
  private currentCompanyId: number;
  private currentConfigurationId: number;

  constructor() {
    this.companies = new Map();
    this.configurations = new Map();
    this.currentCompanyId = 1;
    this.currentConfigurationId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize sample companies
    const sampleCompanies = [
      {
        name: "TechCorp",
        scores: {
          team: [4, 3, 5, 4],
          technology: [4, 3, 4, 4],
          market: [5, 4, 3, 4],
          blockchain: [4, 3, 4, 3],
          business: [3, 2, 3, 3],
          risk: [3, 2, 4, 3]
        }
      },
      {
        name: "BlockchainCo",
        scores: {
          team: [5, 4, 4, 5],
          technology: [5, 4, 5, 4],
          market: [3, 3, 4, 3],
          blockchain: [5, 5, 4, 4],
          business: [2, 2, 2, 2],
          risk: [2, 3, 3, 2]
        }
      },
      {
        name: "GrowthStart",
        scores: {
          team: [3, 3, 3, 4],
          technology: [3, 4, 3, 3],
          market: [5, 5, 2, 5],
          blockchain: [2, 2, 3, 4],
          business: [4, 4, 4, 3],
          risk: [4, 3, 4, 3]
        }
      }
    ];

    sampleCompanies.forEach(company => {
      const id = this.currentCompanyId++;
      this.companies.set(id, { ...company, id });
    });

    // Initialize sample configurations
    const sampleConfigurations = [
      {
        name: "Conservative VC",
        weights: { team: 30, technology: 15, market: 25, blockchain: 10, business: 15, risk: 5 },
        description: "Proven teams, lower risk"
      },
      {
        name: "Growth-Focused VC",
        weights: { team: 20, technology: 25, market: 30, blockchain: 5, business: 15, risk: 5 },
        description: "Large market potential"
      },
      {
        name: "Blockchain-First VC",
        weights: { team: 20, technology: 30, market: 15, blockchain: 25, business: 8, risk: 2 },
        description: "Blockchain innovation"
      },
      {
        name: "Early-Stage VC",
        weights: { team: 35, technology: 20, market: 20, blockchain: 5, business: 15, risk: 5 },
        description: "Founding team quality"
      },
      {
        name: "Strategic Corporate VC",
        weights: { team: 25, technology: 20, market: 25, blockchain: 10, business: 15, risk: 5 },
        description: "Strategic alignment"
      }
    ];

    sampleConfigurations.forEach(config => {
      const id = this.currentConfigurationId++;
      this.configurations.set(id, { ...config, id });
    });
  }

  // Company operations
  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = { ...insertCompany, id };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: number, insertCompany: InsertCompany): Promise<Company | undefined> {
    const existingCompany = this.companies.get(id);
    if (!existingCompany) {
      return undefined;
    }
    
    const updatedCompany: Company = { ...insertCompany, id };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }

  async deleteCompany(id: number): Promise<boolean> {
    return this.companies.delete(id);
  }

  // Configuration operations
  async getConfiguration(id: number): Promise<Configuration | undefined> {
    return this.configurations.get(id);
  }

  async getAllConfigurations(): Promise<Configuration[]> {
    return Array.from(this.configurations.values());
  }

  async createConfiguration(insertConfiguration: InsertConfiguration): Promise<Configuration> {
    const id = this.currentConfigurationId++;
    const configuration: Configuration = { ...insertConfiguration, id };
    this.configurations.set(id, configuration);
    return configuration;
  }

  async updateConfiguration(id: number, insertConfiguration: InsertConfiguration): Promise<Configuration | undefined> {
    const existingConfiguration = this.configurations.get(id);
    if (!existingConfiguration) {
      return undefined;
    }
    
    const updatedConfiguration: Configuration = { ...insertConfiguration, id };
    this.configurations.set(id, updatedConfiguration);
    return updatedConfiguration;
  }

  async deleteConfiguration(id: number): Promise<boolean> {
    return this.configurations.delete(id);
  }
}

export const storage = new MemStorage();
