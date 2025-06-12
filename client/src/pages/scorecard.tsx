import { useState, useEffect } from "react";
import { Header } from "@/components/scorecard/Header";
import { WeightVisualization } from "@/components/scorecard/WeightVisualization";
import { ScorecardGrid } from "@/components/scorecard/ScorecardGrid";
import { ResultsSummary } from "@/components/scorecard/ResultsSummary";
import { ComparisonDashboard } from "@/components/scorecard/ComparisonDashboard";
import { DecisionThresholds } from "@/components/scorecard/DecisionThresholds";
import { scorecardData } from "@/lib/scorecard-data";
import { calculateCategoryScore, calculateWeightedScore, getRecommendation } from "@/lib/scorecard-utils";
import type { CategoryScores } from "@shared/schema";

export default function Scorecard() {
  const [currentConfig, setCurrentConfig] = useState("Ventures");
  const [currentCompany, setCurrentCompany] = useState("BTC");
  const [companyScores, setCompanyScores] = useState<Record<string, CategoryScores>>(
    JSON.parse(JSON.stringify(scorecardData.companies))
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleConfigChange = (configName: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentConfig(configName);
      setIsLoading(false);
    }, 50);
  };

  const handleCompanyChange = (companyName: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentCompany(companyName);
      setIsLoading(false);
    }, 50);
  };

  const handleScoreChange = (category: string, index: number, value: number) => {
    setCompanyScores(prev => ({
      ...prev,
      [currentCompany]: {
        ...prev[currentCompany],
        [category as keyof CategoryScores]: prev[currentCompany][category as keyof CategoryScores].map((score: number, i: number) => 
          i === index ? value : score
        )
      }
    }));
  };

  const calculateTotalScore = (companyName: string, configName: string) => {
    const config = scorecardData.configurations[configName];
    const companyData = companyScores[companyName];
    let totalWeightedScore = 0;

    Object.keys(companyData).forEach(category => {
      const categoryScore = calculateCategoryScore(companyData[category as keyof CategoryScores]);
      const weight = config[category as keyof typeof config];
      const weightedScore = calculateWeightedScore(categoryScore, weight);
      totalWeightedScore += weightedScore;
    });

    return (totalWeightedScore / 5) * 100; // Convert to 0-100 scale
  };

  const currentTotalScore = calculateTotalScore(currentCompany, currentConfig);
  const currentRecommendation = getRecommendation(currentTotalScore);

  return (
    <div className={`scorecard-container ${isLoading ? 'loading' : ''}`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header
          currentConfig={currentConfig}
          currentCompany={currentCompany}
          onConfigChange={handleConfigChange}
          onCompanyChange={handleCompanyChange}
          configurations={Object.keys(scorecardData.configurations)}
          companies={Object.keys(companyScores)}
        />

        <WeightVisualization
          currentConfig={currentConfig}
          configuration={scorecardData.configurations[currentConfig]}
          categories={scorecardData.categories}
        />

        <ScorecardGrid
          currentCompany={currentCompany}
          companyScores={companyScores[currentCompany]}
          configuration={scorecardData.configurations[currentConfig]}
          categories={scorecardData.categories}
          onScoreChange={handleScoreChange}
        />

        <ResultsSummary
          totalScore={currentTotalScore}
          recommendation={currentRecommendation}
        />

        <ComparisonDashboard
          companies={Object.keys(companyScores)}
          currentCompany={currentCompany}
          currentConfig={currentConfig}
          companyScores={companyScores}
          calculateTotalScore={calculateTotalScore}
        />

        <DecisionThresholds />
      </div>
    </div>
  );
}
