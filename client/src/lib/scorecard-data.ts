import type { ScorecardData } from "@shared/schema";

export const scorecardData: ScorecardData = {
  configurations: {
    "Conservative VC": {
      team: 30,
      technology: 15,
      market: 25,
      blockchain: 10,
      business: 15,
      risk: 5
    },
    "Growth-Focused VC": {
      team: 20,
      technology: 25,
      market: 30,
      blockchain: 5,
      business: 15,
      risk: 5
    },
    "Blockchain-First VC": {
      team: 20,
      technology: 30,
      market: 15,
      blockchain: 25,
      business: 8,
      risk: 2
    },
    "Early-Stage VC": {
      team: 35,
      technology: 20,
      market: 20,
      blockchain: 5,
      business: 15,
      risk: 5
    },
    "Strategic Corporate VC": {
      team: 25,
      technology: 20,
      market: 25,
      blockchain: 10,
      business: 15,
      risk: 5
    }
  },
  categories: {
    team: {
      name: "Team",
      subcategories: ["Team Experience", "Track Record", "Technical Expertise", "Team Cohesion"]
    },
    technology: {
      name: "Technology",
      subcategories: ["Innovation", "Scalability", "Security", "Technical Feasibility"]
    },
    market: {
      name: "Market Opportunity",
      subcategories: ["Market Size", "Market Growth", "Competitive Landscape", "Customer Fit"]
    },
    blockchain: {
      name: "Blockchain Factors",
      subcategories: ["Decentralization Value", "Tokenomics", "Network Effects", "Regulatory Compliance"]
    },
    business: {
      name: "Business Model",
      subcategories: ["Revenue Model", "Customer Acquisition", "Partnerships", "Traction"]
    },
    risk: {
      name: "Risk & Exit",
      subcategories: ["Market Risk", "Technology Risk", "Exit Potential", "Regulatory Risk"]
    }
  },
  companies: {
    TechCorp: {
      team: [4, 3, 5, 4],
      technology: [4, 3, 4, 4],
      market: [5, 4, 3, 4],
      blockchain: [4, 3, 4, 3],
      business: [3, 2, 3, 3],
      risk: [3, 2, 4, 3]
    },
    BlockchainCo: {
      team: [5, 4, 4, 5],
      technology: [5, 4, 5, 4],
      market: [3, 3, 4, 3],
      blockchain: [5, 5, 4, 4],
      business: [2, 2, 2, 2],
      risk: [2, 3, 3, 2]
    },
    GrowthStart: {
      team: [3, 3, 3, 4],
      technology: [3, 4, 3, 3],
      market: [5, 5, 2, 5],
      blockchain: [2, 2, 3, 4],
      business: [4, 4, 4, 3],
      risk: [4, 3, 4, 3]
    }
  }
};
