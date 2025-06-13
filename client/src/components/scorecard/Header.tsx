import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import m31Logo from "@assets/m31logo_1749804670849.jpg";

interface HeaderProps {
  currentConfig: string;
  companyName: string;
  onConfigChange: (config: string) => void;
  configurations: string[];
}

export function Header({
  currentConfig,
  companyName,
  onConfigChange,
  configurations
}: HeaderProps) {
  return (
    <header className="mb-8 bg-white border-b border-gray-200 pb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <img 
              src={m31Logo} 
              alt="M31 Capital" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">
              Investment Risk Scorecard
            </h1>
            <p className="text-lg text-gray-600">
              Company: <span className="font-semibold text-black">{companyName}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-black mb-1">
            Investment Type
          </label>
          <Select value={currentConfig} onValueChange={onConfigChange}>
            <SelectTrigger className="min-w-48 bg-white border-black text-black">
              <SelectValue />
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
