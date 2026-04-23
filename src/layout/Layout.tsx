import React, { useEffect } from 'react';
import { Navbar } from '@/layout/Navbar';
import { Footer } from '@/layout/Footer';
import { Modal } from '@/components/Modal';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (open: boolean) => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (open: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isPrivacyOpen,
  setIsPrivacyOpen,
  isTermsOpen,
  setIsTermsOpen,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen font-sans bg-fitform-bone dark:bg-fitform-obsidian text-stone-900 dark:text-stone-50 transition-colors duration-700 selection:bg-fitform-teal selection:text-white">
      <Navbar />

      <main className="relative min-h-[80vh]">
        {children}
      </main>

      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

       {/* Modals for Policies */}
      <Modal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)}
        title="Aviso de Privacidad"
      >
        <p><strong>Información de Privacidad</strong></p>
        <p><strong>Aviso de Privacidad:</strong></p>
        <p>Uno Espacios Corporativos, S.A. de C.V., sus representantes, consejeros, personas autorizadas garantiza el manejo responsable de los datos personales de los usuarios conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
        <p>Los datos recabados se utilizan exclusivamente para la gestión de clases, pagos y comunicación con los usuarios.</p>
        <p>Los usuarios serán notificados de cualquier cambio en el Aviso de Privacidad por los canales apropiados.</p>
        <br/>
        <p><strong>Modificaciones</strong></p>
        <p><strong>Cambios en los Términos y Condiciones:</strong> Uno Espacios Corporativos, S.A. de C.V., sus representantes, consejeros, personas autorizadas se reserva el derecho de modificar los presentes términos y condiciones en cualquier momento. Las actualizaciones serán notificadas oportunamente; se recomienda revisarlos periódicamente.</p>
        <br/>
        <p><strong>Información de Contacto</strong></p>
        <p>Para cualquier consulta, aclaración o solicitud relacionada con nuestras políticas o términos, puede contactarnos a: <a href="mailto:contacto@fitform.mx" className="text-fitform-navy dark:text-fitform-teal underline">contacto@fitform.mx</a></p>
      </Modal>

      <Modal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)}
        title="Términos y Condiciones"
      >
        <p><strong>En Fitform, valoramos tu tiempo y el de todos nuestros alumnos.</strong></p>
        <p>Para asegurar que todos tengan oportunidad de aprovechar los espacios disponibles, te pedimos que tomes en cuenta nuestra política de cancelación:</p>
        <p>Tienes hasta 10 horas antes del inicio de la clase para cancelarla sin penalización.</p>
        <p>Si no cancelas dentro de este tiempo y no te presentas, se aplicará una penalización de $150 pesos. Esta política es válida para todas las membresías y paquetes, sin excepción.</p>
        <p>Gracias por tu comprensión y por ayudarnos a mantener un espacio justo, respetuoso y eficiente para toda la comunidad.</p>
        <br/>
        <p><strong>Reservas y Cancelaciones</strong></p>
        <p><strong>Reservas:</strong> Todas las clases deben reservarse y pagarse por adelantado a través de nuestro sistema en línea. La confirmación de la reserva es obligatoria.</p>
        <p>Si una clase está llena, recomendamos ponerte en la lista de espera. Si un lugar se abre antes de 12 horas de que comience la clase, se le agregará automáticamente a la clase. Al ponerte en la lista de espera, reconoces que podrás tomar la clase si entras. Si no quieres un lugar en la clase, debes eliminarte de la clase/lista de espera 12 horas antes de la hora de inicio de la clase. Si se le agrega a la clase desde la lista de espera, no se elimina y no asiste, será una cancelación tardía y está sujeto a perder la clase o la tarifa de cancelación tardía. Si no se sale de la lista de espera, la clase se acreditará en su cuenta para su uso futuro.</p>
        <br/>
        <p><strong>Política de Cancelación:</strong></p>
        <p>Las cancelaciones deben realizarse al menos con 10 horas de anticipación (Ventana de cancelación) para evitar cargos o pérdida de la clase.</p>
        <p>Si no cancela dentro de este periodo, la clase se considerará cancelada de forma tardía, perdiendo el derecho a reprogramarla y perdiendo el pago realizado.</p>
        <br/>
        <p><strong>Tarifa de cancelación tardía</strong></p>
        <p>Para los paquetes y membresías mensuales con la cancelación tardía (10 horas antes) perderá su clase, y en caso de no cancelar y no presentarse se cobrará un fee de $150 pesos extras aparte de su clase perdida.</p>
        <br/>
        <p><strong>Cambios de Entrenadores y Clases:</strong> Los entrenadores y las clases están sujetos a cambios o cancelaciones sin previo aviso. Se hará un esfuerzo para notificarle vía correo electrónico o mensaje de texto en caso de ajustes.</p>
        <br/>
        <p><strong>Políticas de Uso y Seguridad</strong></p>
        <p><strong>Uso Seguro:</strong></p>
        <p>Durante las clases, nuestros entrenadores capacitados pueden realizar ajustes correctivos para garantizar la seguridad y correcta ejecución de los ejercicios.</p>
        <p>El uso de calcetines es obligatorio por razones de seguridad.</p>
        <p>Se requiere que los clientes limpien el equipo después de cada clase.</p>
        <br/>
        <p><strong>Acceso Tardío:</strong> El límite de ingreso es de 5 minutos después del inicio de la clase para prevenir riesgos de lesiones y garantizar la calidad del entrenamiento.</p>
        <br/>
        <p><strong>Reglamentos Generales:</strong></p>
        <p>No está permitido grabar durante las clases sin aprobación previa.</p>
        <p>Uno Espacios Corporativos, S.A. de C.V., sus representantes, consejeros, personas autorizadas puede emplear videovigilancia en sus instalaciones para mejorar la seguridad y experiencia de los usuarios.</p>
        <p>Durante periodos vacacionales, los horarios de clases podrían ser reducidos; estos cambios serán comunicados oportunamente.</p>
        <br/>
        <p><strong>Políticas de Membresía y Pagos</strong></p>
        <p><strong>Facturación y Renovaciones:</strong></p>
        <p>Las membresías mensuales se renuevan automáticamente a menos que se cancele al menos 15 días antes de la fecha de renovación.</p>
        <p>Los paquetes de clases deben usarse dentro del periodo especificado; las clases no utilizadas no son transferibles ni reembolsables.</p>
        <br/>
        <p><strong>Métodos de Pago:</strong> Todas las cuentas activas deben tener una tarjeta de débito o crédito válida registrada. No se aceptan pagos en efectivo u otros métodos.</p>
        <br/>
        <p><strong>Responsabilidad</strong></p>
        <p><strong>Exención de Responsabilidad:</strong></p>
        <p>Al participar en las actividades, el usuario certifica estar en condiciones físicas adecuadas y libera a Uno Espacios Corporativos, S.A. de C.V., sus representantes, consejeros, personas autorizadas de cualquier responsabilidad por lesiones, daños o accidentes que puedan ocurrir durante su participación.</p>
      </Modal>
    </div>
  );
};