import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  id,
  type = 'text',
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}
      <InputComponent
        id={inputId}
        type={type !== 'textarea' ? type : undefined}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${type === 'textarea' ? 'min-h-[120px] resize-vertical' : ''}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;