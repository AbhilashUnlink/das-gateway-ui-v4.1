
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { HEADER_COLUMN } from '../constants/filter-constants';

export default function SelectWithSearch({
  name,
  option,
  onHandleChange,
  values,
  multiple = false,
  textValue
}: any) {

  const [options, setOptions] = useState<any>([]);


  const [value, setValue] = useState(
    values["Name"] ? values["Name"] : ""
  );
  const [multiValue, setMultiple] = useState(
    values["Name"] && Array.isArray(values["Name"]) ? values["Name"] : []
  );

  useEffect(() => {
    if (option && option?.length > 0) {
      if (values['Name']?.length > 0 && multiple) {
        setOptions([...new Set([...values['Name'], ...option])]);
      } else {
        setOptions([...new Set(option)]);
      }
    }
  }, [option]);


  useEffect(() => {
    if (values && multiple) {
      setMultiple(values["Name"] && Array.isArray(values["Name"]) ? values["Name"] : []);
    } else if (values) {
      setValue(values["Name"] ? values["Name"] : "");
    } else {
      setValue("");
      setMultiple([]);
    }
  }, [values]);

  const defaultProps = {
    options: options,
    getOptionLabel: (option: any) => values.HeaderColumn===HEADER_COLUMN.ACQUIRER_CODE?option?.toUpperCase():option,
  };

  function safeDecodeURIComponent(uri: any) {
    try {
      return decodeURIComponent(uri);
    } catch (e) {
      return uri; 
    }
  }


  if (option?.length > 0) {
    return (
      <div className="auto-complete-comp">
        <Autocomplete
          {...defaultProps}
          id="controlled-demo-dasmid"
          value={multiple ? multiValue : safeDecodeURIComponent(value)}
          disableCloseOnSelect
          multiple={multiple}
          disableClearable={true}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (multiple) {
              const newOptions = options.filter((item: any) => !newValue.includes(item));
              setOptions([...newValue, ...newOptions]);
              onHandleChange(name, newValue);
            } else {
              onHandleChange(name, encodeURIComponent(newValue));
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              placeholder={multiple ? multiValue?.join(",") : value}
              label="Value"
              variant="outlined"
              id="outlined-basic"
            />
          )}
        />
      </div>
    );
  } else {
    return (
      <TextField
        value={textValue}
        id="outlined-basic"
        onChange={event => {
          if (values.HeaderColumn === HEADER_COLUMN.DASMID || values.HeaderColumn === HEADER_COLUMN.DAS_MID) {
            onHandleChange(name, event.target.value.trim().split(/ +/).join(''));
          } else {
            onHandleChange(name, event.target.value);
          }
        }}
        label={'Value'}
        variant="outlined"
        autoComplete="off"
      />
    );
  }
}
