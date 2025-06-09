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
  return (
    <main className="mb-8">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(categories).map(([categoryKey, categoryDef]) => (
          <CategoryCard
            key={categoryKey}
            categoryKey={categoryKey}
            categoryName={categoryDef.name}
            subcategories={categoryDef.subcategories}
            scores={companyScores[categoryKey as keyof CategoryScores]}
            weight={configuration[categoryKey as keyof WeightConfiguration]}
            onScoreChange={onScoreChange}
          />
        ))}
      </div>
    </main>
  );
}
