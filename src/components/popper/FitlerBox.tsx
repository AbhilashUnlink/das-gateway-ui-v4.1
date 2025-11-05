import { Button } from '@mui/material';
import FormField from './component/form-field';
import { AddTask, DeleteOutlineOutlined, Done, RestartAlt } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { resetInitialFilter } from 'store/features/gateway-config';
import { useDispatch } from 'react-redux';
import { View_Name_Space } from './constants/filter-constants';
import { useRef } from 'react';

const FitlerBox = ({
  filterData,
  FilterPopupData,
  getFilterProps,
  onHandleChange,
  dateFormat,
  showMonthYearPicker,
  ReleasedPastFutureDate,
  handleRemoveClick,
  headerName,
  addNewFilterRule,
  handleResetFilter,
  handleApplyFilter,
  disableApplyButton,
  setDisableApplyButton,
  ns
}: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filterHasNoFieldOptionSelected = filterData && filterData?.length > 0 && filterData[0]?.HeaderColumn === "";
  const ref:any = useRef(null);
  return (
    <>
      <div ref={ref} className={ref?.current?.offsetHeight>=450?"filter-scroller": "filter-scroller filter-scroller-visible"}>
        {filterData.map((x: any, i: number) => {
          return (
            <div key={i} className="filter-body">
              {FilterPopupData.form.sections.map((item: any, index: number) => {
                return (
                  <div
                    className={
                      filterData.length > 1 ? 'active-list' : 'detail-list'
                    }
                    key={index}
                  >
                    <div className="inner-details">
                      <>
                        {item.fields.map((filterItems: any, indx: number) => {
                          return (
                            <FormField
                              key={indx}
                              data={{
                                ...getFilterProps(i, filterItems),
                              }}
                              values={x}
                              onHandleChange={(key: string, value: any) =>
                                onHandleChange(key, value, i)
                              }
                              classname={item.columns}
                              dateFormat={dateFormat}
                              showMonthYearPicker={showMonthYearPicker}
                              ReleasedPastFutureDate={ReleasedPastFutureDate}
                            />
                          );
                        })}
                      </>

                      {filterData?.length > 1 && (
                        <Button
                          className="remove-current-filter"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <DeleteOutlineOutlined />
                        </Button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="filter-footer">
        {
          filterData.length < headerName.length && (
            <Button
              className="add-new-filter"
              onClick={() =>
                addNewFilterRule(filterData?.length - 1)
              }
            >
              <AddTask />
              {t('Filter.Add_New_Filter')}
            </Button>
          )}
        <Button disabled={filterHasNoFieldOptionSelected} className="reset-filter" onClick={() => {
          handleResetFilter();
          if (
            ns === View_Name_Space.TRANSACTION
          ) {
            dispatch(resetInitialFilter());
          }
        }
        }>
          <RestartAlt /> {t('Filter.button.Reset')}
        </Button>
        <Button className="Apply-filter"
          disabled={disableApplyButton}
          onClick={
            () => {
              handleApplyFilter();
              setDisableApplyButton(true);
              if (
                ns === View_Name_Space.TRANSACTION
              ) {
                dispatch(resetInitialFilter());
              }
            }}>
          <Done /> {t('Filter.button.Apply')}
        </Button>
      </div>
    </>
  );
};

export default FitlerBox;