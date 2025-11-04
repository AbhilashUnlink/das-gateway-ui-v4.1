import { useState, useRef, useEffect, Fragment } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import "./language.css";
import japnese from "../../assets/flag/jp.png";
import english from "../../assets/flag/uk.png";
import useGetParameter from "../../hooks/router/useGetParameter";
import { LANGUAGES } from "../constants";
import { useNavigate } from "react-router";

const options: any = [
    { imgsrc: japnese, label: "日本", code: "jp" },
    { imgsrc: english, label: "EN", code: "en" },
];

export default function SelectLanguage() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<any>(null);

    const langFromUrl = useGetParameter("lang");


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: any): void => {
        if (anchorRef.current && anchorRef?.current?.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const [selectedItem, setSelectedItem] = useState<any>(options[1]);
    const localLang: any = localStorage.getItem("lang");
    const langFromLocalStorage = localLang && [LANGUAGES.ENGLISH, LANGUAGES.JAPANESE]?.includes(localLang) ? localStorage.getItem("lang") : LANGUAGES.ENGLISH;
    useEffect(() => {
        let selectedOption = options[1];
        if (langFromUrl) {
            selectedOption = options.find((item: any) => item.code === langFromUrl);
        } else {
            selectedOption = options.find((item: any) => item.code === langFromLocalStorage);
        }
        selectedOption && setSelectedItem(selectedOption);
        const ourLang = selectedOption?.code;
        if (ourLang !== langFromLocalStorage) {
            localStorage.setItem("lang", ourLang);
            window.location.reload();
        } else {
            localStorage.setItem("lang", ourLang);
        }
    }, []);

    const navigate = useNavigate();

    const handleMenuItemClick = (option: any) => {
        if (langFromUrl) {
            navigate(window.location.search.replace(`lang=${langFromUrl}&`, `lang=${option.code}&`));
        }
        setSelectedItem(option);
        localStorage.setItem("lang", option.code);
        window.location.reload();
    };
    return (
        <Fragment>
            <ButtonGroup
                className="language-wrap top-lang-wrap"
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
            >
                <Button className="language-button">
                    <p>
                        {selectedItem.label}
                    </p>
                </Button>
                <Button
                    className="dropdown-select-button"
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
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
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option: any, index: number) => (
                                        <MenuItem
                                            sx={{
                                                display: "flex",
                                                gap: "5px"
                                            }}
                                            key={index}
                                            onClick={() => handleMenuItemClick(option)}
                                        >
                                            <img
                                                src={option.imgsrc}
                                                className="flag-img"
                                                alt="Flag"
                                            />
                                            <p>
                                                {option.label}
                                            </p>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    );
}
