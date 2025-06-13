import { useState, useEffect } from "react";

interface ResultsSummaryProps {
  totalScore: number;
  recommendation: {
    text: string;
    class: string;
  };
}

export function ResultsSummary({ totalScore, recommendation }: ResultsSummaryProps) {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setIsUpdated(true);
    const timer = setTimeout(() => setIsUpdated(false), 300);
    return () => clearTimeout(timer);
  }, [totalScore]);

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-black p-6">
        <h2 className="text-xl font-semibold text-black mb-6">
          Investment Summary
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-300">
            <div className={`text-3xl font-bold text-black mb-2 ${isUpdated ? 'score-updated' : ''}`}>
              {isNaN(totalScore) ? '0.0' : totalScore.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Total Score (0-100)</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-300">
            <div className="text-lg font-semibold mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                recommendation.class === 'success' ? 'bg-green-100 text-green-800' :
                recommendation.class === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {recommendation.text}
              </span>
            </div>
            <div className="text-sm text-gray-600">Investment Recommendation</div>
          </div>
        </div>
      </div>
    </section>
  );
}
