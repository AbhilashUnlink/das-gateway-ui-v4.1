/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const ROWS_OPTIONS_VALUES = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const CustomFooter = ({
  count = 0,
  setSkip,
  take,
  skip,
  setTake,
  // initialRowCount = 0,
  showFooter = false,
  loading = false,
}: any) => {
  const theme = useTheme();
  // Pagination action buttons

  const handleBackToFirstPage = () => {
    setSkip(0);
  };

  const handleNextToLastPage = () => {
    // setSkip(count - take);
    //subtracts 1 to get the index of the last page
    const lastPageSkip = Math.max(Math.floor((count - 1) / take) * take);
    setSkip(lastPageSkip);
  };

  const handleBackButtonClick = () => {
    setSkip((prev: any) => prev - take);
  };
  const handleNextButtonClick = () => {
    setSkip((prev: any) => prev + take);
  };

  //  some inline css as external css is not working ....need to check it with Abhishek sir

  const handleChange = (value: any) => {
    setTake(value);
  };
  const { t } = useTranslation();


  const ROWS_OPTIONS =
    // initialRowCount && !ROWS_OPTIONS_VALUES.includes(initialRowCount) ? [...ROWS_OPTIONS_VALUES, initialRowCount]?.sort((a: any, b: any) => a - b) : 
    ROWS_OPTIONS_VALUES;
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    setPageNumber(Math.floor((take + skip) / take));
  }, [take, skip]);
  const totalPages = Math.ceil(count / take);
  const handlePageChange = () => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setSkip(take * (pageNumber - 1));
    } else {
      // DasSnackbar.error('Please Enter Correct Value');
      setPageNumber(Math.floor((take + skip) / take));
    }
  };
  const getPageNumberInputWidth = (val: any) => {
    if (val < 4) {
      return "2rem";
    } else {
      return `${val * 9}px`;
    }
  };

  return (
    <div className='footer-wrapper'>
      {/* {loading && <h2>Loading ...</h2>} */}
      <div className={loading ? "footer getting-loaded" : "footer"}>
        {showFooter ? (
          <>
            <div className="footer-left">

              {
                count > 10 &&
                <div className='flex-row align-items-center'>

                  <FormControl className="select-rows" size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={take}
                      label="take"
                      onChange={(e: any) => {
                        setSkip(0);
                        handleChange(e.target.value);
                      }}
                    >
                      {
                        ROWS_OPTIONS
                          .map(
                            (item: any, index: any) => {
                              return (
                                <MenuItem key={index} value={item}>
                                  {item}
                                </MenuItem>
                              );
                            },
                          )}
                    </Select>
                  </FormControl>
                </div>
              }

              <div className="rowsperpage"></div>
            </div>
            <div className="footer-right">
              <span className="rowcount">
                <strong> {skip + 1} </strong> {t('AG_GRID_LOCALE.to')}
                <strong> {Math.min(take + skip, count)} </strong>{' '}
                {t('AG_GRID_LOCALE.of')}
                <strong> {count} </strong>
              </span>
              <IconButton
                onClick={handleBackToFirstPage}
                disabled={skip === 0}
                aria-label="first page"
              >
                {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
              </IconButton>
              <IconButton
                onClick={handleBackButtonClick}
                disabled={skip === 0}
                aria-label="previous page"
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </IconButton>
              <span className="rowcount">
                {t('AG_GRID_LOCALE.Page')}
                {/* <strong> {page} </strong>  */}
                <div className='flex-row' >
                  {
                    totalPages > 3 ?
                      <input
                        type='number'
                        style={{
                          width: getPageNumberInputWidth(pageNumber.toString()?.length)
                        }}
                        className='page-number-footer' value={pageNumber} onChange={(e: any) => {
                          setPageNumber(Math.floor(e.target.value));
                        }}
                        onBlur={handlePageChange}

                        onKeyUp={(e: any) => {
                          if (e.key === 'Enter' || e.keyCode === 13) {
                            handlePageChange();
                          }
                        }}

                      /> : <strong>{pageNumber}</strong>
                  }
                  {/* <button
                        onClick={() => {
                        }}
                      >Go</button> */}
                </div>

                of{' '}
                <strong>{totalPages}</strong>
              </span>
              <IconButton
                onClick={handleNextButtonClick}
                disabled={take + skip >= count}
                aria-label="previous page"
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </IconButton>
              <IconButton
                onClick={handleNextToLastPage}
                disabled={take + skip >= count}
                aria-label="last page"
              >
                {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
              </IconButton>
            </div>
          </>
        ) : (
          <strong></strong>
        )}
      </div>
    </div>
  );
};

export default CustomFooter;
