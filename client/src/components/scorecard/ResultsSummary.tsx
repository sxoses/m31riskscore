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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Investment Summary
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className={`text-3xl font-bold text-primary-600 mb-2 ${isUpdated ? 'score-updated' : ''}`}>
              {totalScore.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Total Score (0-100)</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold mb-2">
              <span className={`status-badge ${recommendation.class}`}>
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
