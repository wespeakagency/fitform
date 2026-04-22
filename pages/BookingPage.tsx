import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft, Calendar, Clock, User, Info, MapPin } from 'lucide-react';
import { Spot } from '../types';

// Mock spots configuration for a studio with 12 reformers
const INITIAL_SPOTS: Spot[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  isOccupied: [2, 5, 8, 9].includes(i + 1), // Randomly occupied
  isSelected: false,
}));

export const BookingPage: React.FC = () => {
  const { classId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const time = searchParams.get('time');
  const instructor = searchParams.get('instructor');
  const type = searchParams.get('type');

  const [spots, setSpots] = useState<Spot[]>(INITIAL_SPOTS);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSpotClick = (id: number) => {
    const spot = spots.find(s => s.id === id);
    if (spot?.isOccupied) return;

    setSpots(spots.map(s => ({
      ...s,
      isSelected: s.id === id
    })));
    setSelectedSpot(id);
  };

  const handleConfirmBooking = () => {
    if (!selectedSpot) return;
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/success');
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto relative z-10 min-h-screen">
      <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950 -z-10"></div>
      
      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Cancelar Reserva
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Class Info & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel-dark p-8 rounded-3xl animate-fade-up">
            <h1 className="text-2xl font-light text-stone-900 dark:text-white mb-2">{type}</h1>
            <div className="flex items-center gap-2 text-stone-500 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs uppercase tracking-widest">{instructor}</span>
            </div>

            <div className="space-y-4 border-t border-stone-200 dark:border-white/10 pt-6">
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                <Calendar className="w-4 h-4 text-stone-400" />
                <span className="text-sm font-medium">Hoy</span>
              </div>
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                <Clock className="w-4 h-4 text-stone-400" />
                <span className="text-sm font-medium">{time} - 50 min</span>
              </div>
               <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                <MapPin className="w-4 h-4 text-stone-400" />
                <span className="text-sm font-medium">FitForm Bosques</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
             <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-stone-400 mt-0.5" />
                <p className="text-xs text-stone-500 leading-relaxed">
                   Recuerda llegar 10 minutos antes. El uso de calcetines antiderrapantes es obligatorio. Si no tienes, puedes comprarlos en recepción.
                </p>
             </div>
          </div>

          {selectedSpot && (
            <div className="animate-fade-up">
               <Button fullWidth onClick={handleConfirmBooking} disabled={isProcessing}>
                  {isProcessing ? 'Reservando...' : `Confirmar Lugar #${selectedSpot}`}
               </Button>
               <p className="text-center text-[10px] text-stone-400 mt-3 uppercase tracking-widest">
                  Se descontará 1 crédito de tu cuenta
               </p>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Spot Selector */}
        <div className="lg:col-span-2">
           <div className="bg-stone-200 dark:bg-stone-900 rounded-[3rem] p-8 md:p-12 h-[600px] relative shadow-inner overflow-hidden border border-stone-300 dark:border-white/5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              
              {/* Mirrors / Front of Room Indicator */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
              <div className="text-center mb-10">
                 <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400">Espejos / Instructor</span>
                 <div className="w-24 h-1 bg-stone-300 dark:bg-white/10 mx-auto mt-2 rounded-full"></div>
              </div>

              {/* Grid of Reformers */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-2xl mx-auto">
                 {spots.map((spot) => (
                    <button
                       key={spot.id}
                       onClick={() => handleSpotClick(spot.id)}
                       disabled={spot.isOccupied}
                       className={`
                          relative group flex flex-col items-center justify-center transition-all duration-300
                          ${spot.isOccupied ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                       `}
                    >
                       {/* Reformer Representation */}
                       <div className={`
                          w-16 h-32 rounded-lg border-2 transition-all duration-300 relative shadow-lg
                          ${spot.isSelected 
                             ? 'bg-stone-900 border-stone-900 dark:bg-white dark:border-white' 
                             : 'bg-white/50 border-stone-300 dark:bg-white/5 dark:border-white/10 group-hover:border-stone-400 dark:group-hover:border-white/40'}
                       `}>
                          {/* Headrest */}
                          <div className={`
                             absolute top-2 left-1/2 -translate-x-1/2 w-8 h-6 rounded-sm
                             ${spot.isSelected 
                                ? 'bg-stone-700 dark:bg-stone-300' 
                                : 'bg-stone-200 dark:bg-white/10'}
                          `}></div>
                          
                          {/* Footbar */}
                          <div className={`
                             absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full
                             ${spot.isSelected 
                                ? 'bg-stone-700 dark:bg-stone-300' 
                                : 'bg-stone-300 dark:bg-white/20'}
                          `}></div>
                       </div>
                       
                       {/* Spot Number */}
                       <span className={`
                          mt-3 text-[10px] font-bold transition-colors
                          ${spot.isSelected 
                             ? 'text-stone-900 dark:text-white scale-110' 
                             : 'text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300'}
                       `}>
                          {spot.number}
                       </span>
                    </button>
                 ))}
              </div>

              {/* Legend */}
              <div className="absolute bottom-8 left-0 w-full flex justify-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-stone-300 dark:border-white/20 bg-white/50 dark:bg-white/5"></div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest">Disponible</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-stone-900 dark:bg-white"></div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest">Seleccionado</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-800 opacity-50"></div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest">Ocupado</span>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};