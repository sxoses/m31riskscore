import { useState, useRef } from "react";
import { NumberInput } from "./NumberInput";
import { calculateCategoryScore, calculateWeightedScore } from "@/lib/scorecard-utils";

interface CategoryCardProps {
  categoryKey: string;
  categoryName: string;
  subcategories: string[];
  scores: number[];
  weight: number;
  onScoreChange: (category: string, index: number, value: number) => void;
}

export function CategoryCard({
  categoryKey,
  categoryName,
  subcategories,
  scores,
  weight,
  onScoreChange
}: CategoryCardProps) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const categoryScore = calculateCategoryScore(scores);
  const weightedScore = calculateWeightedScore(categoryScore, weight);

  const handleScoreChange = (index: number, value: number) => {
    onScoreChange(categoryKey, index, value);
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 300);
  };

  const handleNext = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < subcategories.length) {
      setFocusedIndex(nextIndex);
      setTimeout(() => {
        const nextInput = document.querySelector(`[data-category="${categoryKey}"][data-index="${nextIndex}"] input`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      }, 50);
    } else {
      // Move to next category's first input
      const allCategories = document.querySelectorAll('.category-card');
      const currentCategoryIndex = Array.from(allCategories).findIndex(cat => cat.getAttribute('data-category') === categoryKey);
      const nextCategory = allCategories[currentCategoryIndex + 1];
      if (nextCategory) {
        const firstInput = nextCategory.querySelector('input') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
          firstInput.select();
        }
      }
    }
  };

  return (
    <div className="category-card bg-white rounded-xl shadow-sm border border-black p-6" data-category={categoryKey}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">{categoryName}</h3>
        <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm font-medium border border-black">
          {weight || 0}%
        </span>
      </div>
      
      <div className="space-y-4">
        {subcategories.map((subcategory, index) => (
          <div key={index} className="subcategory" data-category={categoryKey} data-index={index}>
            <label className="block text-sm font-medium text-black mb-2">
              {subcategory}
            </label>
            <NumberInput
              value={scores[index] || 0}
              onChange={(value) => handleScoreChange(index, value)}
              onNext={() => handleNext(index)}
              autoFocus={focusedIndex === index}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Category Score:</span>
          <span className={`score-display text-black ${isUpdated ? 'score-updated' : ''}`}>
            {isNaN(categoryScore) ? '0.0' : categoryScore.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-600">Weighted:</span>
          <span className="text-sm font-medium text-black">
            {isNaN(weightedScore) ? '0.00' : weightedScore.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
