import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, Clock, Settings, LogOut, User, MapPin, X } from 'lucide-react';
import { Button } from '../components/Button';

// Mock Data for the Dashboard
const MOCK_USER = {
  name: 'Valeria',
  credits: 3,
  membership: 'Pack 5 Clases',
  expiry: '15 Nov 2024'
};

const UPCOMING_CLASSES = [
  { id: 101, date: 'Mañana', time: '08:00 AM', instructor: 'Ana Silva', type: 'Strong Pilates', spot: 4 },
  { id: 102, date: 'Viernes 25', time: '07:00 AM', instructor: 'Carlos Ruiz', type: 'Recovery', spot: 12 },
];

const PAST_CLASSES = [
  { id: 99, date: 'Ayer', time: '06:00 PM', instructor: 'Sofia', type: 'Strong Pilates', status: 'Asistió' },
  { id: 98, date: '12 Oct', time: '08:00 AM', instructor: 'Ana Silva', type: 'Strong Pilates', status: 'Asistió' },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'schedule' | 'history' | 'profile'>('schedule');

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto relative z-10 min-h-screen">
      <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950 -z-10"></div>
      
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-fade-up">
        <div>
          <h1 className="text-3xl md:text-5xl text-stone-900 dark:text-white font-light mb-2">
            Hola, <span className="font-bold">{MOCK_USER.name}</span>
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm uppercase tracking-widest">
            Bienvenida a tu espacio personal
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="mt-6 md:mt-0 flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar / Stats Card */}
        <div className="lg:col-span-1 space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Credits Card */}
          <div className="glass-panel-dark p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Mis Créditos</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-light text-stone-900 dark:text-white">{MOCK_USER.credits}</span>
                <span className="text-sm text-stone-500">clases</span>
              </div>
              <p className="text-[10px] text-stone-400 mb-6">
                Vence el {MOCK_USER.expiry}
              </p>
              
              <Button fullWidth onClick={() => navigate('/#pricing')} className="text-xs">
                Comprar Más
              </Button>
            </div>
          </div>

          {/* Navigation Tabs (Mobile: Horizontal, Desktop: Vertical Stack) */}
          <div className="glass-panel p-4 rounded-2xl flex lg:flex-col gap-2 overflow-x-auto">
             <button 
                onClick={() => setActiveTab('schedule')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'schedule' ? 'bg-stone-900 text-white dark:bg-white dark:text-black' : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-white/5'}`}
             >
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Mis Reservas</span>
             </button>
             <button 
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'history' ? 'bg-stone-900 text-white dark:bg-white dark:text-black' : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-white/5'}`}
             >
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Historial</span>
             </button>
             <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'profile' ? 'bg-stone-900 text-white dark:bg-white dark:text-black' : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-white/5'}`}
             >
                <User className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Mi Perfil</span>
             </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
           
           {activeTab === 'schedule' && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-light text-stone-900 dark:text-white">Próximas Clases</h2>
                    <Button onClick={() => navigate('/#schedule')} variant="outline" className="!py-2 !px-4">
                       Nueva Reserva
                    </Button>
                 </div>

                 {UPCOMING_CLASSES.length > 0 ? (
                    <div className="grid gap-4">
                       {UPCOMING_CLASSES.map((session) => (
                          <div key={session.id} className="glass-panel hover:bg-white/80 dark:hover:bg-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 transition-all border-l-4 border-l-stone-900 dark:border-l-white">
                             <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="text-center min-w-[60px]">
                                   <span className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider">{session.date}</span>
                                   <span className="block text-2xl font-light text-stone-900 dark:text-white">{session.time}</span>
                                </div>
                                <div className="h-10 w-[1px] bg-stone-300 dark:bg-white/10 hidden md:block"></div>
                                <div>
                                   <h3 className="text-lg font-bold text-stone-900 dark:text-white">{session.type}</h3>
                                   <div className="flex items-center gap-4 text-xs text-stone-500 mt-1">
                                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {session.instructor}</span>
                                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Spot {session.spot}</span>
                                   </div>
                                </div>
                             </div>
                             
                             <button className="text-[10px] uppercase font-bold tracking-widest text-stone-400 hover:text-red-500 transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-red-500/30 hover:bg-red-500/5">
                                <X className="w-3 h-3" /> Cancelar
                             </button>
                          </div>
                       ))}
                    </div>
                 ) : (
                    <div className="text-center py-20 glass-panel-dark rounded-3xl">
                       <p className="text-stone-500 mb-4">No tienes reservas activas.</p>
                       <Link to="/#schedule" className="text-stone-900 dark:text-white underline font-bold text-sm uppercase tracking-widest">
                          Ir al calendario
                       </Link>
                    </div>
                 )}
              </div>
           )}

           {activeTab === 'history' && (
              <div className="space-y-6">
                 <h2 className="text-xl font-light text-stone-900 dark:text-white mb-4">Historial de Clases</h2>
                 <div className="glass-panel-dark rounded-3xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                       <thead className="bg-stone-200/50 dark:bg-white/5 text-[10px] uppercase tracking-widest text-stone-500">
                          <tr>
                             <th className="p-6 font-bold">Fecha</th>
                             <th className="p-6 font-bold">Clase</th>
                             <th className="p-6 font-bold hidden md:table-cell">Instructor</th>
                             <th className="p-6 font-bold text-right">Estado</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-stone-200 dark:divide-white/5 text-sm font-light text-stone-600 dark:text-stone-300">
                          {PAST_CLASSES.map((session) => (
                             <tr key={session.id} className="hover:bg-stone-100/50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-6">
                                   <div className="font-medium text-stone-900 dark:text-white">{session.date}</div>
                                   <div className="text-xs text-stone-500">{session.time}</div>
                                </td>
                                <td className="p-6">{session.type}</td>
                                <td className="p-6 hidden md:table-cell">{session.instructor}</td>
                                <td className="p-6 text-right">
                                   <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
                                      {session.status}
                                   </span>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {activeTab === 'profile' && (
              <div className="space-y-6">
                 <h2 className="text-xl font-light text-stone-900 dark:text-white mb-4">Configuración de Cuenta</h2>
                 
                 <div className="glass-panel-dark p-8 rounded-3xl space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Nombre</label>
                          <input type="text" value={MOCK_USER.name} readOnly className="w-full bg-stone-100 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Email</label>
                          <input type="email" value="valeria@ejemplo.com" readOnly className="w-full bg-stone-100 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Teléfono</label>
                          <input type="tel" value="+52 55 1234 5678" readOnly className="w-full bg-stone-100 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white" />
                       </div>
                    </div>

                    <div className="pt-8 border-t border-stone-200 dark:border-white/10">
                       <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 dark:text-white mb-4">Métodos de Pago</h3>
                       <div className="flex items-center gap-4 p-4 border border-stone-200 dark:border-white/10 rounded-xl bg-stone-50 dark:bg-black/20">
                          <CreditCard className="w-6 h-6 text-stone-400" />
                          <div>
                             <p className="text-sm font-bold text-stone-900 dark:text-white">•••• •••• •••• 4242</p>
                             <p className="text-xs text-stone-500">Expira 12/25</p>
                          </div>
                          <button className="ml-auto text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
                             Editar
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};