export function DecisionThresholds() {
  const thresholds = [
    {
      range: "≥80 Strong Buy",
      description: "Exceptional opportunity with minimal risks",
      className: "threshold-strong-buy"
    },
    {
      range: "60-79 Consider",
      description: "Promising but requires further diligence",
      className: "threshold-consider"
    },
    {
      range: "40-59 Hold",
      description: "Significant concerns; monitor improvements",
      className: "threshold-hold"
    },
    {
      range: "<40 Pass",
      description: "High risk or insufficient potential",
      className: "threshold-pass"
    }
  ];

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Decision Thresholds
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {thresholds.map((threshold, index) => (
            <div key={index} className={`decision-threshold ${threshold.className}`}>
              <div className="threshold-title">
                {threshold.range}
              </div>
              <div className="threshold-description">
                {threshold.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
