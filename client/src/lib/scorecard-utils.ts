// Calculate category score (average of subcategory scores)
export function calculateCategoryScore(scores: (number | undefined)[]): number {
  const validScores = scores.filter(score => typeof score === 'number');
  if (validScores.length === 0) return 0;
  
  const sum = validScores.reduce((acc, score) => acc + (score || 0), 0);
  return (sum / (scores.length * 5)) * 100; // Normalize to a 0-100 scale
}

// Calculate weighted score for a category
export function calculateWeightedScore(categoryScore: number, weight: number) {
  return categoryScore * weight;
}

// Get recommendation based on total score
export function getRecommendation(score: number): string {
  if (isNaN(score) || score < 40) return "Pass";
  if (score < 60) return "Hold";
  if (score < 80) return "Consider";
  return "Strong Buy";
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
