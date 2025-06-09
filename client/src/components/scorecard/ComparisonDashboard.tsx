import { getRecommendation } from "@/lib/scorecard-utils";
import type { CategoryScores } from "@shared/schema";

interface ComparisonDashboardProps {
  companies: string[];
  currentCompany: string;
  currentConfig: string;
  companyScores: Record<string, CategoryScores>;
  calculateTotalScore: (companyName: string, configName: string) => number;
}

export function ComparisonDashboard({
  companies,
  currentCompany,
  currentConfig,
  companyScores,
  calculateTotalScore
}: ComparisonDashboardProps) {
  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Portfolio Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Score</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((companyName) => {
                const totalScore = calculateTotalScore(companyName, currentConfig);
                const recommendation = getRecommendation(totalScore);
                const isCurrentCompany = companyName === currentCompany;
                
                return (
                  <tr 
                    key={companyName}
                    className={isCurrentCompany ? 'bg-primary-50 font-semibold' : ''}
                  >
                    <td className="font-medium">{companyName}</td>
                    <td className="text-lg font-semibold text-primary-600">
                      {totalScore.toFixed(1)}
                    </td>
                    <td>
                      <span className={`status-badge ${recommendation.class}`}>
                        {recommendation.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
