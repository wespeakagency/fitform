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
          text: 'GIP Developers, S.A. de C.V. o cualquier tercero autorizado por GIP Developers, S.A. de C.V. tratará los datos personales de los usuarios conforme al aviso de privacidad aplicable y a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
        },
        {
          text: 'Los datos recabados se utilizan para la gestión de clases, pagos, comunicación con los usuarios, seguridad, protección de personas y bienes, y control de acceso, conforme al aviso de privacidad aplicable.',
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
          text: 'Fitform podrá modificar los presentes términos y condiciones cuando resulte necesario por razones operativas, comerciales, tecnológicas o regulatorias. Las modificaciones materiales serán comunicadas oportunamente; se recomienda revisarlos periódicamente.',
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
