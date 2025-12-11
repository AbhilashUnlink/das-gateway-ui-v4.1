import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
// import countries from "../../../config/common/countries";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DateRangePicker from "./date-range-picker";
import { useTranslation } from "react-i18next";
import { HEADER_COLUMN, HOLIDAY_NAME_SPECIAL_CHARACTERS, HTML_ELEMENT } from "../constants/filter-constants";
import SelectWithSearch from "./SelectWithSearch";
import { showInAscendingOrder } from "../../../utils/helper";
import NewDateRangePicker from "./new-date-range-picker";

const NewFormField = ({ data, onHandleChange, classname, values, dateFormat, showMonthYearPicker, ReleasedPastFutureDate }: any) => {

  const [textValue, setTextValue] = useState(
    values[data.name] ? values[data.name] : ""
  );
  const [multiValue, setMultiple] = useState(
    values[data.name] && Array.isArray(values[data.name]) ? values[data.name] : []
  );
  useEffect(() => {
    if (values && data.multiple && data.html_element === HTML_ELEMENT.SELECT) {
      setMultiple(values[data.name] && Array.isArray(values[data.name]) ? values[data.name] : []);
    } else if (values) {
      setTextValue(values[data.name] ? values[data.name] : "");
    } else {
      setTextValue("");
      setMultiple([]);
    }
  }, [values, data]);

  const { t } = useTranslation();

  return (
    <span className={classname}>
      <div className="box-listing edit-box">
        {data.html_element === HTML_ELEMENT.TEXT_FIELD ? (
          <div>
            <TextField
              type={data?.type}
              value={textValue}
              onChange={(event) => {

                if ([HEADER_COLUMN.HOLIDAY].includes(values?.HeaderColumn)) {
                  const filteredValue = event.target.value.split('').filter(char => !HOLIDAY_NAME_SPECIAL_CHARACTERS.includes(char)).join('');
                  onHandleChange(data.name, filteredValue);
                  setTextValue(filteredValue);
                }
                else {
                  onHandleChange(data.name, event.target.value);
                }
              }
              }
              label={t(data.label)}
              variant="outlined"
              disabled={values.HeaderColumn === "" ? true : false}
              autoComplete='off'
            />
          </div>
        ) : data.html_element === HTML_ELEMENT.SELECT ? (
          <>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t(data.label)}
              </InputLabel>
              <Select
                id="filter-select"
                style={{ width: "100%" }}
                value={data.multiple ? multiValue : textValue}
                size="small"
                autoWidth={true}
                multiple={data.multiple}
                placeholder="Select"
                onChange={(event) =>
                  onHandleChange(data.name, event.target.value)
                }
              >
                {data.options?.sort(showInAscendingOrder)?.map((itm: any, i: number) => {
                  return (
                    <MenuItem key={i} value={itm.value} className="menu-ui-list">
                      {itm.headerName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </>
        )
          : data.html_element === HTML_ELEMENT.DATE_RANGE_PICKER ? (
            <>
              <FormControl fullWidth>
                <DateRangePicker
                  onHandleChange={onHandleChange}
                  name={data.name}
                  values={values}
                  usingIn={"filter-popup"}
                  showMonthYearPicker={showMonthYearPicker}
                  dateFormat={dateFormat}
                  ReleasedPastFutureDate={ReleasedPastFutureDate}
                />
              </FormControl>
            </>
          )
            : data.html_element === HTML_ELEMENT.NEW_DATE_RANGE_PICKER ? (
              <>
                <FormControl fullWidth>
                  <NewDateRangePicker
                    onHandleChange={onHandleChange}
                    name={data.name}
                    values={values}
                  />
                </FormControl>
              </>
            )
              : data.html_element === HTML_ELEMENT.SELECT_WITH_SEARCH ? (
                <>
                  <div className="autocomplete-dasmid">
                    <SelectWithSearch
                      name={data.name}
                      option={data.options}
                      onHandleChange={onHandleChange}
                      textValue={textValue}
                      values={values}
                      multiple={data.multiple}
                    />
                  </div>
                </>
              )
                : (
                  ""
                )}
      </div>
    </span>
  );
};

export default NewFormField;