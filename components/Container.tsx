import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  cleanPadding?: boolean;
}

export default function Container({ children, className = '', cleanPadding = false }: ContainerProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto ${cleanPadding ? '' : 'px-4 sm:px-6 lg:px-8'} ${className}`}>
      {children}
    </div>
  );
}
