
import React from 'react';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder, type = 'text' }) => {
  return (
    <div className="form-underline w-full max-w-md">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400"
      />
    </div>
  );
};

export default InputField;
