import { getTimezoneOffset } from 'date-fns-tz';

export const useCreateFilterString = (data: any) => {
  let oldDate = new Date(data?.StartDate);
  let timeZone: any = localStorage.getItem('timeZone');
  let newDate = new Date(
    oldDate.getTime() + getTimezoneOffset(timeZone, oldDate),
  );
  if (Object.keys(data).length === 0) {
    return undefined;
  }
  let filter = '';
  for (let key in data) {
    filter = `${filter}&${key}=${key === 'StartDate'
      ? `${newDate.toISOString()}&EndDate=${newDate.toISOString()}`
      : data[key]
      }`;
  }
  return filter;
};
