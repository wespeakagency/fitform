import React, { useEffect } from 'react';

// Extendemos la interfaz global Window en este mismo archivo
// para asegurar el tipado estricto de TypeScript sin configuraciones extra.
declare global {
  interface Window {
    BsportWidget?: {
      mount: (config: Record<string, any>) => void;
    };
  }
}

export const Pricing: React.FC = () => {
  useEffect(() => {
    const scriptId = 'bsport-widget-cdn';
    const containerId = 'bsport-widget-395980';
    let isMounted = true; // Bandera para evitar montajes si el componente se destruye rápido

    // 1. Inyectar el script solo si no existe en el DOM (evita duplicados al navegar)
    const injectScript = () => {
      if (document.getElementById(scriptId)) return;
      
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.bsport.io/scripts/widget.js';
      script.async = true; // Evita bloquear el renderizado de la página
      document.head.appendChild(script);
    };

    // 2. Lógica recursiva y segura para esperar el objeto y montar el widget
    const mountWidget = (repeat = 1) => {
      if (!isMounted) return; // Si el usuario cambió de ruta, abortamos el montaje
      if (repeat > 50) {
        console.warn('Timeout: El widget de BSport tardó demasiado en cargar.');
        return;
      }

      if (!window.BsportWidget) {
        setTimeout(() => mountWidget(repeat + 1), 100);
        return;
      }

      const container = document.getElementById(containerId);
      if (container) {
        // Vaciamos el contenedor por si el Strict Mode de React intenta un doble renderizado
        container.innerHTML = ''; 
        
        window.BsportWidget.mount({
          parentElement: containerId,
          companyId: 5741,
          franchiseId: null,
          dialogMode: 1,
          widgetType: "calendar", 
          showFab: false,
          fullScreenPopup: false,
          styles: {
            colors: {
              text: '#FFFFFF'
            }
          },
          config: {
            calendar: {}
          }  
        });
      }
    };

    // Ejecutamos la inyección y el montaje
    injectScript();
    mountWidget();

    // 3. Cleanup: Se ejecuta cuando el componente se desmonta (al cambiar de página)
    return () => {
      isMounted = false;
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = ''; // Limpiamos la instancia del calendario de la memoria del navegador
      }
    };
  },[]); // Array vacío asegura ejecución solo en mount/unmount

  return (
    <section id="pricing" className="py-32 bg-stone-50 dark:bg-stone-950 relative z-30 transition-colors duration-700">
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 dark:text-white mb-8 text-center transition-colors duration-500">
            Clases
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm font-light uppercase tracking-widest text-center">
            Selecciona el plan ideal para ti
          </p>
        </div>

        {/* BSport Calendar Container */}
        <div className="w-full flex justify-center">
             <div className="w-full max-w-7xl min-h-[600px]">
                <div id="bsport-widget-395980" className="w-full min-h-[600px]"></div>
             </div>
        </div>
      </div>
    </section>
  );
};
