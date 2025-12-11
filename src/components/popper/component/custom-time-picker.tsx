

import { useState } from "react";
import { set } from 'date-fns';
import "./style.css";

const CustomTimePicker = ({ dateName, initialValue, name = "startTime", dateRange, setDateRange, onHandleChange }: any) => {
    const startDate = () => initialValue ? initialValue : "00:00:00";
    const [value, setValue] = useState(() => startDate());
    return (
        <input
            disabled={dateRange?.length === 0}
            value={value}
            onChange={(e: any) => {
                setValue(e.target.value);
            }}
            onBlur={(e: any) => {
                const value = e.target.value;
                let ourStartDate = dateRange && dateRange[0];
                let ourEndDate = dateRange && dateRange[1];
                if (name === "startTime") {
                    ourStartDate = set(ourStartDate, {
                        hours: value.split(":")[0],
                        minutes: value.split(":")[1],
                        seconds: value.split(":")[2],
                    });
                } else {
                    ourEndDate = ourEndDate ? set(ourEndDate, {
                        hours: value.split(":")[0],
                        minutes: value.split(":")[1],
                        seconds: value.split(":")[2],
                    }) : set(ourStartDate, {
                        hours: value.split(":")[0],
                        minutes: value.split(":")[1],
                        seconds: value.split(":")[2],
                    });
                }
                setDateRange([ourStartDate, ourEndDate]);
                onHandleChange(dateName, [ourStartDate, ourEndDate]);
            }}
            className="filter-absolute-time-picker" type="time"
            step="2"
        />
    );
};

export default CustomTimePicker;
