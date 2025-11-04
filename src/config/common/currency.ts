type ICurrency = {
  label: string;
  value: string;
  language: string;
}[];
export const CurrencyTypeForHK = {
  USD: 'USD',
  JPY: 'JPY',
  HKD: 'HKD',
  PHP: 'PHP',
};
export const CurrencyType = {
  SGD: 'SGD',
  USD: 'USD',
  JPY: 'JPY',
  HKD: 'HKD',
  PHP: 'PHP',
};
const Currency: ICurrency = [
  {
    label: 'S$',
    value: CurrencyType.SGD,
    language: 'SG',
  },
  {
    label: '$',
    value: CurrencyType.USD,
    language: '',
  },
  {
    label: '¥',
    value: CurrencyType.JPY,
    language: 'JP',
  },
  {
    label: 'HK$',
    value: 'HKD',
    language: 'HK'
  },
  {
    label: '₱',
    value: 'PHP',
    language: ''
  }
];
export default Currency;


