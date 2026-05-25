import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`pt-40 md:pt-44 pb-20 px-6 container mx-auto relative z-10 min-h-screen ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-stone-50 dark:bg-stone-950 -z-10"
      />
      {children}
    </div>
  );
}; 
