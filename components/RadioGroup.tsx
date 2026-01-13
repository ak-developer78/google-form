
import React from 'react';

interface RadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange }) => {
  return (
    <div className="space-y-3 mt-4">
      {options.map((option) => (
        <label key={option} className="flex items-center cursor-pointer group">
          <div className="relative flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-400 group-hover:border-[#673ab7] transition-colors">
            <input
              type="radio"
              className="sr-only"
              name="experience"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            {value === option && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#673ab7]"></div>
            )}
          </div>
          <span className="ml-3 text-sm text-gray-800">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
