import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-stone-50 dark:bg-stone-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fade-up border border-stone-200 dark:border-white/10">
        <div className="flex items-center justify-between p-6 border-b border-stone-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-md sticky top-0 z-10">
          <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-white">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-white/10 transition-colors text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto custom-scrollbar text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-light space-y-4">
          {children}
        </div>
        
        <div className="p-6 border-t border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-stone-900 flex justify-end">
          <button 
            onClick={onClose}
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-900 dark:text-white hover:opacity-50 transition-opacity"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};