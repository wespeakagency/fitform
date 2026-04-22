import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 py-20">
      <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950 -z-10"></div>
      
      <div className="w-full max-w-lg animate-fade-up">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <div className="glass-panel-dark p-8 md:p-12 rounded-3xl shadow-2xl min-h-[400px] flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-stone-900 dark:text-white mb-2">Únete a <span className="font-bold">FITFORM</span></h1>
            <p className="text-stone-500 text-xs uppercase tracking-widest">Crea tu cuenta o inicia sesión</p>
          </div>

          {/* Fitco Integration Container - Uses same ID as login as Fitco script handles the tab */}
          <div id="fitcoSignIn" className="w-full flex justify-center min-h-[300px]"></div>
          
        </div>
      </div>
    </div>
  );
};