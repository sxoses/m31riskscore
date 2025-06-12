import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeaderProps {
  currentConfig: string;
  currentCompany: string;
  onConfigChange: (config: string) => void;
  onCompanyChange: (company: string) => void;
  configurations: string[];
  companies: string[];
}

export function Header({
  currentConfig,
  currentCompany,
  onConfigChange,
  onCompanyChange,
  configurations,
  companies
}: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <img 
              src="/attached_assets/Screenshot 2025-06-12 at 5.16.04 PM_1749738900781.png" 
              alt="M31 Capital" 
              className="h-12 w-auto"
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
              <SelectTrigger className="min-w-48">
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
              PortCos
            </label>
            <Select value={currentCompany} onValueChange={onCompanyChange}>
              <SelectTrigger className="min-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
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
