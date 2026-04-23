export const bsportWidgetConfigs = {
  loginButton: {
    widgetType: 'loginButton',
    fullScreenPopup: true,
    config: {
      loginButton: { openMemberProfile: true },
    },
  },
  consumerSpace: {
    widgetType: 'consumerSpace',
    fullScreenPopup: true,
    config: {
      consumerSpace: {
        loginSubtitle: '',
        loginTitle: 'Mi perfil',
        showSubtitle: false,
        showTitle: true,
        hideNavigation: false,
        defaultPage: 'consumerBooking',
      },
    },
  },
  pass: {
    widgetType: 'pass',
    fullScreenPopup: false,
    config: { pass: {} },
  },
  calendar: {
    widgetType: 'calendar',
    fullScreenPopup: false,
    config: { calendar: {} },
  },
  shop: {
    widgetType: 'shop',
    fullScreenPopup: false,
    config: { shop: {} },
  },
} as const;

export type BSportWidgetVariant = keyof typeof bsportWidgetConfigs;
