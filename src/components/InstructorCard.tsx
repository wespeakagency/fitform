import { forwardRef, useImperativeHandle, useRef, type KeyboardEvent } from 'react';
import type { Instructor } from '@/types';

interface InstructorCardProps {
  instructor: Instructor;
  isOpen: boolean;
  onToggle: () => void;
}

export interface InstructorCardHandle {
  focus: () => void;
}

export const InstructorCard = forwardRef<InstructorCardHandle, InstructorCardProps>(
  ({ instructor, isOpen, onToggle }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => containerRef.current?.focus(),
    }));

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle();
      }
    };

    return (
      <div
        ref={containerRef}
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? `Cerrar biografía de ${instructor.name}`
            : `Ver biografía de ${instructor.name}`
        }
        data-instructor-card
        className="group relative block w-full cursor-pointer rounded-2xl [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-offset-stone-950"
      >
        <div
          className={`relative aspect-[3/4] w-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out motion-reduce:duration-0 ${
            isOpen ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          <div
            aria-hidden={isOpen}
            className={`absolute inset-0 overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-900 [backface-visibility:hidden] ${
              isOpen ? 'pointer-events-none' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-60 z-10 transition-opacity duration-500 group-hover:opacity-40" />
            <img
              src={instructor.image}
              alt={instructor.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-2">
                {instructor.role}
              </p>
              <h2 className="text-2xl text-white font-light mb-4">{instructor.name}</h2>
              <div className="w-12 h-[1px] bg-white/50 group-hover:w-full transition-all duration-700" />
            </div>
          </div>

          <div
            aria-hidden={!isOpen}
            className={`absolute inset-0 overflow-hidden rounded-2xl bg-stone-900 dark:bg-stone-800 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col ${
              !isOpen ? 'pointer-events-none' : ''
            }`}
          >
            <div className="px-6 pt-6 pb-4 border-b border-white/10 shrink-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-2">
                {instructor.role}
              </p>
              <h2 className="text-2xl text-white font-light">{instructor.name}</h2>
            </div>
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5 touch-pan-y"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm text-stone-200 leading-relaxed font-light whitespace-pre-line">
                {instructor.bio}
              </p>
            </div>
            <div className="px-6 pb-5 pt-2 shrink-0">
              <span
                aria-hidden="true"
                className="text-[10px] uppercase tracking-[0.2em] text-white/50"
              >
                Clic afuera o ESC para cerrar
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InstructorCard.displayName = 'InstructorCard';
