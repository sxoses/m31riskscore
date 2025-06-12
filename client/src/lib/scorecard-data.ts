import type { ScorecardData } from "@shared/schema";

export const scorecardData: ScorecardData = {
  configurations: {
    "Ventures": {
      team: 35,
      technology: 20,
      market: 20,
      blockchain: 5,
      business: 15,
      risk: 5
    },
    "DeFi": {
      team: 25,
      technology: 20,
      market: 25,
      blockchain: 10,
      business: 15,
      risk: 5
    },
    "Web3": {
      technical: 20,
      team: 20,
      business: 15,
      market: 15,
      risk: 10,
      xfactor: 20
    },
    "PLF": {
      team: 30,
      technology: 15,
      market: 25,
      blockchain: 10,
      business: 15,
      risk: 5
    }
  },
  categories: {
    team: {
      name: "Team & Vision Alignment",
      subcategories: ["Core Team", "Vision and values", "Leadership Quality", "Team Cohesion"]
    },
    technology: {
      name: "Technology",
      subcategories: ["Innovation", "Scalability", "Security", "Technical Feasibility"]
    },
    technical: {
      name: "Technical Foundation",
      subcategories: ["Security", "Technology assessment", "Development activity", "Architecture"]
    },
    market: {
      name: "Market & Adoption",
      subcategories: ["Market opportunity", "Traction", "User Growth", "Customer Fit"]
    },
    blockchain: {
      name: "Blockchain Factors",
      subcategories: ["Decentralization Value", "Tokenomics", "Network Effects", "Regulatory Compliance"]
    },
    business: {
      name: "Business Model/Tokenomics & Economics",
      subcategories: ["Token utility", "Supply dynamics", "Sustainability", "Revenue Model"]
    },
    risk: {
      name: "Risk & Exit",
      subcategories: ["Regulatory", "Technical", "Exit Potential", "Market Risk"]
    },
    xfactor: {
      name: "X Factor",
      subcategories: ["Quick email/message responder", "Open/transparent with metrics", "Open/transparent with failures", "On Adderall"]
    }
  },
  companies: {
    BTC: {
      team: [5, 5, 5, 5],
      technology: [5, 5, 5, 5],
      technical: [5, 5, 5, 5],
      market: [5, 5, 5, 5],
      blockchain: [5, 5, 5, 5],
      business: [5, 5, 5, 5],
      risk: [5, 5, 5, 5],
      xfactor: [5, 5, 5, 5]
    },
    SQD: {
      team: [4, 4, 4, 4],
      technology: [4, 4, 4, 4],
      technical: [4, 4, 4, 4],
      market: [4, 4, 4, 4],
      blockchain: [4, 4, 4, 4],
      business: [4, 4, 4, 4],
      risk: [4, 4, 4, 4],
      xfactor: [4, 4, 4, 4]
    },
    xAI: {
      team: [5, 4, 5, 4],
      technology: [5, 4, 5, 4],
      technical: [5, 4, 5, 4],
      market: [5, 4, 5, 4],
      blockchain: [5, 4, 5, 4],
      business: [5, 4, 5, 4],
      risk: [5, 4, 5, 4],
      xfactor: [5, 4, 5, 4]
    },
    Bless: {
      team: [4, 4, 4, 4],
      technology: [4, 4, 4, 4],
      technical: [4, 4, 4, 4],
      market: [4, 4, 4, 4],
      blockchain: [4, 4, 4, 4],
      business: [4, 4, 4, 4],
      risk: [4, 4, 4, 4],
      xfactor: [4, 4, 4, 4]
    }
  }
};
