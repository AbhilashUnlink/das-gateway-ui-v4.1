import { useEffect, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import {
    endOfDay,
    format,
    //  set, 
    startOfDay,
    subMonths
} from 'date-fns';
import { TextField } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import "./style.css";
import RelativeFilter from './relative-filter';
import CustomTimePicker from './custom-time-picker';
import { Button } from 'antd';
import { filterDateFormatterNoTimeZone } from 'utils/helper';

const NewDateRangePicker = ({
    onHandleChange,
    name,
    values,
    dateFormat = 'yyyy/MM/dd HH:mm:ss',
}: any) => {
    const { t } = useTranslation();
    const IBEC_Date_Format = 'dd MMMM yyyy, HH:mm:ss';
    const PICKER_TYPES = {
        ABSOLUTE: "ABSOLUTE",
        RELATIVE: "RELATIVE",
    };
    const [pickerType, setPickerType] = useState(PICKER_TYPES.ABSOLUTE);
    const [dateRange, setDateRange] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        if (Array.isArray(values.Name)) {
            setDateRange(values.Name);
        } else {
            setDateRange([]);
        }
    }, [values]);

    const [startDate, endDate] = dateRange;
    const [start, setStart] = useState<any>(null);
    const [end, setEnd] = useState<any>(null);
    useEffect(() => {
        if (end) {
            setDateRange([start, end]);
            onHandleChange(name, [start, end]);
        }
    }, [end]);

    const getDateFormat = (date: any) => {
        if (date) {
            return format(date, dateFormat);
        } else {
            return "";
        }
    };
    const handleCalanderClose = () => {
        if (dateRange?.filter((item: any) => item)?.length === 1) {
            setDateRange([startDate, endOfDay(startDate)]);
            onHandleChange(name, [startDate, endOfDay(startDate)]);
        } else {
            return;
        }
    };

    const [minutes, setMinutes] = useState("00");
    const [hours, setHours] = useState("00");
    const [days, setDays] = useState("0");

    const props = { minutes, setMinutes, hours, setHours, days, setDays, setDateRange, setIsOpen, name, onHandleChange };


    const CustomTimeInput = (
    ) => {
        return (
            <div>
                {
                    pickerType === PICKER_TYPES.ABSOLUTE && <>
                        <div className='hr'></div>
                        <div className='w-100 flex-row space-between mt-20 gap-1'>
                            <div className='date-time-div'>
                                <b onClick={() => startDate && setDateRange([startOfDay(startDate), endDate])}>
                                    {t("Start")}
                                </b>
                                <span>
                                    <CustomTimePicker
                                        initialValue={dateRange && dateRange[0] ? filterDateFormatterNoTimeZone(dateRange[0].getTime(), "HH:mm:ss") : "00:00:00"}
                                        name={"startTime"} dateRange={dateRange} setDateRange={setDateRange}
                                        onHandleChange={onHandleChange}
                                        dateName={name}
                                    />
                                </span>
                            </div>
                            <div className='date-time-div'>
                                <b onClick={() => endDate && setDateRange([startDate, endOfDay(endDate)])}>
                                    {t("End")}
                                </b>
                                <span>

                                    <CustomTimePicker
                                        initialValue=
                                        {dateRange && dateRange[0] && dateRange[1] ?
                                            filterDateFormatterNoTimeZone(dateRange[1].getTime(), "HH:mm:ss")
                                            : dateRange && dateRange[0] && !dateRange[1]
                                                ? "23:59:59"
                                                : "00:00:00"}
                                        name={"endTime"} dateRange={dateRange} setDateRange={setDateRange}
                                        dateName={name}
                                        onHandleChange={onHandleChange}
                                    />
                                </span>

                            </div>
                            <Button onClick={() => {
                                handleCalanderClose();
                                setIsOpen(false);
                            }} >
                                {t("OK")}
                            </Button>
                        </div>
                    </>
                }
                <div className='mt-20'></div>
            </div>

        );
    };

    const MyContainer = ({ className, children }: any) => {
        return (
            <CalendarContainer className={`${className} border-1-gray p-10 w-31`}>
                <div className='my-container gap-1' >
                    <div className='w-32 flex-row gap-1px'>
                        <button
                            disabled={pickerType === PICKER_TYPES.ABSOLUTE}
                            onClick={() => {
                                setPickerType(PICKER_TYPES.ABSOLUTE);
                                if (startDate && endDate) {
                                    setDateRange([startOfDay(startDate), endOfDay(endDate)]);
                                    onHandleChange(name, [startOfDay(startDate), endOfDay(endDate)]);
                                }
                            }}
                            className={`absolute-relative ${pickerType === PICKER_TYPES.ABSOLUTE ? "active" : ""} abs`}>
                            {t("ABSOLUTE")}
                        </button>
                        <button
                            disabled={pickerType === PICKER_TYPES.RELATIVE}
                            className={`absolute-relative ${pickerType === PICKER_TYPES.RELATIVE ? "active" : ""}`}
                            onClick={() => {
                                setPickerType(PICKER_TYPES.RELATIVE);
                                // setDateRange([startOfDay(new Date()), endOfDay(new Date())]);
                            }}
                        >
                            {t("RELATIVE")}
                        </button>
                    </div>
                    <div className='w-66 flex-end'>
                        <div className="flex-row space-between">
                            <div className="flex-row gap-1 f-11">
                                {
                                    !startDate ? "" :
                                        !endDate ?
                                            `${filterDateFormatterNoTimeZone(startDate, IBEC_Date_Format)} - ${filterDateFormatterNoTimeZone(endOfDay(startDate), IBEC_Date_Format)}`
                                            :
                                            `${filterDateFormatterNoTimeZone(startDate, IBEC_Date_Format)} - ${filterDateFormatterNoTimeZone(endDate, IBEC_Date_Format)}`
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ position: "relative" }}>
                    {
                        pickerType === PICKER_TYPES.ABSOLUTE ?
                            children :
                            <div style={{ position: "relative" }}>
                                <RelativeFilter {...props} />
                            </div>
                    }

                </div>
            </CalendarContainer>
        );
    };





    const OurTextField = () => {
        return (
            <TextField
                id="outlined-basic"
                size="medium"
                inputProps={{ style: { fontSize: 11, height: 20 } }}
                label={t<string>('Filter.Value')}
                value={
                    !startDate ? "" :
                        !endDate ?
                            `${getDateFormat(startDate)} - ${getDateFormat(endOfDay(startDate))}`
                            :
                            `${getDateFormat(startDate)} - ${getDateFormat(endDate)}`
                }
                autoComplete="off"
            />
        );
    };

    if (isOpen) {

        return (
            <div className="date-range-picker">

                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    isClearable={true}
                    timeInputLabel=""
                    showTimeInput
                    customTimeInput={<CustomTimeInput />}
                    endDate={endDate}
                    dateFormat={dateFormat}
                    monthsShown={2}
                    onCalendarClose={handleCalanderClose}
                    shouldCloseOnSelect={false}
                    onChange={(update: any) => {
                        // const start: any = startOfDay(update[0]) || null;
                        // const newStart: any = start && set(start, {
                        //     hours: 0,
                        //     minutes: 0,
                        //     seconds: 0,
                        // });

                        let ndateRange: any = [...update];
                        setDateRange(ndateRange);
                        onHandleChange(name, ndateRange);
                        if (ndateRange?.filter((item: any) => item)?.length > 1) {
                            setStart(startOfDay(ndateRange[0]));
                            setEnd(endOfDay(ndateRange[1]));
                        }

                    }
                    }
                    maxDate={new Date()}


                    customInput={
                        <div onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }}>
                            <OurTextField
                            />
                        </div>
                    }
                    calendarContainer={MyContainer}
                    openToDate={!startDate ? subMonths(new Date(), 1) : startDate}
                    selected={!startDate ? startOfDay(new Date()) : startDate}
                />



            </div>
        );
    } else {
        return (<>
            <div onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
            }}>

                <OurTextField />
            </div>
            {/* {pickerType === PICKER_TYPES.RELATIVE &&
                    <>
                        <hr className='mt-20' />
                        <div className='mt-20 flex-row space-between'>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (pickerType === PICKER_TYPES.RELATIVE && resetRelativeFilter) {
                                        resetRelativeFilter();
                                        setDateRange([new Date(), new Date()]);
                                    } else {
                                        setDateRange([]);
                                        setPickerType(PICKER_TYPES.ABSOLUTE);
                                    }
                                }}
                                className='absolute-relative bg-white border-blue'>
                                Reset
                            </button>
                            <div className='flex-row gap-1'>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPickerType(PICKER_TYPES.ABSOLUTE);
                                        setIsOpen(false);
                                        setShowMyContainer(false);
                                        setDateRange([]);

                                    }}
                                    className='absolute-relative bg-white color-gray border-none'>
                                    Cancel
                                </button>
                                <button className='absolute-relative bg-white color-orange border-orange'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPickerType(PICKER_TYPES.ABSOLUTE);
                                        setIsOpen(false);
                                    }}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </>
                } */}
        </>);
    }

};

export default NewDateRangePicker;



