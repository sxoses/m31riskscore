import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/scorecard/Header";
import { ScorecardGrid } from "@/components/scorecard/ScorecardGrid";
import { ResultsSummary } from "@/components/scorecard/ResultsSummary";
import { ComparisonDashboard } from "@/components/scorecard/ComparisonDashboard";
import { DecisionThresholds } from "@/components/scorecard/DecisionThresholds";
import { scorecardData } from "@/lib/scorecard-data";
import { calculateCategoryScore, calculateWeightedScore, getRecommendation } from "@/lib/scorecard-utils";
import type { CategoryScores } from "@shared/schema";

export default function Scorecard() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const companyFromUrl = urlParams.get('company') || 'Current Company';
  
  const [currentConfig, setCurrentConfig] = useState("Web3");
  const [currentCompany, setCurrentCompany] = useState("Current Company");
  const [companyName, setCompanyName] = useState(companyFromUrl);
  const [selectedPortCo, setSelectedPortCo] = useState<string | null>(null);
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
    if (companyName !== "Current Company") {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentCompany(companyName);
        setIsLoading(false);
      }, 50);
    }
  };

  const handleCompanyNameChange = (name: string) => {
    setCompanyName(name);
  };

  const handlePortCoSelect = (company: string) => {
    setSelectedPortCo(company);
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
    if (!companyData || !config) return 0;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;

    // Only calculate for categories that exist in the current configuration
    Object.keys(config).forEach(category => {
      const weight = config[category as keyof typeof config];
      if (weight && companyData[category as keyof CategoryScores]) {
        const categoryScore = calculateCategoryScore(companyData[category as keyof CategoryScores]);
        const weightedScore = calculateWeightedScore(categoryScore, weight);
        totalWeightedScore += weightedScore;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  };

  const currentTotalScore = calculateTotalScore(currentCompany, currentConfig);
  const currentRecommendation = getRecommendation(currentTotalScore);

  return (
    <div className={`scorecard-container ${isLoading ? 'loading' : ''}`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header
          currentConfig={currentConfig}
          companyName={companyName}
          onConfigChange={handleConfigChange}
          configurations={Object.keys(scorecardData.configurations)}
        />



        <ScorecardGrid
          currentCompany={currentCompany}
          companyScores={companyScores[currentCompany] || companyScores["Current Company"]}
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
          selectedPortCo={selectedPortCo}
          onPortCoSelect={handlePortCoSelect}
        />

        <DecisionThresholds />
      </div>
    </div>
  );
}
