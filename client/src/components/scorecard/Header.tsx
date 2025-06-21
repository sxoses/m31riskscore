import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/ui/sidebar";
import m31Logo from "@/assets/m31logo.jpg";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  currentConfig: string;
  companyName: string;
  onConfigChange: (configName: string) => void;
  onCompanyNameChange: (name: string) => void;
  configurations: string[];
}

export function Header({
  currentConfig,
  companyName,
  onConfigChange,
  onCompanyNameChange,
  configurations,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-4 border-b mb-8">
      <div className="flex items-center gap-4">
        <img src={m31Logo} alt="M31 Capital" className="h-12" />
        <h1 className="text-2xl font-bold">INVESTMENT RISK SCORECARD</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-semibold">Company:</label>
          <Input 
            type="text" 
            value={companyName} 
            onChange={(e) => onCompanyNameChange(e.target.value)}
            placeholder="Enter company name"
            className="border p-2 rounded-md" 
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Investment Type:</label>
          <Select value={currentConfig} onValueChange={onConfigChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Configuration" />
            </SelectTrigger>
            <SelectContent>
              {configurations.map((config) => (
                <SelectItem key={config} value={config}>
                  {config}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
