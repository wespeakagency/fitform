import type { PolicyContent } from '@/types';

export const PRIVACY_CONTENT: PolicyContent = {
  sections: [
    {
      title: 'Aviso de Privacidad',
      paragraphs: [
        {
          text: 'GIP Developers, S.A. de C.V., quien participa en la operación de los servicios ofrecidos bajo la marca comercial FITFORM (en lo sucesivo, "FITFORM"), con domicilio en Avenida Constituyentes Oriente Número 74, Colonia Arquitos, Querétaro, Querétaro, Código Postal 76048, es responsable del tratamiento, uso, protección y resguardo de los datos personales de sus Usuarios.',
        },
        {
          text: 'Para el cumplimiento de las finalidades señaladas en el presente Aviso de Privacidad, GIP Developers, S.A. de C.V. podrá apoyarse en proveedores, prestadores de servicios, plataformas tecnológicas y demás terceros autorizados que actúen por su cuenta y conforme a sus instrucciones.',
        },
      ],
    },
    {
      title: 'Datos personales que podrán ser recabados',
      paragraphs: [
        {
          text: 'FITFORM podrá recabar directamente del Usuario, a través de su sitio web, aplicaciones, plataformas de reservaciones, formularios, comunicaciones, instalaciones o cualquier otro medio autorizado, las siguientes categorías de datos personales:',
        },
        {
          items: [
            'Datos de identificación: nombre completo, fecha de nacimiento, edad, sexo, firma y, cuando resulte necesario, documentación que permita verificar la identidad o edad del Usuario.',
            'Datos de contacto: domicilio, correo electrónico, número telefónico y demás medios de contacto proporcionados por el Usuario.',
            'Datos relacionados con la prestación de los servicios: información sobre membresías, paquetes adquiridos, créditos, reservaciones, cancelaciones, listas de espera, asistencia e historial de clases.',
            'Datos financieros y/o patrimoniales: información necesaria para procesar pagos, cargos recurrentes, penalizaciones, cancelaciones tardías y demás operaciones derivadas de los servicios contratados. Cuando el procesamiento sea realizado por un proveedor independiente, FITFORM podrá no tener acceso a la totalidad de los datos bancarios o financieros del Usuario.',
            'Datos de imagen: fotografías, videos o grabaciones en las que pueda aparecer el Usuario, cuando éste haya otorgado previamente la autorización correspondiente.',
            'Datos obtenidos mediante sistemas de videovigilancia: imagen y demás información que pueda ser captada mediante sistemas de seguridad instalados en las instalaciones.',
          ],
          listStyle: 'lower-alpha',
        },
      ],
    },
    {
      title: 'Finalidades primarias',
      paragraphs: [
        {
          text: 'Los datos personales serán tratados para las siguientes finalidades necesarias para la relación entre FITFORM y el Usuario:',
        },
        {
          items: [
            'Crear, administrar y mantener la cuenta del Usuario.',
            'Identificar y verificar la identidad y edad del Usuario.',
            'Gestionar la contratación de clases, paquetes, membresías o créditos.',
            'Gestionar reservaciones, cancelaciones, listas de espera y asistencia a clases.',
            'Procesar pagos, renovaciones, cargos recurrentes, penalizaciones por Cancelación Tardía, No Show y demás cargos aplicables.',
            'Comunicarse con el Usuario respecto de reservas, disponibilidad, modificaciones de horarios, cancelaciones, pagos y demás cuestiones relacionadas con los servicios contratados.',
            'Administrar la participación del Usuario en las clases y actividades ofrecidas por FITFORM.',
            'Conocer información relevante sobre la condición física o de salud del Usuario cuando resulte necesaria para procurar su seguridad.',
            'Determinar si resulta necesario solicitar autorización médica antes de permitir la participación del Usuario.',
            'Atender solicitudes, aclaraciones, quejas o reclamaciones.',
            'Mantener la seguridad y control de acceso a las instalaciones.',
            'Prevenir e investigar incidentes que puedan poner en riesgo a Usuarios, instructores, empleados o terceros.',
            'Acreditar el cumplimiento de las obligaciones contractuales derivadas de la relación con el Usuario.',
            'Cumplir con obligaciones legales o requerimientos de autoridades competentes.',
          ],
          listStyle: 'lower-alpha',
        },
      ],
    },
    {
      title: 'Finalidades secundarias',
      paragraphs: [
        {
          text: 'Adicionalmente, FITFORM podrá utilizar determinados datos personales para:',
        },
        {
          items: [
            'Enviar promociones, publicidad, novedades y comunicaciones comerciales relacionadas con FITFORM.',
            'Realizar encuestas de satisfacción.',
            'Elaborar estadísticas y análisis sobre el uso de los servicios.',
            'Mejorar la experiencia, productos y servicios ofrecidos.',
            'Utilizar fotografías o videos del Usuario con fines promocionales, publicitarios o de redes sociales, únicamente cuando exista autorización previa y expresa.',
          ],
          listStyle: 'lower-alpha',
        },
        {
          text: 'El Usuario podrá negarse o posteriormente solicitar que sus datos dejen de ser utilizados para dichas finalidades, sin que ello afecte la prestación de los servicios contratados.',
        },
      ],
    },
    {
      title: 'Uso de imagen',
      paragraphs: [
        {
          text: 'FITFORM no utilizará con fines promocionales o publicitarios fotografías o videos en los que el Usuario sea identificable sin contar previamente con su autorización.',
        },
        {
          text: 'Tratándose de menores de edad, dicha autorización deberá ser otorgada por su padre, madre o tutor legal.',
        },
        {
          text: 'La negativa a autorizar el uso de imagen no condicionará ni limitará el acceso a los servicios de FITFORM.',
        },
      ],
    },
    {
      title: 'Menores de edad',
      paragraphs: [
        {
          text: 'FITFORM permite la participación de Usuarios a partir de los 16 años de edad.',
        },
        {
          text: 'Tratándose de Usuarios menores de 18 años, el tratamiento de sus datos personales se realizará con la intervención y autorización de su padre, madre o tutor legal cuando resulte aplicable.',
        },
        {
          text: 'FITFORM podrá solicitar documentación que permita verificar la edad del Usuario y la identidad de quien otorgue dicha autorización.',
        },
      ],
    },
    {
      title: 'Videovigilancia',
      paragraphs: [
        {
          text: 'Las instalaciones de FITFORM podrán contar con sistemas de videovigilancia destinados exclusivamente a:',
        },
        {
          items: [
            'Procurar la seguridad de Usuarios, empleados, instructores y terceros.',
            'Proteger las instalaciones y bienes.',
            'Prevenir e investigar incidentes.',
            'Controlar el acceso a las instalaciones.',
          ],
          listStyle: 'disc',
        },
        {
          text: 'Las imágenes captadas serán tratadas conforme al presente Aviso de Privacidad y no serán utilizadas con fines publicitarios o promocionales salvo que exista autorización expresa del titular.',
        },
      ],
    },
    {
      title: 'Terceros, proveedores y transferencias',
      paragraphs: [
        {
          text: 'Para el cumplimiento de las finalidades señaladas en el presente Aviso de Privacidad, GIP Developers, S.A. de C.V. podrá apoyarse en terceros que presten servicios relacionados con, entre otros:',
        },
        {
          items: [
            'Procesamiento de pagos.',
            'Plataformas de reservaciones.',
            'Almacenamiento de información.',
            'Servicios tecnológicos.',
            'Alojamiento de sitios web.',
            'Comunicaciones electrónicas.',
            'Seguridad y videovigilancia.',
          ],
          listStyle: 'disc',
        },
        {
          text: 'Dichos terceros actuarán por cuenta y conforme a las instrucciones de GIP Developers, S.A. de C.V., cuando jurídicamente corresponda.',
        },
        {
          text: 'Asimismo, los datos personales podrán ser comunicados o transferidos cuando resulte necesario para cumplir obligaciones legales, atender requerimientos de autoridades competentes o ejercer o defender derechos en procedimientos administrativos o judiciales.',
        },
        {
          text: 'Cuando una transferencia requiera consentimiento del titular conforme a la legislación aplicable, éste será solicitado previamente.',
        },
      ],
    },
    {
      title: 'Derechos ARCO',
      paragraphs: [
        {
          text: 'El Usuario podrá ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición respecto de sus datos personales.',
        },
        {
          text: 'Las solicitudes deberán enviarse al correo electrónico: ',
          link: {
            href: 'mailto:contacto@fitform.mx',
            label: 'contacto@fitform.mx',
          },
        },
        {
          text: 'La solicitud deberá contener, cuando menos:',
        },
        {
          items: [
            'Nombre del titular.',
            'Medio para recibir la respuesta.',
            'Documentos que acrediten su identidad o representación.',
            'Descripción clara del derecho que desea ejercer.',
            'Cualquier información que facilite la localización de los datos.',
          ],
          listStyle: 'lower-alpha',
        },
      ],
    },
    {
      title: 'Revocación del consentimiento',
      paragraphs: [
        {
          text: 'El titular podrá solicitar en cualquier momento la revocación del consentimiento otorgado para el tratamiento de sus datos personales, sujeto a las limitaciones y excepciones previstas por la legislación aplicable.',
        },
        {
          text: 'La solicitud podrá realizarse mediante el mismo procedimiento previsto para el ejercicio de los derechos ARCO.',
        },
      ],
    },
    {
      title: 'Limitación del uso o divulgación',
      paragraphs: [
        {
          text: 'El Usuario podrá solicitar que FITFORM limite el uso o divulgación de sus datos personales para determinadas finalidades enviando una solicitud a: ',
          link: {
            href: 'mailto:contacto@fitform.mx',
            label: 'contacto@fitform.mx',
          },
        },
      ],
    },
    {
      title: 'Medidas de seguridad',
      paragraphs: [
        {
          text: 'GIP Developers, S.A. de C.V. adoptará medidas administrativas, técnicas y físicas razonables para proteger los datos personales contra daño, pérdida, alteración, destrucción, acceso, uso o tratamiento no autorizado.',
        },
      ],
    },
    {
      title: 'Cookies y tecnologías similares',
      paragraphs: [
        {
          text: 'El sitio web ',
          link: {
            href: 'https://fitform.mx',
            label: 'https://fitform.mx',
          },
          textAfterLink: ', así como las plataformas o aplicaciones utilizadas por FITFORM, podrán utilizar cookies, identificadores y tecnologías similares con la finalidad de facilitar la navegación, mantener sesiones, recordar preferencias, analizar el uso de los servicios y mejorar la experiencia del Usuario.',
        },
        {
          text: 'El Usuario podrá configurar su navegador o dispositivo para limitar o deshabilitar dichas tecnologías cuando resulte técnicamente posible.',
        },
      ],
    },
    {
      title: 'Modificaciones al Aviso de Privacidad',
      paragraphs: [
        {
          text: 'GIP Developers, S.A. de C.V. podrá modificar el presente Aviso de Privacidad como consecuencia de cambios legales, regulatorios, operativos o relacionados con los servicios ofrecidos.',
        },
        {
          text: 'Cualquier modificación sustancial será informada a través del sitio ',
          link: {
            href: 'https://fitform.mx',
            label: 'https://fitform.mx',
          },
          textAfterLink: ' y, cuando resulte necesario, mediante correo electrónico u otro medio de contacto proporcionado por el Usuario.',
        },
      ],
    },
    {
      title: 'Consentimiento',
      paragraphs: [
        {
          text: 'Al proporcionar sus datos personales después de que el presente Aviso de Privacidad haya sido puesto a su disposición, el Usuario reconoce haber conocido su contenido y acepta el tratamiento de sus datos conforme a las finalidades aquí establecidas, sujeto a las reglas de consentimiento previstas por la legislación aplicable.',
        },
      ],
    },
    {
      title: 'Contacto',
      paragraphs: [
        {
          text: 'Para cualquier consulta, aclaración o solicitud relacionada con el presente Aviso de Privacidad, puede contactarnos a: ',
          link: {
            href: 'mailto:contacto@fitform.mx',
            label: 'contacto@fitform.mx',
          },
        },
      ],
    },
  ],
};
