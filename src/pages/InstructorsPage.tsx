import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { INSTRUCTORS } from '@/data/instructors';
import { InstructorCard, type InstructorCardHandle } from '@/components/InstructorCard';

export const InstructorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<number | null>(null);
  const cardRefs = useRef<Map<number, InstructorCardHandle>>(new Map());

  useEffect(() => {
    if (openId === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const idToFocus = openId;
        setOpenId(null);
        requestAnimationFrame(() => {
          cardRefs.current.get(idToFocus)?.focus();
        });
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest?.('[data-instructor-card]')) {
        setOpenId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [openId]);

  const handleToggle = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto relative z-10 min-h-screen">
      <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950 -z-10"></div>

      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:hover:text-white mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Inicio
      </button>

      <div className="mb-20">
        <h1 className="text-4xl md:text-6xl text-stone-900 dark:text-white font-light mb-6">
          Nuestros Coaches
        </h1>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-light">
          Un equipo de expertos dedicados a perfeccionar tu técnica. Cada instructor aporta una
          especialidad única de alto nivel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INSTRUCTORS.map((instructor) => (
          <InstructorCard
            key={instructor.id}
            ref={(handle) => {
              if (handle) cardRefs.current.set(instructor.id, handle);
              else cardRefs.current.delete(instructor.id);
            }}
            instructor={instructor}
            isOpen={openId === instructor.id}
            onToggle={() => handleToggle(instructor.id)}
          />
        ))}
      </div>
    </div>
  );
};
