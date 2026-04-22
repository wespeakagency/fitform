import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'glass';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-10 py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] rounded-full transition-all duration-500 ease-out disabled:opacity-50 transform hover:scale-105 font-display";
  
  const variants = {
    // Primary: Navy in light mode, White/Teal in dark mode
    primary: "bg-fitform-navy text-white border border-fitform-navy hover:bg-stone-700 dark:bg-white dark:text-fitform-obsidian dark:border-white dark:hover:bg-fitform-stone dark:hover:border-fitform-stone shadow-[0_0_20px_rgba(36,77,77,0.1)]",
    // Outline: Dark border in light, White border in dark
    outline: "bg-transparent text-fitform-navy border border-stone-300 hover:bg-fitform-navy hover:text-white dark:text-white dark:border-white/30 dark:hover:bg-white dark:hover:text-fitform-obsidian dark:hover:border-white",
    // Glass: Adaptive glass
    glass: "glass-panel text-fitform-navy hover:bg-white border-stone-200 dark:text-white dark:hover:bg-white/20 dark:border-white/20",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};