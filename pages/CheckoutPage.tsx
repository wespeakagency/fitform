import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packageName = searchParams.get('name') || 'Paquete FitForm';
  const price = searchParams.get('price') || '0';
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto relative z-10">
       <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950 -z-10"></div>
       {/* Background blobs */}
       <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[100px]"></div>
       </div>

       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Order Summary */}
          <div className="order-2 md:order-1">
             <h2 className="text-2xl font-light text-stone-900 dark:text-white mb-8">Información de Pago</h2>
             
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Nombre</label>
                      <input required type="text" className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-stone-500 dark:text-white transition-colors" placeholder="Tu nombre" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Apellido</label>
                      <input required type="text" className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-stone-500 dark:text-white transition-colors" placeholder="Tu apellido" />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Email</label>
                   <input required type="email" className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-stone-500 dark:text-white transition-colors" placeholder="nombre@ejemplo.com" />
                </div>

                <div className="pt-6 border-t border-stone-200 dark:border-white/10">
                   <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Tarjeta de Crédito / Débito
                   </h3>
                   
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Número de Tarjeta</label>
                         <input required type="text" className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-stone-500 dark:text-white transition-colors" placeholder="0000 0000 0000 0000" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Fecha Exp.</label>
                            <input required type="text" className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-stone-500 dark:text-white transition-colors" placeholder="MM / AA" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">CVC</label>
                            <input required type="text" className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-stone-500 dark:text-white transition-colors" placeholder="123" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-500">
                   <Lock className="w-3 h-3" />
                   <p>Tus pagos son procesados de forma segura con encriptación de 256-bit.</p>
                </div>

                <Button fullWidth disabled={isLoading} className="mt-4">
                   {isLoading ? 'Procesando...' : `Pagar $${Number(price).toLocaleString()} MXN`}
                </Button>
             </form>
          </div>

          {/* Cart Summary */}
          <div className="order-1 md:order-2">
             <div className="glass-panel-dark p-8 rounded-3xl sticky top-32">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">Resumen de compra</h2>
                
                <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/10">
                   <div>
                      <h3 className="text-xl font-bold text-stone-900 dark:text-white">{packageName}</h3>
                      <p className="text-sm text-stone-500 mt-1">Acceso a clases presenciales</p>
                   </div>
                   <p className="text-xl font-light text-stone-900 dark:text-white">${Number(price).toLocaleString()}</p>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-sm text-stone-500">
                      <span>Subtotal</span>
                      <span>${Number(price).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-sm text-stone-500">
                      <span>Impuestos (IVA incluido)</span>
                      <span>$0.00</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-stone-900 dark:text-white pt-4 border-t border-stone-200 dark:border-white/10">
                      <span>Total</span>
                      <span>${Number(price).toLocaleString()} MXN</span>
                   </div>
                </div>

                <div className="bg-stone-100 dark:bg-white/5 rounded-xl p-4 flex items-start gap-3">
                   <ShieldCheck className="w-5 h-5 text-stone-900 dark:text-white flex-shrink-0 mt-0.5" />
                   <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white mb-1">Garantía FitForm</h4>
                      <p className="text-[10px] text-stone-500 leading-relaxed">
                         Si no puedes asistir a tu primera clase por motivos de salud, te reprogramamos sin costo adicional (avisando 24h antes).
                      </p>
                   </div>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};