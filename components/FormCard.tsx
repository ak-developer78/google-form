
import React from 'react';

interface FormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}

const FormCard: React.FC<FormCardProps> = ({ title, description, children, required, error }) => {
  return (
    <div className={`bg-white rounded-lg border shadow-sm p-6 ${error ? 'border-red-500' : 'border-gray-300'}`}>
      <div className="mb-4">
        <label className="text-base font-normal text-gray-900 flex items-start">
          {title} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && (
          <p className="text-xs text-gray-600 mt-1 font-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children}
      {error && (
        <div className="mt-2 flex items-center text-xs text-red-600">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default FormCard;
