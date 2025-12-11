export type ICountries = {
  label: string;
  value: string;
}[];

export type FilterPropsType = {
  data_type?: string;
  error?: boolean;
  hidden?: boolean;
  html_element?: string;
  id?: string;
  label: string;
  multiple?: boolean;
  default_value?: string;
  name?: string;
  options?: { headerName: string; value: string }[] | ICountries;
  readOnly?: boolean;
  required?: boolean;
  type?: string;
};

export type HeaderNameType = {
  headerName: string;
  value: string;
}[];

export type FilterPopupPropsType = {
  columns: any;
  multiFilter: any;
  ns: any;
  filter: any;
  dateFormat: string,
  showMonthYearPicker: boolean,
  ReleasedPastFutureDate: boolean,
  customHeaderName: boolean,
  popupClassName: string,
  removePopper?: boolean,
  setDisableRequestDownloadButton?: any
  currentScreen: string,
  dynamicFilter?: boolean
  setSkip?: any,
  initialFilterData?: any,
  setInitialFilterData?: any,
  count?: any,
  setCount?: any
};
