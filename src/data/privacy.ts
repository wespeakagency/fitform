import type { PolicyContent } from '@/types';

export const PRIVACY_CONTENT: PolicyContent = {
  sections: [
    {
      title: 'Información de Privacidad',
      paragraphs: [
        {
          emphasis: 'Aviso de Privacidad',
          text: '',
        },
        {
          text: 'Uno Espacios Corporativos, S.A. de C.V., sus representantes, consejeros, personas autorizadas garantiza el manejo responsable de los datos personales de los usuarios conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
        },
        {
          text: 'Los datos recabados se utilizan exclusivamente para la gestión de clases, pagos y comunicación con los usuarios.',
        },
        {
          text: 'Los usuarios serán notificados de cualquier cambio en el Aviso de Privacidad por los canales apropiados.',
        },
      ],
    },
    {
      title: 'Modificaciones',
      paragraphs: [
        {
          emphasis: 'Cambios en los Términos y Condiciones',
          text: 'Uno Espacios Corporativos, S.A. de C.V., sus representantes, consejeros, personas autorizadas se reserva el derecho de modificar los presentes términos y condiciones en cualquier momento. Las actualizaciones serán notificadas oportunamente; se recomienda revisarlos periódicamente.',
        },
      ],
    },
    {
      title: 'Información de Contacto',
      paragraphs: [
        {
          text: 'Para cualquier consulta, aclaración o solicitud relacionada con nuestras políticas o términos, puede contactarnos a: ',
          link: {
            href: 'mailto:contacto@fitform.mx',
            label: 'contacto@fitform.mx',
          },
        },
      ],
    },
  ],
};
