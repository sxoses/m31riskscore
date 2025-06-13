import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import m31Logo from "@assets/m31logo_1749804670849.jpg";

interface HeaderProps {
  currentConfig: string;
  currentCompany: string;
  companyName: string;
  onConfigChange: (config: string) => void;
  onCompanyChange: (company: string) => void;
  onCompanyNameChange: (name: string) => void;
  configurations: string[];
  companies: string[];
}

export function Header({
  currentConfig,
  currentCompany,
  companyName,
  onConfigChange,
  onCompanyChange,
  onCompanyNameChange,
  configurations,
  companies
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
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="flex flex-col">
            <label className="text-sm font-medium text-black mb-1">
              Current Company
            </label>
            <Input
              value={companyName}
              onChange={(e) => onCompanyNameChange(e.target.value)}
              placeholder="Enter company name"
              className="min-w-48 bg-white border-black text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-black mb-1">
              PortCos
            </label>
            <Select value={currentCompany} onValueChange={onCompanyChange}>
              <SelectTrigger className="min-w-48 bg-white border-black text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {companies.filter(company => company !== "Current Company").map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
}
