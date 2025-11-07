import i18n from "i18n";

export const HASH_CARD_STATUS:any =[
    {
        label: i18n.t('FinanceStatements.StatusTypes.ACTIVE'),
        value: '1',
      },
      {
        label: i18n.t('FinanceStatements.StatusTypes.INACTIVE'),
        value: '0',
      }
    ];
    export const CATALOG_CATEGORY_STATUS:any =[
      {
          label: i18n.t('FinanceStatements.StatusTypes.ACTIVE'),
          value: 'true',
        },
        {
          label: i18n.t('FinanceStatements.StatusTypes.INACTIVE'),
          value: 'false',
        }
      ];


    export const CATALOG_STATUS: any = {
      "true": i18n.t('FinanceStatements.StatusTypes.ACTIVE'),
      "false": i18n.t('FinanceStatements.StatusTypes.INACTIVE'),
    };