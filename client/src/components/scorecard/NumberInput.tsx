import { useState, useRef, useEffect } from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  onNext?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export function NumberInput({ 
  value, 
  onChange, 
  onNext, 
  autoFocus = false,
  className = "" 
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [autoFocus]);

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow empty string for typing
    if (newValue === '') {
      setInputValue('');
      return;
    }
    
    // Only allow numbers 0-5
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
      setInputValue(newValue);
      onChange(numValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Ensure we have a valid value before moving to next
      const numValue = parseFloat(inputValue);
      if (isNaN(numValue) || numValue < 0 || numValue > 5) {
        setInputValue('0');
        onChange(0);
      } else {
        onChange(numValue);
      }
      
      if (onNext) {
        onNext();
      }
    }
    
    // Allow navigation keys, backspace, delete, etc.
    if (['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].includes(e.key)) {
      return;
    }
    
    // Prevent invalid characters
    if (!/[0-5.]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleBlur = () => {
    // Ensure valid value on blur
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < 0 || numValue > 5) {
      setInputValue('0');
      onChange(0);
    } else {
      onChange(numValue);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-center ${className}`}
      placeholder="0-5"
      min="0"
      max="5"
      step="0.1"
    />
  );
}