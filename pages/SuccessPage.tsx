import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { CheckCircle } from 'lucide-react';

export const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative pt-20 px-6">
       <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950 -z-10"></div>
       <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-up">
             <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-stone-900 dark:text-white mb-6 animate-fade-up" style={{animationDelay: '0.1s'}}>
             ¡Estás dentro!
          </h1>
          
          <p className="text-stone-600 dark:text-stone-400 text-lg mb-10 leading-relaxed animate-fade-up" style={{animationDelay: '0.2s'}}>
             Tu compra ha sido procesada exitosamente. Hemos enviado los detalles y tu recibo a tu correo electrónico.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{animationDelay: '0.3s'}}>
             <Link to="/dashboard">
                <Button>
                   Ver mis reservas
                </Button>
             </Link>
             <Link to="/">
                <Button variant="outline">
                   Volver al inicio
                </Button>
             </Link>
          </div>
       </div>
    </div>
  );
};