/* eslint-disable @typescript-eslint/no-explicit-any */
import { DATE_FORMATS_OPTIONS } from "../../components/constants/date-formats";
import { formatInTimeZone } from 'date-fns-tz';
import { useSelector } from 'react-redux';

const useDateFormatter = () => {
  const selectedFormatType = useSelector(
    (store: any) =>
      store?.config?.userPreference?.dateFormatType
  );

  const filterDateFormatter = (val: Date | string): string => {
    const patternStr = selectedFormatType || DATE_FORMATS_OPTIONS.DATE_TIME_AM_PM;


    const selectedTimeZone = localStorage.getItem('timeZone') || 'Asia/Calcutta';

   
    return formatInTimeZone(new Date(val), selectedTimeZone, patternStr);
  };


  return { filterDateFormatter };
};

export default useDateFormatter;
