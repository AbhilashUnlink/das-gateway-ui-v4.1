import {
  Autocomplete,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OPERATORS_VALUE, operatorOptionsMap } from './filterOptions';
import { resetInitialFilter } from 'store/features/gateway-config';
import { useDispatch } from 'react-redux';
import { FILTER_INPUT_TYPES, HAS_3DS_TYPE, HEADER_COLUMN, View_Name_Space } from './constants/filter-constants';
import { showInAscendingOrder } from 'utils/helper';
import DateRangePicker from './component/date-range-picker';
import NewDateRangeFilter from './component/NewDateRangeFilter';
import { CloseSvgIcon, NextGenFilterSvgIcon, PlusSvgIcon, ResetSvgIcon } from 'components/svg-icons/SvgIcons';
import TooltipDasButton from 'pages/transaction/components/buttons/TootlipDasButton';

export const NewFilterBox = ({
  filters,
  options,
  handleKeyDown,
  handleChange,
  handlePlusClick,
  allFilters,
  handleRemove,
  handleResetFilter,
  handleApplyFilter,
  handleSelectFilter,
  selectedFilter,
  getOptions,
  ns,
  handleEditChip,
  handleOperator,
  handleField,
}: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const OnNewFilterClick = () =>{
    setOpenFilter(!openFilter);
  };
  const isBetOp = filters?.operator == OPERATORS_VALUE.BETWEEN || filters?.operator == OPERATORS_VALUE.NOT_BETWEEN;

  // const selectMode = (filters?.operator === 'in' || filters?.operator === 'notin') ? options?.find(
  //   (item: any) => item.label === filters?.fieldLabel,
  // )?.multiple 
  // :
  // false;
  const selectMode = (filters?.operator === OPERATORS_VALUE.IN || filters?.operator === OPERATORS_VALUE.NOT_IN) ? true : false;

  const getWidth = (val: string, fallback: string = 'Value') =>
    `${Math.max((val || fallback).length, 1)}ch`;
const [filterPop, setFilterPop]= useState(false);
  const handleFilterPopClose = () =>{
    setFilterPop(false);
  };

  const renderChips = useMemo(() => {
    return (
      <Stack className="filter-chips">
        <IconButton onClick={() => handleFilterPopClose()} style={{position:'absolute', right:'-13px', top:'-13px', width:'36px', height:'36px', padding:'10px 5px 5px'}}>
            <CloseSvgIcon/>
          </IconButton>
        {allFilters?.length > 0 &&
          allFilters.map((filter: any, index: number) => {
            const valueFilter =
              filter.selectFilterType === FILTER_INPUT_TYPES.AUTOSELECT
                ? Array.isArray(filter?.valueLabel)
                  ? filter?.valueLabel?.map((i: any) => {
                    return i?.showValue ?? i?.value;
                  })
                  : filter?.valueLabel?.showValue ?? filter?.valueLabel?.value
                : filter?.valueLabel;
            const bgColor = filter?.id === filters?.id ? "#e6c2c2" : 'var(--bs-blue-light)';
            return (
              <React.Fragment key={"filter" + index}>
                {(allFilters?.length - index) < allFilters?.length && <Chip
                  key={index + 1}
                  label={filter?.operand}
                  sx={{
                    fontSize: 'smaller',
                    height: 'fit-content',
                    padding: '5px 0px',
                    backgroundColor: '#e4b6b0',
                    color: '#000',
                  }}
                />}
                {Array.isArray(filter.valueLabel) ? (
                  <Chip
                    key={index}
                    label={`${filter.fieldLabel} ${filter.operatorLabel
                      } ${filter.value !== 'N/A' ? valueFilter?.map((str: string) => str) : ''}`}
                    onClick={() => handleEditChip(filter)}
                    onDelete={() => handleRemove(index)}
                    // color={filter?.id === filters?.id ? 'warning' : 'primary'}
                    sx={{
                      fontSize: 'smaller',
                      height: 'fit-content',
                      padding: '5px 0px',
                      // backgroundColor:'#e0c4ae',
                      backgroundColor: bgColor,
                      color: '#000',
                      "& .MuiChip-deleteIcon": {
                        color: "#7a5e39", // Change cross icon color
                        fontSize: "16px", // Increase size
                        "&:hover": {
                          color: "darkred", // Hover effect
                        },
                      },
                    }}
                  />
                ) : (
                  <Chip
                    key={index}
                    label={`${filter.fieldLabel} ${filter.operatorLabel} ${filter.value != 'N/A' ? valueFilter : ''}`}
                    onClick={() => handleEditChip(filter)}
                    onDelete={() => handleRemove(index)}
                    // color={filter?.id === filters?.id ? 'warning' : 'primary'}
                    sx={{
                      fontSize: 'smaller',
                      height: 'fit-content',
                      padding: '5px 0px',
                      // backgroundColor:'#e0c4ae',
                      backgroundColor: bgColor,
                      color: '#000',
                      "& .MuiChip-deleteIcon": {
                        color: "#7a5e39", // Change cross icon color
                        fontSize: "16px", // Increase size
                        "&:hover": {
                          color: "darkred", // Hover effect
                        },
                      },
                    }}
                  />
                )}
              </React.Fragment>
            );

          })}
      </Stack>
    );
  }, [allFilters, filters, selectedFilter]);




  return (
    <>
    <TooltipDasButton
              title={"FilterPopup.button.NextGenFilter"}
              placement={"top"}
              buttonClassName={"common-button"}
              onClick={OnNewFilterClick}
              icon={
                <NextGenFilterSvgIcon/>
              }
              badge={allFilters?.length}
            />
     {openFilter &&
      <div className="next-gen-filter-wrap">
        <div style={{ width: allFilters?.length === 0 ? '100%' : '100%', display: "flex", alignItems: "center" }}>
          {/* filter initial */}
          {!filters?.field ? (
            <div className="form-group p-0-inline" style={{ width: '100%', margin: '0' }}>
              <Autocomplete
                options={options?.sort(showInAscendingOrder)}
                value={filters?.field}
                onChange={(_e: any, value: any) => {
                  handleChange(
                    'field',
                    value.value,
                    value.label,
                    value?.type,
                  );
                }}
                getOptionLabel={(op: any) => op.label}
                renderInput={params => (
                  <TextField
                    {...params}
                    autoFocus
                    placeholder={t('Filter.field')}
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        '& .MuiInputBase-input::placeholder': {
                          color: '#666666',
                          opacity: 1
                        }
                      }
                    }}
                  />
                )}
                onKeyDown={(e: any) => {
                  !e.target.value && handleKeyDown(e);
                }}
              />
            </div>
          ) : filters?.field && !filters?.operator ? (
            <div className="box-wrap">
              <p className="flex gap-1 text-xs font-normal label-wrap">
                <span onClick={() => handleField()}>{filters?.fieldLabel}</span>
              </p>
              <div
                className="form-group p-0-inline label-form-wrap"
                style={{ paddingLeft: '7px', width: '68%', margin:'0' }}
              >
                <Autocomplete
                  options={operatorOptionsMap[filters.selectFilterType]?.map(
                    (item: any) => {
                      return {
                        label: item.label,
                        value: item.value,
                        oplabel: item.label,
                      };
                    },
                  )}
                  value={filters.operator}
                  onChange={(e, value: any) =>
                    handleChange('operator', value.value, value.oplabel)
                  }
                  getOptionLabel={(op: any) => op.label}
                  renderInput={params => (
                    <TextField
                      {...params}
                      autoFocus
                      placeholder={t('Filter.Operator')}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          '& .MuiInputBase-input::placeholder': {
                            color: '#666666',
                            opacity: 1
                          }
                        }
                      }}
                    />
                  )}
                  onKeyDown={(e: any) => {
                    !e.target.value && handleKeyDown(e);
                  }}
                />
              </div>
            </div>
          ) : (
            // filters?.field &&
            // filters?.operator && 
            (
              <>
                <p className="flex gap-1 text-xs font-normal label-operator-wrap">
                  <span onClick={() => handleField()}>{filters?.fieldLabel} </span>{' '}
                  <span onClick={() => handleOperator()} >{filters?.operatorLabel}</span>
                  {/* {...((filters?.operator == 'isnull' || filters?.operator == 'notnull') &&  {onClick:()=>{handleBackClick();}})} */}
                </p>
                {filters?.operator != 'isnull' && filters?.operator != 'notnull' &&
                  <div className="form-group p-0-inline label-operator-form-wrap" style={{margin:'0', paddingLeft: '7px',}}>
                    {filters.selectFilterType === FILTER_INPUT_TYPES.TEXT && (
                      <TextField
                        type="text"
                        value={filters.value}
                        onChange={(e: any) =>
                          handleChange('value', e.target.value, e.target.value)
                        }
                        className="border-0 text-xs"
                        onKeyDown={(e: any) => handleKeyDown(e)}
                        placeholder="Value"
                        variant="outlined"
                        autoFocus
                      />
                    )}
                    {(filters.selectFilterType === FILTER_INPUT_TYPES.NUMBERSTRING || filters.selectFilterType === FILTER_INPUT_TYPES.NUMBER) && (
                      isBetOp ?
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px', // smaller gap between inline elements
                            fontSize: '14px',
                            width: 'fit-content',
                          }}>
                          <TextField
                            type="number"
                            id="value1-input"
                            value={filters.value1}
                            onChange={(e) => { handleChange('value1', e.target.value, e.target.value); }}
                            onKeyDown={handleKeyDown}
                            autoFocus={filters.value?.[1] ? false : true}
                            placeholder="Value 1"
                            variant="standard"
                            InputProps={{
                              disableUnderline: true,
                              sx: {
                                fontSize: '14px',
                                width: getWidth(filters.value1, 'Value 1'),
                              },
                            }}
                          />

                          <Typography>,</Typography>

                          <TextField
                            type="number"
                            value={filters.value?.[1]}
                            onChange={(e) => handleChange('value', [filters.value1, e.target.value], [filters.value1, e.target.value])}
                            onKeyDown={handleKeyDown}
                            placeholder="Value 2"
                            variant="standard"
                            autoFocus={filters?.value1 ? true : false}
                            InputProps={{
                              disableUnderline: true,
                              sx: {
                                fontSize: '14px',
                                // width: getWidth(filters.value2, 'Value 2'),
                                width: '100%',
                              },
                            }}
                          />
                        </Box>
                        :
                        <TextField
                          type="number"
                          value={filters.value}
                          onChange={(e: any) =>
                            handleChange('value', e.target.value, e.target.value)
                          }
                          className="w-[100%] border-0 text-xs"
                          onKeyDown={(e: any) => handleKeyDown(e)}
                          placeholder="Value"
                          variant="outlined"
                          autoFocus
                        />
                    )}
                    {(filters.selectFilterType === FILTER_INPUT_TYPES.SELECTWITHOUTIN || filters.selectFilterType === FILTER_INPUT_TYPES.SELECT) && (
                      <Select
                        id="filter-select"
                        style={{ width: "100%" }}
                        multiple={selectMode}
                        autoFocus
                        value={
                          selectMode
                            ? Array.isArray(filters.value)
                              ? filters.value
                              : [] // Ensure array for multiple mode
                            : filters.value // Ensure object or null for single mode
                        }

                        // placeholder="Select an option"
                        onChange={(e: any) => {
                          if (filters?.field === HEADER_COLUMN?.HAS_3DS) {
                            if (Array.isArray(e.target.value)) {
                              const data = e.target.value?.map((i: any) => {
                                return HAS_3DS_TYPE[i];
                              });
                              handleChange("value", e.target.value, data);
                            } else {
                              handleChange("value", e.target.value, HAS_3DS_TYPE[e.target.value]);
                            }
                          } else {
                            handleChange("value", e.target.value, e.target.value);
                          }
                        }}
                        defaultOpen={true}
                        displayEmpty
                        onClose={() => {
                          setTimeout(() => {
                            document.getElementById("filter-select")?.focus();
                          }, 100);
                        }}
                        MenuProps={{
                          PaperProps: {
                            onKeyDown: (e: any) => {
                              handleKeyDown(e);
                            },
                          }
                        }}
                        className="w-full text-xs"
                      >
                        {getOptions(filters?.field).map(
                          ({ headerName, value }: any, index: number) => (
                            <MenuItem key={index} value={value}>
                              <p>{headerName}</p>
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                    {filters.selectFilterType === FILTER_INPUT_TYPES.AUTOSELECT && (
                      <Autocomplete
                        options={getOptions(filters?.field)}
                        onKeyDown={(e: any) => {
                          !e.target.value && handleKeyDown(e);
                        }}
                        multiple={selectMode}
                        openOnFocus={true}
                        // value={filters.value === '' ? selectMode ? [] : "" : filters.value }
                        value={
                          selectMode
                            ? Array.isArray(filters.value)
                              ? filters.value
                              : [] // Ensure array for multiple mode
                            : filters.value // Ensure object or null for single mode
                        }
                        disableCloseOnSelect
                        disableClearable={true}
                        onChange={(e: any, value: any) => {
                          handleChange('value', value, value);
                        }}
                        getOptionLabel={(op: any) => op.headerName ?? ''}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        renderOption={(props, option) => (
                          <li
                            {...props}
                            key={`${option.headerName}-${option.key}`}
                          >
                            {option.headerName}
                          </li>
                        )}
                        // {...(filters?.value != '' && {value:filters?.value})}
                        renderInput={params => (
                          <TextField
                            {...params}
                            autoFocus
                            placeholder={selectMode ? filters.value?.length > 0 ? '' : t('Filter.Value') : t('Filter.Value')}
                            InputProps={{
                              ...params.InputProps,
                              sx: {
                                '& .MuiInputBase-input::placeholder': {
                                  color: '#666666',
                                  opacity: 1
                                }
                              }
                            }}
                          />
                        )}
                      />
                    )}
                    {filters.selectFilterType === FILTER_INPUT_TYPES.DATEPICKERRANGE && (
                      <DateRangePicker
                        onHandleChange={(name: any, value: any) =>
                          handleChange(name, value, value)
                        }
                        onKeyDown={(e: any) => handleKeyDown(e)}
                        autoFocus
                        name="value"
                        placeholder="Value"
                        values={filters.value}
                        usingIn=""
                        showMonthYearPicker={false}
                        dateFormat="dd/MM/yyyy"
                        className="w-full text-xs"
                      />
                    )}
                    {filters.selectFilterType === FILTER_INPUT_TYPES.MONTHPICKER && (
                      <DateRangePicker
                        onHandleChange={(name: any, value: any) =>
                          handleChange(name, value, value)
                        }
                        name="value"
                        placeholder="Value"
                        values={filters.value}
                        usingIn=""
                        showMonthYearPicker={true}
                        dateFormat="dd/MM/yyyy"
                        className="w-full text-xs"
                      />
                    )}
                    {filters.selectFilterType === FILTER_INPUT_TYPES.NEWDATERANGEPICKER && (
                      <NewDateRangeFilter
                        onHandleChange={(name: any, value: any) =>
                          handleChange(name, value, value)
                        }
                        onKeyDown={(e: any) => handleKeyDown(e)}
                        placeholder="Value"
                        name="value"
                        values={filters.value}
                        className="w-full text-xs"
                      />
                    )}
                  </div>}
              </>
            )
          )}
          {/* and or button */}
          {allFilters?.length >= 1 && <div style={{ width: '19%' }}>
          <div className="form-group p-0-inline label-and-or-form-wrap" style={{margin:'0', paddingLeft: '7px',}}>
            <Select
              style={{ width: '100%' }}
              id="filter-select"
              name="operand"
              value={selectedFilter}
              size="small"
              autoWidth={true}
              className="select-operand-box"
              // disabled
              // multiple={data.multiple}
              // placeholder="Select"
              onChange={event => handleSelectFilter(event.target.value)}
            >
              {['AND', 'OR']?.map((itm: any, i: number) => {
                return (
                  <MenuItem key={i} value={itm} className="menu-ui-list">
                    {itm}
                  </MenuItem>
                );
              })}
            </Select>
              </div>
          </div>}

          <div style={{ display: "flex", gap: "5px" }}>
            <button className={"new-gen-filter-action-button"}
              disabled={!filters?.field || !filters?.operator || !filters?.value}
              onClick={() =>{
                 handlePlusClick();
                setFilterPop(true);
              }
              }
            >
              <PlusSvgIcon />
            </button>
            <button className={"new-gen-filter-action-button"}
              onClick={() => {
                handleResetFilter();
                setFilterPop(false);
                if (ns === View_Name_Space.TRANSACTION) {
                  dispatch(resetInitialFilter());
                }
              }}
            >
              <ResetSvgIcon />
            </button>

            <button className={"new-gen-filter-action-button"}
              disabled={
                !(allFilters?.length > 0) &&
                (!filters?.field || !filters?.operator || !filters?.value)
              }
              onClick={() => {
                handleApplyFilter();
                setFilterPop(true);
                if (ns === View_Name_Space.TRANSACTION) {
                  dispatch(resetInitialFilter());
                }
              }}
            >
              {t('Filter.button.Apply')}
            </button>
          </div>
        </div>


        {allFilters?.length > 0 && filterPop && openFilter && renderChips}

      </div>
}
    </>
  );
};
