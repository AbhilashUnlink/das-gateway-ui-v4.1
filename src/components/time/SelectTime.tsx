import { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
// import timezoneIcon from "../../assets/images/time-zone.png";
import './style.css';
import TimeZone from 'config/common/timezone';
export default function SelectTime() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  // 🕒 Helper: extract only "(UTC+05:30)" part
  const extractUTC = (label: string) => {
    const match = label.match(/\(UTC[+-]\d{2}:\d{2}\)/);
    return match ? match[0] : label; // fallback if not found
  };
  let defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(() => {
    if (localStorage.getItem('timeZone')) {
      TimeZone.forEach((k, i) => {
        let selected_tz;
        selected_tz = k.utc.find(tz => tz == localStorage.getItem('timeZone'));
        if (selected_tz) {
          setSelectedIndex(i);
          setSelectedTime(k.label);
        }
        console.log(selected_tz, 'selected_tz');
      });
    } else {
      localStorage.setItem('timeZone', defaultTimeZone);
    }
  }, []);

  const handleMenuItem = (opt: any, index: number) => {
    // localStorage.setItem("currentTime", opt.utc[0]);
    localStorage.setItem('timeZone', opt.utc[0]);
    setSelectedIndex(index);
    setSelectedTime(extractUTC(opt.label)); // show only UTC
    window.location.reload();
    setOpen(false);
  };
  return (
    <>
      <ButtonGroup
        className="language-wrap timeWrap"
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          className="language-button timeButton"
          // onClick={handleClick}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="17.5601" cy="16" rx="2.5" ry="3" fill="#1A1A1A" />
            <path
              d="M2.6495 8.4865H6.0628C5.8816 9.5911 5.7838 10.7701 5.7838 12C5.7838 13.2299 5.8816 14.409 6.0628 15.5135H2.6495C2.2366 14.4185 2 13.2377 2 12C2 10.7623 2.2366 9.5815 2.6495 8.4865ZM15.7985 2.7539C16.5566 3.8353 17.1706 5.2373 17.5903 6.8649H20.5648C19.4617 5.0321 17.7954 3.5774 15.7985 2.7539ZM12 2C10.5025 2 8.9362 3.8355 8.0743 6.8649H15.9256C15.0637 3.8355 13.4975 2 12 2ZM3.4352 6.8649H6.4097C6.8294 5.2373 7.4434 3.8353 8.2015 2.7539C6.2046 3.5773 4.5383 5.0321 3.4352 6.8649ZM3.4352 17.1352C4.5383 18.968 6.2047 20.4227 8.2016 21.2461C7.4435 20.1648 6.8295 18.7628 6.4098 17.1352H3.4352ZM22 17.0001C22 19.7615 19.7614 22.0001 17 22.0001C14.2386 22.0001 12 19.7615 12 17.0001C12 14.2387 14.2386 12.0001 17 12.0001C19.7614 12.0001 22 14.2387 22 17.0001ZM19.5 17.0001C19.5 16.7237 19.2764 16.5001 19 16.5001H17.5V14.0001C17.5 13.7237 17.2764 13.5001 17 13.5001C16.7236 13.5001 16.5 13.7237 16.5 14.0001V17.0001C16.5 17.2765 16.7236 17.5001 17 17.5001H19C19.2764 17.5001 19.5 17.2765 19.5 17.0001ZM12 22.0001C12.0315 22.0001 12.0633 21.9875 12.0948 21.9858C10.8337 20.7449 10.0433 19.0313 10.0068 17.1352H8.0743C8.9362 20.1645 10.5025 22.0001 12 22.0001ZM16.496 10.0256C16.4451 9.4938 16.3799 8.9767 16.2933 8.4865H7.7067C7.5173 9.5586 7.4054 10.7318 7.4054 12C7.4054 13.2682 7.5173 14.4414 7.7067 15.5135H10.1624C10.8116 12.526 13.3727 10.2497 16.496 10.0256ZM21.3506 8.4865H17.9373C18.0228 9.0077 18.0863 9.5483 18.1331 10.1003C19.6334 10.3461 20.9753 11.0646 21.9952 12.1052C21.9956 12.0699 22.0001 12.0356 22.0001 12.0001C22.0001 10.7624 21.7635 9.5815 21.3506 8.4865Z"
              fill="#D3CABA"
            />
          </svg>

          {/* <div className="verticalDivision"></div> */}
          <div className="selectedTimeContainer">
            <div className="selectedTime timeHeading">
              {extractUTC(selectedTime)}
              <span className="tooltiptext">{selectedTime}</span>
            </div>
          </div>
        </Button>
        <Button
          className="dropdown-select-button"
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 0.75L5.75 5.75L10.75 0.75"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </ButtonGroup>
      <Popper
        className="language-popper"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            className="timeGrow"
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {TimeZone.map((option: any, index) => (
                    <MenuItem
                      key={option.label}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItem(option, index)}
                    >
                      &nbsp; {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
