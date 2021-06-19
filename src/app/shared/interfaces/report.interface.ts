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
    socialLinks: [{
      // vk, insta
      type: string,
      url: string
    }]
  },
  // надежность
  reliability: {
    result: string;
    moreInfo: MoreInfoInterface[]
  },
  // свободный лимит, сколько можно выделить этому ЮЛ. считается также динамика роста и перспективы.
  freelimit: {
    result: string;
    moreInfo: MoreInfoInterface[]
  },
  // текущая себестоимость ЮЛ - его компания, имущество, доходы и тд.
  companyPrice: {
    result: string;
    moreInfo: MoreInfoInterface[]
  },
  // итоговое решение системы - доверять или нет
  verdict: {
    result: string;
    moreInfo: MoreInfoInterface[]
  },
  // массив похожих организаций
  sameOrganizationList: [{
    inn: string,
    name: string,
    tags: [{
      // warning, success, bad
      type: string;
      title: string
    }]
  }]
}

export interface MoreInfoInterface {
  key: string;
  value: string;
}
