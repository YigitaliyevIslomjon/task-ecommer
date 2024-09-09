const config = {
  api: {
    accessTokenKey: 'accessToken',
    refreshTokenKey: 'refreshToken'
  },
  app: {
    confirmTime: 60000,
    sidebarCollapsedKey: 'sidebarCollapsed',
    sidebarMobileCollapsedKey: 'sidebarMobileCollapsedKey'
  },
  language: {
    key: 'language',
    initial: 'uz',
    list: ['uz', 'ru', 'oz']
  },
  list: {
    perPage: 30
  },
  services: {
    user: 'api/user/v1',
    project: 'api/project/v1',
    file: 'api/file-service/v1',
    auxDk: 'api/aux-dk/v1',
    auxIk: 'api/aux-ik/v1',
    auxJk: 'api/aux-jk/v1',
    auxIncomeOutgoing: 'api/aux-income-outgoing/v1',
    auxExecutors: 'api/aux-executors/v1'
  } as const,
  externalServices: {
    faceIdWS: 'wss://faceid.adliya.uz/ws'
  },
  support: {
    phone: '+998991654232'
  }
};

type Keys = keyof typeof config.services;
export type ServiceType = (typeof config.services)[Keys];

export default config;
