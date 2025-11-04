import { t } from "i18next";


export const TransactionXrayTheme:any = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
  };
  
  export const StaticXrayListItems:any = [
    
    {
      label: t("Transaction_Xray.Request"),
      lgName: 'DAS-DEV-API-V3-service-direct-payment',
    },
    {
      label: t("Transaction_Xray.Processor"),
      lgName: 'DAS-DEV-API-V3-service-gateway-service',
    },
  ];

  export const getRequestData = (item: any) => {
    try {
      return item.Log;
    } catch (e) {
      return '';
    }
  };
  export const isCurrentTransactionIdSelected = (id: any, currentSelectedId:any) => {
    if (id === currentSelectedId) {
      return 'is-selected';
    }
  };