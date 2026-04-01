import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  header, 
  footer,
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {header && (
        <div className="px-6 py-4 border-b border-gray-100">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;