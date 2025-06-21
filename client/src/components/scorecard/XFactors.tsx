import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const xFactors = [
  "Erratic",
  "Disorganized",
  "Shows up late, cancels last min",
  "Shady reputation",
  "Bad health habits",
  "Slow responder",
];

export function XFactors() {
  const [checkedState, setCheckedState] = useState(new Array(xFactors.length).fill(false));

  const handleCheckboxChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const checkedCount = checkedState.filter(Boolean).length;

  return (
    <Card className="mt-8 border-2 border-black">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-black">X-FACTORS</CardTitle>
        <div className="text-lg font-bold text-black">
          {checkedCount}/{xFactors.length}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {xFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
              <label htmlFor={`checkbox-${index}`} className="text-md text-black">
                {factor}
              </label>
              <Checkbox
                id={`checkbox-${index}`}
                checked={checkedState[index]}
                onCheckedChange={() => handleCheckboxChange(index)}
                className="border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 