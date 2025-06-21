import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CategoryScores, WeightConfiguration, CategoryDefinition } from "@shared/schema";

interface ScorecardGridProps {
  currentCompany: string;
  companyScores: CategoryScores;
  configuration: WeightConfiguration;
  categories: Record<string, { name: string; subcategories: string[] }>;
  onScoreChange: (category: string, index: number, value: number | null) => void;
}

export function ScorecardGrid({
  currentCompany,
  companyScores,
  configuration,
  categories,
  onScoreChange
}: ScorecardGridProps) {
  const getScoreColorClass = (score: number | undefined) => {
    if (typeof score !== 'number') return "bg-gray-100 border-gray-300";
    if (score <= 1) return "bg-red-100 border-red-300";
    if (score === 2 || score === 3) return "bg-yellow-100 border-yellow-300";
    if (score >= 4) return "bg-green-100 border-green-300";
    return "bg-gray-100 border-gray-300";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (!form) return;

      const inputs = Array.from(form.querySelectorAll('input[inputMode="numeric"]'));
      const currentIndex = inputs.indexOf(e.currentTarget);
      const nextInput = inputs[currentIndex + 1];

      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const relevantCategories = Object.entries(categories).filter(([categoryKey]) => 
    configuration.hasOwnProperty(categoryKey)
  );

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relevantCategories.map(([categoryKey, categoryDetails]) => {
        const weight = configuration[categoryKey as keyof typeof configuration];
        if (typeof weight !== 'number') return null;

        return (
          <Card key={categoryKey} className="flex flex-col bg-white rounded-lg shadow-sm">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base font-bold">{categoryDetails.name}</CardTitle>
              <span className="text-sm font-semibold bg-gray-200 rounded-full px-3 py-1">
                {weight}%
              </span>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {categoryDetails.subcategories.map((question: string, index: number) => (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-medium">{question}</label>
                    <Input
                      type="text"
                      maxLength={1}
                      inputMode="numeric"
                      placeholder="0-5"
                      value={companyScores?.[categoryKey as keyof CategoryScores]?.[index] ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          onScoreChange(categoryKey, index, null);
                          return;
                        }

                        const numValue = parseInt(value, 10);
                        if (
                          !isNaN(numValue) &&
                          value === numValue.toString() &&
                          numValue >= 0 &&
                          numValue <= 5
                        ) {
                          onScoreChange(categoryKey, index, numValue);
                        }
                      }}
                      onKeyDown={handleKeyDown}
                      className={`w-full text-center font-bold text-lg ${getScoreColorClass(companyScores?.[categoryKey as keyof CategoryScores]?.[index])}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </form>
  );
}
