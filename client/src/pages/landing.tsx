import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import m31Logo from "@assets/m31logo_1749804670849.jpg";

export default function Landing() {
  const [companyName, setCompanyName] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim()) {
      setLocation(`/scorecard?company=${encodeURIComponent(companyName.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <img 
            src={m31Logo} 
            alt="M31 Capital" 
            className="h-20 w-auto mx-auto mb-6 object-contain"
          />
          <h1 className="text-3xl font-bold text-black mb-2">
            M31 Capital Investment Risk Scorecard
          </h1>
          <p className="text-gray-600 text-lg">
            Enter a company name to begin the investment analysis
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-black p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="company-name" className="block text-sm font-medium text-black mb-2">
                Company Name
              </label>
              <Input
                id="company-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="w-full bg-white border-black text-black focus:ring-black focus:border-black"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800 border border-black font-medium py-3"
              disabled={!companyName.trim()}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}