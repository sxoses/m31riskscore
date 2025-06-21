import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/scorecard/Header";
import { ScorecardGrid } from "@/components/scorecard/ScorecardGrid";
import { DecisionThresholds } from "@/components/scorecard/DecisionThresholds";
import { XFactors } from "@/components/scorecard/XFactors";
import { scorecardData, createBlankScores } from "@/lib/scorecard-data";
import { calculateCategoryScore, calculateWeightedScore, getRecommendation } from "@/lib/scorecard-utils";
import type { CategoryScores } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Scorecard() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const companyFromUrl = urlParams.get('company') || '';
  
  const [currentConfig, setCurrentConfig] = useState("Ventures");
  const [currentCompany, setCurrentCompany] = useState("Current Company");
  const [companyName, setCompanyName] = useState(companyFromUrl);
  const [selectedPortCo, setSelectedPortCo] = useState<string | null>(null);
  const [companyScores, setCompanyScores] = useState<Record<string, CategoryScores>>(() => {
    const initialScores = JSON.parse(JSON.stringify(scorecardData.companies));
    initialScores["Current Company"] = createBlankScores();
    return initialScores;
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleConfigChange = (configName: string) => {
    setIsLoading(true);
    setCompanyScores(prev => ({
      ...prev,
      ["Current Company"]: createBlankScores(),
    }));
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

  const handleScoreChange = (category: string, index: number, value: number | null) => {
    setCompanyScores(prev => {
      const newScores = { ...prev[currentCompany] };
      const categoryScores: (number | undefined)[] = [...(newScores[category as keyof CategoryScores] || [])];
      categoryScores[index] = value === null ? undefined : value;
      newScores[category as keyof CategoryScores] = categoryScores;
      return { ...prev, [currentCompany]: newScores };
    });
  };

  const calculateTotalScore = (companyName: string, configName: string) => {
    const config = scorecardData.configurations[configName];
    const companyData = companyScores[companyName];
    if (!companyData || !config) return 0;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;

    Object.keys(config).forEach(category => {
      const weight = config[category as keyof typeof config];
      if (typeof weight === 'number' && weight > 0 && companyData[category as keyof CategoryScores]) {
        const categoryScore = calculateCategoryScore(companyData[category as keyof CategoryScores] as (number | undefined)[]);
        totalWeightedScore += categoryScore * (weight / 100);
        totalWeight += weight;
      }
    });

    if (totalWeight === 0) return 0;
    // Since totalWeight should sum to 100, we can just return totalWeightedScore.
    // The division is a safeguard in case weights don't sum to 100.
    return totalWeightedScore / (totalWeight / 100);
  };

  const getRecommendationClass = (rec: string) => {
    switch (rec) {
      case "Strong Buy":
        return "bg-green-100 text-green-800";
      case "Consider":
        return "bg-yellow-100 text-yellow-800";
      case "Hold":
        return "bg-blue-100 text-blue-800";
      case "Pass":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const currentTotalScore = calculateTotalScore(currentCompany, currentConfig);
  const currentRecommendation = getRecommendation(currentTotalScore);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header
          currentConfig={currentConfig}
          companyName={companyName}
          onConfigChange={handleConfigChange}
          onCompanyNameChange={handleCompanyNameChange}
          configurations={["Ventures", "Liquid", "PLF"]}
        />

        <div className="rounded-lg p-6 mb-8 bg-white shadow-sm">
          <h2 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-4">INVESTMENT SUMMARY</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm rounded-lg flex flex-col justify-center items-center py-6">
              <p className="text-6xl font-light text-gray-800">{currentTotalScore.toFixed(1)}</p>
              <p className="text-sm text-gray-500 mt-2">Total Score (0-100)</p>
            </Card>
            <Card className="shadow-sm rounded-lg flex flex-col justify-center items-center py-6">
              <span className={`px-3 py-1 text-sm rounded-full font-semibold ${getRecommendationClass(currentRecommendation)}`}>
                {currentRecommendation}
              </span>
              <p className="text-sm text-gray-500 mt-2">Investment Recommendation</p>
            </Card>
            <DecisionThresholds />
          </div>
        </div>

        <ScorecardGrid
          currentCompany={currentCompany}
          companyScores={companyScores[currentCompany] || companyScores["Current Company"]}
          configuration={scorecardData.configurations[currentConfig]}
          categories={scorecardData.categories}
          onScoreChange={handleScoreChange}
        />

        <XFactors />
      </div>
    </div>
  );
}
