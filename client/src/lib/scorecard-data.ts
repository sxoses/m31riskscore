import type { ScorecardData, CategoryScores } from "@shared/schema";

export const scorecardData: ScorecardData = {
  configurations: {
    "Ventures": {
      team: 25,
      technology: 20,
      market: 20,
      blockchain: 15,
      business: 15,
      risk: 5
    },
    "Liquid": {
      team: 15,
      technology: 15,
      market: 20,
      blockchain: 15,
      business: 20,
      risk: 15
    },
    "PLF": {
      terms: 50,
      risk_factors: 50,
    }
  },
  categories: {
    team: {
      name: "Team",
      subcategories: ["Team Experience", "Track Record", "Technical Expertise", "Team Cohesion", "Motivation & Grit"]
    },
    blockchain: {
      name: "Blockchain Factors",
      subcategories: ["Decentralization Value", "Tokenomics", "Network Effects", "Regulatory Compliance"]
    },
    business: {
      name: "Business Model & Traction",
      subcategories: ["Revenue Model", "Traction", "Go-to-Market Strategy", "Unit Economics", "Channel partners / distribution"]
    },
    technology: {
      name: "Technology",
      subcategories: ["Innovation", "Scalability", "Security", "Technical Feasibility", "Differentiation", "Moat", "PMF", "Roadmap/feasibility"]
    },
    market: {
      name: "Market Opportunity",
      subcategories: ["Market Size", "Market Growth", "Competitive Landscape", "Customer Fit", "Web3 competition", "Web2 competition (disruptability)"]
    },
    risk: {
      name: "Risk & Exit Potential",
      subcategories: ["Execution Risk", "Regulatory Risk", "Exit Potential", "Macro Risk", "Low liquidity", "Potential asset class conflict of interest"]
    },
    terms: {
      name: "Terms",
      subcategories: ["Duration", "Allocation", "Underlying Yield"]
    },
    risk_factors: {
      name: "Risk Factors",
      subcategories: ["Peg Risk", "Idiosyncratic Risk", "Centralization Risk", "SC Risk"]
    }
  },
  companies: {
    BTC: {
      team: [5, 5, 5, 5, 5],
      technology: [5, 5, 5, 5, 5, 5, 5, 5],
      market: [5, 5, 5, 5, 5, 5],
      blockchain: [5, 5, 5, 5],
      business: [5, 5, 5, 5, 5],
      risk: [5, 5, 5, 5, 5, 5],
      terms: [5, 5, 5],
      risk_factors: [5, 5, 5, 5]
    },
    SQD: {
      team: [4, 4, 4, 4, 4],
      technology: [4, 4, 4, 4, 4, 4, 4, 4],
      market: [4, 4, 4, 4, 4, 4],
      blockchain: [4, 4, 4, 4],
      business: [4, 4, 4, 4, 4],
      risk: [4, 4, 4, 4, 4, 4],
      terms: [4, 4, 4],
      risk_factors: [4, 4, 4, 4]
    },
    xAI: {
      team: [5, 4, 5, 4, 5],
      technology: [5, 4, 5, 4, 5, 4, 5, 4],
      market: [5, 4, 5, 4, 5, 4],
      blockchain: [4, 4, 4, 4],
      business: [5, 4, 5, 4, 5],
      risk: [5, 4, 5, 4, 5, 4],
      terms: [5, 4, 5],
      risk_factors: [5, 4, 5, 4]
    },
    Bless: {
      team: [4, 4, 4, 4, 4],
      technology: [4, 4, 4, 4, 4, 4, 4, 4],
      market: [4, 4, 4, 4, 4, 4],
      blockchain: [4, 4, 4, 4],
      business: [4, 4, 4, 4, 4],
      risk: [4, 4, 4, 4, 4, 4],
      terms: [4, 4, 4],
      risk_factors: [4, 4, 4, 4]
    },
    "Current Company": {
      team: [3, 3, 3, 3, 3],
      technology: [3, 3, 3, 3, 3, 3, 3, 3],
      market: [3, 3, 3, 3, 3, 3],
      blockchain: [3, 3, 3, 3],
      business: [3, 3, 3, 3, 3],
      risk: [3, 3, 3, 3, 3, 3],
      terms: [3, 3, 3],
      risk_factors: [3, 3, 3, 3]
    }
  }
};

export const createBlankScores = (): CategoryScores => {
  const blankScores: Partial<CategoryScores> = {};
  for (const categoryKey in scorecardData.categories) {
    if (Object.prototype.hasOwnProperty.call(scorecardData.categories, categoryKey)) {
      const category = scorecardData.categories[categoryKey as keyof typeof scorecardData.categories];
      blankScores[categoryKey as keyof CategoryScores] = Array(category.subcategories.length).fill(undefined);
    }
  }
  return blankScores as CategoryScores;
};
