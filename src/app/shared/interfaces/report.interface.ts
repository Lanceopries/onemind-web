export interface ReportInterface {
  // основная информация
  organization: {
    inn: string;
    // название
    name: string;
    ogrn: string;
    // Работает С
    workFrom: string;
    // тип - ИП, ООО, ОАО и тд
    typePerson: number;
    socialLinks: SocialLinkInterface[];
  };
  // надежность
  reliability: {
    result: string;
    moreInfo: MoreInfoInterface[];
  };
  // свободный лимит, сколько можно выделить этому ЮЛ. считается также динамика роста и перспективы.
  freeLimit: {
    result: string;
    moreInfo: MoreInfoInterface[];
  };
  // текущая себестоимость ЮЛ - его компания, имущество, доходы и тд.
  companyPrice: {
    result: string;
    moreInfo: MoreInfoInterface[];
  };
  // итоговое решение системы - доверять или нет
  verdict: {
    result: string;
    moreInfo: MoreInfoInterface[];
  };
  // массив похожих организаций
  sameOrganizationList: ReportInterface[];
}

export interface SocialLinkInterface {
  // vk, insta
  type: string;
  url: string;
}

export interface MoreInfoInterface {
  key: string;
  value: string;
}
