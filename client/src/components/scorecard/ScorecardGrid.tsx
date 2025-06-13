import { CategoryCard } from "./CategoryCard";
import type { CategoryScores, WeightConfiguration, CategoryDefinition } from "@shared/schema";

interface ScorecardGridProps {
  currentCompany: string;
  companyScores: CategoryScores;
  configuration: WeightConfiguration;
  categories: Record<string, CategoryDefinition>;
  onScoreChange: (category: string, index: number, value: number) => void;
}

export function ScorecardGrid({
  currentCompany,
  companyScores,
  configuration,
  categories,
  onScoreChange
}: ScorecardGridProps) {
  // Filter categories based on the configuration (investment type)
  const relevantCategories = Object.entries(categories).filter(([categoryKey]) => {
    return configuration[categoryKey as keyof WeightConfiguration] !== undefined;
  });

  return (
    <main className="mb-8">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {relevantCategories.map(([categoryKey, categoryDef]) => (
          <CategoryCard
            key={categoryKey}
            categoryKey={categoryKey}
            categoryName={categoryDef.name}
            subcategories={categoryDef.subcategories}
            scores={companyScores[categoryKey as keyof CategoryScores] || [0, 0, 0, 0]}
            weight={configuration[categoryKey as keyof WeightConfiguration] || 0}
            onScoreChange={onScoreChange}
          />
        ))}
      </div>
    </main>
  );
}
