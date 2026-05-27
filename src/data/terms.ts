import type { PolicyContent } from '@/types';

export const TERMS_CONTENT: PolicyContent = {
  intro:
    'En Fitform valoramos tu tiempo y el de toda nuestra comunidad. Para garantizar que todos los alumnos tengan la oportunidad de aprovechar los espacios disponibles, te pedimos revisar y cumplir con las siguientes políticas de uso, reservas y convivencia.',
  sections: [
    {
      title: '1. RESERVAS Y LISTA DE ESPERA',
      paragraphs: [
        {
          emphasis: 'Reservas',
          text: 'Todas las clases deben reservarse y pagarse por adelantado a través de nuestro sistema en línea. Contar con la confirmación de la reserva es obligatorio para poder ingresar a la clase.',
        },
        {
          emphasis: 'Lista de espera',
          text: 'Si una clase está llena, puedes inscribirte en la lista de espera. Si se libera un lugar hasta 12 horas antes del inicio de la clase, el sistema te asignará el espacio automáticamente y se te notificará por los canales del estudio.',
        },
        {
          text: 'Al unirte a la lista de espera, aceptas la responsabilidad de asistir si se te asigna el lugar.',
        },
        {
          text: 'Si ya no deseas o no puedes tomar la clase, debes removerte de la lista de espera al menos 12 horas antes de que inicie. De lo contrario, si el sistema te asigna el lugar y no asistes, se considerará como Cancelación Tardía o No Show, aplicando la penalización correspondiente.',
        },
        {
          text: 'Si la clase comienza y no alcanzaste lugar, el crédito se mantendrá intacto en tu cuenta para su uso futuro.',
        },
      ],
    },
    {
      title: '2. POLÍTICA DE CANCELACIONES Y AUSENCIAS (NO SHOW)',
      paragraphs: [
        {
          text: 'Puedes modificar o cancelar tu clase sin ninguna penalización hasta 12 horas antes de su inicio. Pasada esta ventana de tiempo, se aplicarán las siguientes reglas según tu tipo de acceso:',
        },
        {
          emphasis: 'A. Cancelación Tardía',
          separator: '',
          text: '(Si cancelas con menos de 12 horas de anticipación)',
        },
        {
          emphasis: 'Clientes con Paquetes de Clases',
          text: 'Se pierde la clase/crédito reservado. No se realiza ningún cobro monetario adicional.',
        },
        {
          emphasis: 'Clientes con Membresías Ilimitadas y de Socios',
          text: 'Se aplicará un cargo automático (fee) de $100 MXN.',
        },
        {
          emphasis: 'B. Inasistencia sin Cancelación (No Show)',
          separator: '',
          text: '(Si no cancelas y no te presentas)',
        },
        {
          emphasis: 'Clientes con Paquetes de Clases',
          text: 'Se pierde la clase/crédito reservado y se aplicará un cargo automático adicional de $75 MXN.',
        },
        {
          emphasis: 'Clientes con Membresías Ilimitadas y de Socios',
          text: 'Se aplicará un cargo automático de $150 MXN.',
        },
      ],
    },
    {
      title: '3. POLÍTICAS DE USO, SEGURIDAD Y ACCESO',
      paragraphs: [
        {
          emphasis: 'Acceso Tardío',
          text: 'Por tu seguridad (para prevenir lesiones al saltarte el calentamiento) y para garantizar la calidad del entrenamiento de los demás, el límite máximo de tolerancia para ingresar es de 5 minutos después del inicio de la clase. Pasado este tiempo, no se te permitirá el acceso y se considerará como una falta (Cancelación Tardía o No Show según sea el caso).',
        },
        {
          emphasis: 'Ajustes y Correcciones',
          text: 'Durante las sesiones, nuestros entrenadores capacitados podrán realizar ajustes físicos y correctivos orientados a garantizar tu seguridad y la correcta ejecución técnica de los ejercicios.',
        },
        {
          emphasis: 'Higiene y Vestimenta',
          text: 'El uso de calcetines es estrictamente obligatorio por razones de higiene y seguridad. Asimismo, se requiere que cada usuario limpie el equipo utilizado al finalizar la clase con los materiales provistos por el estudio.',
        },
        {
          emphasis: 'Privacidad y Grabación',
          text: 'No está permitido grabar videos ni tomar fotografías detalladas durante el desarrollo de las clases sin una autorización previa por parte de la administración.',
        },
        {
          emphasis: 'Videovigilancia',
          text: 'Las instalaciones de Uno Espacios Corporativos, S.A. de C.V. cuentan con sistemas de videovigilancia activos con la finalidad de procurar la seguridad, protección y una mejor experiencia para todos nuestros usuarios.',
        },
      ],
    },
    {
      title: '4. MEMBRESÍAS, PAGOS Y FACTURACIÓN',
      paragraphs: [
        {
          emphasis: 'Métodos de Pago',
          text: 'Todas las cuentas activas deben mantener registrada en el sistema una tarjeta de crédito o débito válida. No se aceptan pagos en efectivo ni otros métodos no automatizados.',
        },
        {
          emphasis: 'Renovación de Membresías',
          text: 'Las membresías mensuales se renuevan de forma automática. Si deseas cancelar tu renovación, deberás solicitarlo formalmente con al menos 15 días de anticipación a tu fecha de corte.',
        },
        {
          emphasis: 'Vigencia de Paquetes',
          text: 'Los paquetes de clases cuentan con un periodo de caducidad específico detallado al momento de la compra. Las clases que no se utilicen dentro de dicho periodo vencerán automáticamente, por lo que no son transferibles, reembolsables ni acumulables.',
        },
      ],
    },
    {
      title: '5. CAMBIOS EN EL SERVICIO Y HORARIOS',
      paragraphs: [
        {
          emphasis: 'Modificaciones de Staff y Clases',
          text: 'Los entrenadores asignados y los horarios de las clases están sujetos a cambios o cancelaciones por motivos operativos sin previo aviso. Fitform realizará el mayor esfuerzo posible por notificarte cualquier ajuste importante a través de correo electrónico o mensaje de texto.',
        },
        {
          emphasis: 'Periodos Vacacionales y Festivos',
          text: 'Durante días festivos o épocas vacacionales, los horarios de servicio y la oferta de clases podrán verse reducidos. Estos cambios serán comunicados a la comunidad de manera oportuna a través de las vías oficiales del estudio.',
        },
      ],
    },
    {
      title: '6. EXENCIÓN DE RESPONSABILIDAD',
      paragraphs: [
        {
          text: 'Al participar en las clases y actividades organizadas por Fitform, certificas que te encuentras en condiciones físicas, médicas y de salud óptimas para realizar ejercicio de mediana y alta intensidad.',
        },
        {
          text: 'Por lo tanto, liberas expresamente a Uno Espacios Corporativos, S.A. de C.V., así como a sus representantes, directores, consejeros, entrenadores y personal autorizado, de cualquier tipo de responsabilidad legal, civil, penal o médica ante cualquier lesión, accidente, daño o percance que pudieras llegar a sufrir dentro de las instalaciones o con motivo de tu participación en los entrenamientos.',
        },
      ],
    },
  ],
};
