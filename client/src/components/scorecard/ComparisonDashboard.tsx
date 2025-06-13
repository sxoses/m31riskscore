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
  // Static scores as requested
  const staticScores = {
    BTC: 95,
    SQD: 85,
    xAI: 90,
    Bless: 81
  };

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-black p-6">
        <h2 className="text-xl font-semibold text-black mb-6">
          Portfolio Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-semibold text-black">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {companies.filter(company => company !== "Current Company").map((companyName) => {
                const staticScore = staticScores[companyName as keyof typeof staticScores] || 0;
                const recommendation = getRecommendation(staticScore);
                
                return (
                  <tr 
                    key={companyName}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-black">{companyName}</td>
                    <td className="py-3 px-4 text-lg font-semibold text-black">
                      {staticScore}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        recommendation.class === 'success' ? 'bg-green-100 text-green-800' :
                        recommendation.class === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
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
