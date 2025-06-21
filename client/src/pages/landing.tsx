import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import m31Logo from "@/assets/m31logo.jpg";

export default function Landing() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "bitcoin") {
      setLocation(`/scorecard`);
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <img 
            src={m31Logo} 
            alt="M31 Capital" 
            className="h-20 w-auto mx-auto mb-6 object-contain"
          />
          <h1 className="text-3xl font-bold text-white mb-2">
            M31 Capital Risk Score
          </h1>
        </div>

        {/* Input Form */}
        <div className={`bg-black rounded-xl shadow-lg border-2 ${error ? 'border-red-500' : 'border-gray-700'} p-8 transition-all`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false);
                }}
                placeholder="Enter password"
                className="w-full bg-gray-900 border-gray-700 text-white focus:ring-white focus:border-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gray-300 text-black hover:bg-white border border-gray-300 font-bold py-3"
              disabled={!password}
            >
              Enter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}