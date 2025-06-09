import type { WeightConfiguration, CategoryDefinition } from "@shared/schema";

interface WeightVisualizationProps {
  currentConfig: string;
  configuration: WeightConfiguration;
  categories: Record<string, CategoryDefinition>;
}

export function WeightVisualization({
  currentConfig,
  configuration,
  categories
}: WeightVisualizationProps) {
  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Weight Distribution
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="chart-container">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                Dynamic Weights
              </div>
              <div className="text-sm text-gray-600">
                Configuration: <span className="font-medium">{currentConfig}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {Object.entries(configuration).map(([categoryKey, weight]) => (
              <div key={categoryKey} className="weight-item">
                <span className="font-medium text-gray-700">
                  {categories[categoryKey]?.name || categoryKey}
                </span>
                <span className="font-semibold text-primary-600">
                  {weight}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
