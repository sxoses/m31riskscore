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
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            M31 Capital Investment Scorecard
          </h1>
          <p className="text-gray-600">
            Dynamic evaluation framework for blockchain and technology investments
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Investment Approach
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
            <label className="text-sm font-medium text-gray-700 mb-1">
              Investment Opportunity
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
