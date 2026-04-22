import React, { useState } from 'react';
import { FAQItem } from '../types';
import { Plus, Minus } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: "¿Qué es FitForm?",
    answer: "FitForm es un entrenamiento de 50 minutos de alta intensidad, bajo impacto y resistencia. Utiliza movimientos lentos y controlados para trabajar el core, así como la parte superior e inferior del cuerpo.\n\nNuestras clases son de grupos reducidos, lo que te permite recibir atención personalizada durante toda la sesión. Prepárate para sudar, temblar y querer volver por más."
  },
  {
    question: "¿Son Pilates tradicionales?",
    answer: "No. FitForm no es Pilates tradicional, aunque utilizamos un reformador inspirado en esta disciplina.\n\nLa diferencia está en el enfoque. En el Pilates tradicional se trabaja mucho la respiración y el control del movimiento.\n\nEn FitForm nos enfocamos en desarrollar fuerza y resistencia muscular. Lo hacemos a través de movimientos lentos y controlados que mantienen el músculo en tensión durante más tiempo.\n\nEsto hace que el entrenamiento sea más retador, más intenso y que realmente sientas cómo cada músculo trabaja."
  },
  {
    question: "¿Existen diferentes niveles de clase según la experiencia?",
    answer: "No dividimos las clases por niveles. En una misma sesión pueden participar personas con distintas condiciones físicas.\n\nEl entrenamiento está diseñado para ser adaptable. Nuestros instructores ofrecen modificaciones para principiantes y variaciones más avanzadas para quienes buscan un mayor desafío. Así, cada persona puede trabajar a su propio ritmo de forma segura y efectiva."
  },
  {
    question: "¿Qué debo llevar a clase?",
    answer: "Ropa cómoda que te permita moverte con libertad.\n\nCalcetines antiderrapantes (obligatorios por seguridad e higiene). Puedes adquirirlos en el estudio.\n\nBotella de agua."
  },
  {
    question: "¿Con cuánto tiempo de anticipación debo llegar?",
    answer: "Te recomendamos llegar al menos 5 minutos antes de tu clase.\n\nSi es tu primera vez en FitForm, llega 10 minutos antes para que podamos darte una breve introducción."
  },
  {
    question: "¿Puedo tomar la clase si estoy embarazada?",
    answer: "No se recomienda realizar este tipo de entrenamiento durante el embarazo debido a su intensidad y al enfoque en el trabajo de core.\n\nSin embargo, estaremos encantados de acompañarte en tu proceso de recuperación y fortalecimiento durante el posparto."
  },
  {
    question: "¿Cuál es nuestra política de cancelación?",
    answer: "Puedes cambiar o cancelar tu clase hasta 10 horas antes del inicio sin penalización.\n\nCANCELACIÓN TARDÍA: Si cancelas con menos de 10 horas de anticipación, se tomará como una clase perdida dentro de tu paquete de clases contratado.\n\nNO SHOW: Si no cancelas y no te presentas, además de perder la clase se aplicará una penalización de $150 MXN."
  },
  {
    question: "¿Perderé mi lugar si llego tarde?",
    answer: "Sí. Por seguridad y respeto a los demás asistentes, si llegas 5 minutos después de iniciada la clase no podrás ingresar.\n\nEsto garantiza un calentamiento adecuado y evita distracciones durante la sesión."
  },
  {
    question: "¿Existe lista de espera?",
    answer: "Sí. Puedes unirte a la lista de espera hasta 10 horas antes del inicio de la clase.\n\nEn la app, las clases con cupo lleno aparecerán como \"Lista de espera\". Si se libera un lugar con más de 10 horas de anticipación, se te asignará automáticamente y recibirás un correo de confirmación.\n\nSi no obtienes un lugar, la clase se acreditará en tu cuenta para uso futuro.\n\nImportante: Al unirte a la lista de espera aceptas tomar la clase si se libera un espacio. Si ya no deseas asistir, debes salirte de la lista con al menos 10 horas de anticipación. De lo contrario, aplicará la política de cancelación tardía."
  },
  {
    question: "¿Cómo puedo cancelar mi membresía mensual?",
    answer: "Para cancelar tu membresía, envía tu solicitud a través de nuestro portal digital.\n\nNuestro equipo responderá en un plazo máximo de 7 días hábiles. Es necesario notificar con al menos 15 días de anticipación a tu próxima fecha de facturación para evitar el cargo correspondiente."
  },
  {
    question: "¿Las clases son para hombres y mujeres?",
    answer: "Sí. Nuestras clases están diseñadas para hombres y mujeres de todos los niveles."
  },
  {
    question: "¿Cuánto dura cada clase?",
    answer: "Cada clase tiene una duración de 50 minutos.\n\nAl finalizar, incluimos una breve meditación o relajación guiada para ayudarte a conectar con tu respiración y salir renovado física y mentalmente."
  },
  {
    question: "¿Necesito experiencia previa?",
    answer: "No. Las clases están diseñadas para adaptarse a todos los niveles, desde principiantes hasta personas con experiencia.\n\nSi es tu primera vez, nuestros coaches te guiarán en cada paso para que disfrutes la experiencia desde el inicio."
  },
  {
    question: "¿Puedo asistir si tengo alguna condición médica?",
    answer: "Sí, pero es importante informar a tu coach antes de comenzar si tienes alguna lesión o condición médica.\n\nEsto nos permitirá adaptar los ejercicios y priorizar tu seguridad."
  },
  {
    question: "¿Qué beneficios puedo esperar al practicar FitForm regularmente?",
    answer: "Practicar FitForm de manera constante puede ayudarte a:\n\n- Aumentar tu fuerza y resistencia muscular\n- Mejorar la tonificación\n- Quema de calorías por sesión\n- Mantener el metabolismo activo incluso después del entrenamiento\n\nCon disciplina y constancia, notarás cambios visibles en menos tiempo de lo que te imaginas."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos exclusivamente pagos con tarjeta de crédito o débito.\n\nNo manejamos efectivo ni transferencias bancarias."
  },
  {
    question: "¿Cuál es la diferencia entre Clases, Membresías y Membresías Socio?",
    answer: "Clases\nSon compras individuales, con un solo pago y vigencias normalmente más cortas (dependiendo el paquete a elegir)\nPago único (no recurrente).\nVigencia limitada según el paquete adquirido.\nPuedes cancelar con 10 horas de anticipación.\nSi cancelas fuera de tiempo o no asistes, se aplicará la política de cancelación / no show.\n\nIdeal si quieres probar FitForm o no deseas un compromiso mensual.\n\nMembresías\nSon planes con cargo mensual recurrente y mayor plazo de asistencia.\nCargo mensual automático durante 6 meses.\nPuedes cancelar cuando quieras notificando con 15 días de anticipación a tu siguiente fecha de cobro.\nCancela tus clases con al menos 10 horas de anticipación para evitar penalizaciones.\nPerfectas si buscas constancia y mejores beneficios por compromiso.\n\nMembresías Socio\nSon nuestro plan con mayores beneficios\nCargo mensual recurrente por 1 año.\nPermanencia mínima obligatoria de 3 meses.\nPuedes cancelar cuando quieras después del periodo mínimo, notificando con anticipación.\nPregunta en recepción para conocer todos los beneficios vigentes."
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-stone-100 dark:bg-stone-900 relative z-40 border-t border-stone-200 dark:border-white/5 transition-colors duration-700">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] text-center mb-4">Dudas</h2>
        <h2 className="text-3xl md:text-4xl text-center mb-16 text-stone-900 dark:text-white font-light transition-colors duration-500">Preguntas Frecuentes</h2>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="glass-panel px-6 md:px-8 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-white/5">
              <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-sm font-medium tracking-wide transition-colors ${openIndex === index ? 'text-stone-900 dark:text-white' : 'text-stone-500 dark:text-stone-400'}`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full border transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-black border-stone-900 dark:border-white rotate-180' 
                    : 'text-stone-400 border-stone-300 dark:border-white/10'
                }`}>
                  {openIndex === index ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  openIndex === index ? 'max-h-40 opacity-100 pb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};