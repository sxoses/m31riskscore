import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateCategoryScore, calculateWeightedScore } from "@/lib/scorecard-utils";

interface CategoryCardProps {
  categoryKey: string;
  categoryName: string;
  subcategories: string[];
  scores: number[];
  weight: number;
  onScoreChange: (category: string, index: number, value: number) => void;
}

const scoreOptions = [
  { value: "0", label: "0 - Poor" },
  { value: "1", label: "1 - Weak" },
  { value: "2", label: "2 - Below Average" },
  { value: "3", label: "3 - Average" },
  { value: "4", label: "4 - Strong" },
  { value: "5", label: "5 - Exceptional" }
];

export function CategoryCard({
  categoryKey,
  categoryName,
  subcategories,
  scores,
  weight,
  onScoreChange
}: CategoryCardProps) {
  const [isUpdated, setIsUpdated] = useState(false);

  const categoryScore = calculateCategoryScore(scores);
  const weightedScore = calculateWeightedScore(categoryScore, weight);

  const handleScoreChange = (index: number, value: string) => {
    onScoreChange(categoryKey, index, parseInt(value));
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 300);
  };

  return (
    <div className="category-card" data-category={categoryKey}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{categoryName}</h3>
        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
          {weight}%
        </span>
      </div>
      
      <div className="space-y-4">
        {subcategories.map((subcategory, index) => (
          <div key={index} className="subcategory">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {subcategory}
            </label>
            <Select 
              value={scores[index]?.toString() || "0"} 
              onValueChange={(value) => handleScoreChange(index, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scoreOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Category Score:</span>
          <span className={`score-display ${isUpdated ? 'score-updated' : ''}`}>
            {categoryScore.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-600">Weighted:</span>
          <span className="text-sm font-medium text-primary-600">
            {weightedScore.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
