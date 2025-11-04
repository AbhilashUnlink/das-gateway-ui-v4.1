import i18n from "../../i18n";
import { ICountries } from "./countries";

export const OnboardingCountries = {
  JP:"JP",
  HK:"HK"
};
export const ResellingCountries = {
  JP:"JP",
  HK:"HK",
  MU:"MU",
  SG:"SG",
  GB:"GB"
};
export const merchantCountries: ICountries = [
  { name: i18n.t('CountryList.Japan'), flag: '🇯🇵', value: OnboardingCountries.JP, label: '+81' },
  { name: i18n.t('CountryList.HongKong'), flag: '🇭🇰', value: OnboardingCountries.HK, label: '+852' },
];
export const resellerCountries: ICountries = [
  { name: i18n.t('CountryList.Japan'), flag: '🇯🇵', value: ResellingCountries.JP, label: '+81' },
  { name: i18n.t('CountryList.HongKong'), flag: '🇭🇰', value: ResellingCountries.HK, label: '+852' },
  { name: i18n.t('CountryList.Singapore'), flag: '🇸🇬', value: ResellingCountries.SG, label: '+65' },
  { name: i18n.t('CountryList.Mauritius'), flag: '🇲🇺', value: ResellingCountries.MU, label: '+230'  },
  { name: i18n.t('CountryList.UnitedKingdom'), flag: '🇬🇧', value: ResellingCountries.GB, label: '+44' },
];

export const OnboardingCountriesHideUploadDoc = [
 'JP'
];

