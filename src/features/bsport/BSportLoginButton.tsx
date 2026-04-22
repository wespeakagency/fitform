import React, { useEffect } from 'react';

// Declaración global para TypeScript
declare global {
  interface Window {
    BsportWidget?: {
      mount: (config: Record<string, any>) => void;
    };
  }
}

interface BSportLoginButtonProps {
  containerId: string;
  variant?: 'desktop' | 'mobile' | 'mobile-menu';
  className?: string;
}

export const BSportLoginButton: React.FC<BSportLoginButtonProps> = ({ 
  containerId,
  variant = 'desktop',
  className = ''
}) => {
  useEffect(() => {
    const scriptId = 'bsport-widget-cdn';
    let isMounted = true;
    let mountTimeout: NodeJS.Timeout | null = null;

    console.log(`[BSportLoginButton] Component mounted with containerId: ${containerId}`);

    // 1. Inyectar script solo si no lo ha inyectado otro componente
    const injectScript = () => {
      if (document.getElementById(scriptId)) {
        console.log('[BSportLoginButton] Script already injected, skipping...');
        return;
      }
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.bsport.io/scripts/widget.js';
      script.async = true;
      script.onload = () => {
        console.log('[BSportLoginButton] Script loaded successfully');
      };
      script.onerror = () => {
        console.error('[BSportLoginButton] Failed to load script');
      };
      document.head.appendChild(script);
      console.log('[BSportLoginButton] Script injected');
    };

    // 2. Esperar al objeto global y montar
    const mountWidget = (repeat = 1) => {
      if (!isMounted) return;
      if (repeat > 50) {
        console.warn(`[BSportLoginButton] Widget did not load after 50 attempts for ${containerId}`);
        return;
      }

      if (!window.BsportWidget) {
        console.log(`[BSportLoginButton] Waiting for BsportWidget... attempt ${repeat}/50`);
        mountTimeout = setTimeout(() => mountWidget(repeat + 1), 100);
        return;
      }

      console.log(`[BSportLoginButton] BsportWidget found, mounting to ${containerId}...`);
      
      const container = document.getElementById(containerId);
      if (container) {
        // PREVENCIÓN DE STRICT MODE: Si ya existe el cleanslate, no lo volvemos a montar.
        if (container.querySelector('.cleanslate')) {
          console.log(`[BSport] Widget ya está montado en ${containerId}, omitiendo re-render.`);
          return; 
        }
        
        container.innerHTML = ''; // Limpieza previa por Strict Mode
        
        try {
          window.BsportWidget.mount({
            parentElement: containerId,
            companyId: 5741,
            franchiseId: null,
            dialogMode: 1,
            widgetType: "loginButton", 
            showFab: false,
            fullScreenPopup: true,
            config: {
              loginButton: { openMemberProfile: true }
            }  
          });
          console.log(`[BSportLoginButton] Widget mounted successfully to ${containerId}`);
        } catch (error) {
          console.error(`[BSportLoginButton] Error mounting widget to ${containerId}:`, error);
        }
      } else {
        console.error(`[BSportLoginButton] Container ${containerId} not found`);
      }
    };

    injectScript();
    mountWidget();

    // 3. Cleanup al desmontar
    return () => {
      isMounted = false;
      if (mountTimeout) {
        clearTimeout(mountTimeout);
      }
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
      }
      console.log(`[BSportLoginButton] Component unmounted, cleaned up ${containerId}`);
    };
  }, [containerId]);

  // Determinar clases base según variante
  const getBaseClasses = () => {
    // Estilos mínimos con colores blancos para resaltar sobre fondo oscuro
    const baseClasses = 'min-w-[120px] min-h-[40px] flex items-center justify-center relative z-50 [&_*]:!text-white [&_svg]:!fill-white [&_*]:!border-white hover:[&_*]:!text-stone-300 hover:[&_*]:!border-stone-300 transition-all cursor-pointer';
    
    switch (variant) {
      case 'desktop':
        return `${baseClasses}`;
      case 'mobile':
        return `${baseClasses}`;
      case 'mobile-menu':
        return `${baseClasses}`;
      default:
        return `${baseClasses}`;
    }
  };

  return (
    <div 
      id={containerId} 
      className={`${getBaseClasses()} ${className}`}
    ></div>
  );
};