// Calculate category score (average of subcategory scores)
export function calculateCategoryScore(categoryScores: number[]): number {
  if (!categoryScores || categoryScores.length === 0) return 0;
  const sum = categoryScores.reduce((acc, score) => acc + score, 0);
  return sum / categoryScores.length;
}

// Calculate weighted score for a category
export function calculateWeightedScore(categoryScore: number, weight: number): number {
  return (categoryScore * weight) / 100;
}

// Get recommendation based on total score
export function getRecommendation(totalScore: number): { text: string; class: string } {
  if (totalScore >= 80) {
    return { text: "Strong Buy", class: "status-success" };
  } else if (totalScore >= 60) {
    return { text: "Consider Investment", class: "status-warning" };
  } else if (totalScore >= 40) {
    return { text: "Hold", class: "status-info" };
  } else {
    return { text: "Pass", class: "status-error" };
  }
}

// Validate score value
export function validateScore(score: number): boolean {
  return score >= 0 && score <= 5 && Number.isInteger(score);
}

// Calculate total weighted score for all categories
export function calculateTotalWeightedScore(
  companyScores: Record<string, number[]>,
  weights: Record<string, number>
): number {
  let totalWeightedScore = 0;
  
  Object.entries(companyScores).forEach(([category, scores]) => {
    const categoryScore = calculateCategoryScore(scores);
    const weight = weights[category] || 0;
    const weightedScore = calculateWeightedScore(categoryScore, weight);
    totalWeightedScore += weightedScore;
  });
  
  return totalWeightedScore;
}

// Format score for display
export function formatScore(score: number, decimals: number = 1): string {
  return score.toFixed(decimals);
}

// Validate weight configuration (should sum to 100)
export function validateWeights(weights: Record<string, number>): boolean {
  const sum = Object.values(weights).reduce((acc, weight) => acc + weight, 0);
  return Math.abs(sum - 100) < 0.01; // Allow for small floating point errors
}
