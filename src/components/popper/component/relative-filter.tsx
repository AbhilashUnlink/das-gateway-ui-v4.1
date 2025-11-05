import { sub } from "date-fns";
import "./style.css";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
// import { getformatDate } from "../../../utils/helper";

// Reusable Button Component
const FilterButton = ({ value, selectedValue, onClick }: any) => (
    <button
        onClick={(e) => {
            e.preventDefault();
            onClick(value);
        }}
        className={`${selectedValue === value ? "active " : ""}date-picker-relative-buttons`}
    >
        {value}
    </button>
);

// Reusable Button Group Component
const ButtonGroup = ({ values, selectedValue, onClick }: any) => (
    <div className='hour-minute-button mt-10 flex-row gap-8px'>
        {values?.map((value: any) => (
            <FilterButton
                key={value}
                value={value}
                selectedValue={selectedValue}
                onClick={onClick}
            />
        ))}
    </div>
);

const RelativeFilter = (props: any) => {
    const {
        minutes,
        setMinutes,
        hours,
        setHours,
        days,
        setDays,
        setDateRange,
        setIsOpen,
        name,
        onHandleChange
    } = props;


    const { t } = useTranslation();
    const minuteValues = ["05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
    const hourValues = Array.from({ length: 23 }, (_, i) => String(i + 1).padStart(2, '0'));
    const dayValues = Array.from({ length: 7 }, (_, i) => String(i + 1));

    return (
        <div className="relative-time-pickers">

            <div className='mt-10'>
                {/* <div className="flex-row space-between">
                    <div className="flex-row gap-1">
                        <strong>
                            From
                        </strong>
                        {dateRange?.length > 0 &&
                            <div>
                                {getformatDate(dateRange[0], dateFormat)}
                            </div>
                        }
                    </div>
                    <div className="flex-row gap-1">
                        <strong>
                            To
                        </strong>
                        {dateRange?.length > 1
                            &&
                            <div>
                                {getformatDate(dateRange[1], dateFormat)}
                            </div>
                        }
                    </div>
                </div> */}
                <div className="mt-10 mb-10 hr"></div>
                <span className='relative-filter-label'>{t("Days")}</span>
                <ButtonGroup
                    values={dayValues}
                    selectedValue={days}
                    onClick={(val: any) => {
                        setDays(val);
                        setHours("00");
                        setMinutes("00");
                        const startDate = sub(new Date(), {
                            days: val
                        });
                        setDateRange([startDate, new Date()]);
                        onHandleChange(name, [startDate, new Date()]);
                    }}
                />
            </div>

            <div className='mt-10'>
                <span className='relative-filter-label'>{t("Hours")}</span>
                <ButtonGroup
                    values={hourValues}
                    selectedValue={hours}
                    onClick={(val: any) => {
                        setHours(val);
                        setDays("0");
                        setMinutes("00");
                        const startTime = sub(new Date(), {
                            hours: val
                        });
                        setDateRange([startTime, new Date()]);
                        onHandleChange(name, [startTime, new Date()]);

                    }}
                />
            </div>
            <div className='mt-10'>
                <span className='relative-filter-label'>{t("Minutes")}</span>
                <ButtonGroup
                    values={minuteValues}
                    selectedValue={minutes}
                    onClick={(val: any) => {
                        setMinutes(val);
                        setDays("0");
                        setHours("00");
                        const startTime = sub(new Date(), {
                            minutes: val
                        });
                        setDateRange([startTime, new Date()]);
                        onHandleChange(name, [startTime, new Date()]);
                    }}
                />
            </div>
            <div className="mt-20">
                <div className="hr"></div>
                <div className="mt-13 flex-end from-to-dates">
                    <Button className="orange-ok-button" onClick={() => setIsOpen(false)} >
                        {t("OK")}
                    </Button>
                </div>

            </div>


        </div >
    );
};

export default RelativeFilter;
