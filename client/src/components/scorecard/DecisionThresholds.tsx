import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const thresholds = [
  { label: "≥80 Strong Buy", color: "bg-green-500", highlight: "bg-green-50" },
  { label: "60-79 Consider", color: "bg-yellow-500", highlight: "bg-yellow-50" },
  { label: "40-59 Hold", color: "bg-blue-500", highlight: "bg-blue-50" },
  { label: "<40 Pass", color: "bg-red-500", highlight: "bg-red-50" },
];

export function DecisionThresholds() {
  return (
    <div className="pt-2">
      <h3 className="text-sm font-semibold mb-2 text-gray-600">Decision Thresholds</h3>
      <ul className="space-y-1">
        {thresholds.map((t) => (
          <li key={t.label} className={`flex items-center text-xs p-1.5 rounded-md ${t.highlight}`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${t.color}`}></span>
            <span className="text-gray-700">{t.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
