import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, getMonth, getYear, lastDayOfMonth } from 'date-fns';
import { TextField } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { csvDateData, setCsvDate } from 'store/features/csvDate';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_COLUMN } from '../constants/filter-constants';
import { useTranslation } from 'react-i18next';

const DateRangePicker = ({
  onHandleChange,
  name,
  values,
  usingIn,
  placeholder,
  showMonthYearPicker = false,
  filedLabelName,
  dateFormat = 'dd/MM/yyyy',
  onKeyDown,
}: any) => {

  const allowFutureDateRange = [HEADER_COLUMN.PAYOUT_DATE, HEADER_COLUMN.RELEASED_DATE, HEADER_COLUMN.DUE_DATE];
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedDateRange = useSelector(csvDateData);
  const [dateRange, setDateRange] = useState<any>([]);
  useEffect(() => {
    if (Array.isArray(values.Name)) {
      setDateRange(values.Name);
    } else {
      setDateRange([]);
    }
  }, [values]);

  const [startDate, endDate] =
    usingIn === 'filter-popup' ? dateRange : selectedDateRange;
  const getDateFormat = (date: any) => {
    if (date) {
      return format(date, 'yyyy/MM/dd');
    } else {
      return "";
    }
  };

  const customMonthInputFormat = () => {
    if (!startDate) {
      return "-";
    }
    if (startDate && !endDate) {
      return `${(getMonth(startDate) + 1).toString().padStart(2, "0")}/${getYear(startDate)} - ${(getMonth(startDate) + 1).toString().padStart(2, "0")}/${getYear(startDate)}`;
    }
    return `${(getMonth(startDate) + 1).toString().padStart(2, "0")}/${getYear(startDate)} - ${(getMonth(endDate) + 1).toString().padStart(2, "0")}/${getYear(endDate)}`;
  };

  return (
    <div className="date-range-picker">
      {!showMonthYearPicker ?
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          isClearable={true}
          endDate={endDate}
          dateFormat={dateFormat}
          onChange={(update) => {
            let ndateRange = [...update];
            dispatch(setCsvDate(ndateRange));
            setDateRange(ndateRange);
            onHandleChange(name, ndateRange);
          }}
          maxDate={allowFutureDateRange.includes(values.HeaderColumn) ? undefined : new Date()}

          customInput={
            <div>
              {' '}
              <TextField
                id="outlined-basic"
                placeholder={placeholder}
                label={!placeholder ? filedLabelName ? filedLabelName : t('Filter.Value') : ""}
                value={
                  !endDate ?
                    `${getDateFormat(startDate)} - ${getDateFormat(startDate)}`
                    :
                    `${getDateFormat(startDate)} - ${getDateFormat(endDate)}`
                }
                autoComplete="off"
                onKeyDown={(e) => onKeyDown(e)}
              />
            </div>
          }
        />
        :
        <DatePicker
          selectsRange={true}
          selected={startDate}
          isClearable={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            if (update.length > 1 && (update[1] instanceof Date)) {
              update[1] = lastDayOfMonth(update[1]);
            }
            let ndateRange = [...update];
            dispatch(setCsvDate(ndateRange));
            setDateRange(ndateRange);
            onHandleChange(name, ndateRange);
          }}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          customInput={
            <div>
              {' '}
              <TextField
                id="outlined-basic"
                label={
                  filedLabelName ? filedLabelName : t("Filter.Value")
                }
                value={
                  customMonthInputFormat()
                }
                autoComplete="off"
                onKeyDown={(e) => onKeyDown(e)}
              />
            </div>
          }
        />
      }
    </div>
  );
};

export default DateRangePicker;
