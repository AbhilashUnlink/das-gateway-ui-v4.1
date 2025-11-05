import {
  Button,
  IconButton,
  Tooltip,
  useTheme,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import additionalColumns from "../../../../assets/images/additionalColumns.png";
import "./style.css";
import { useEffect, useState } from "react";
import PreferenceList from "./PreferenceList";
import { useDispatch, useSelector } from "react-redux";
import { useFetchWrapper as Api } from "utils";
import { FILE_FORMATS_VALUES } from "pages/user-settings/file-format";
import { DATE_FORMATS_OPTIONS } from "components/constants/date-formats";
import { setUserPreference } from "store/features/gateway-config";
import GridItem from "components/grid-item/GridItem";
import ConfirmationDialogRaw from "components/confirmation-dialog/ConfirmationDialog";
import { CloseSvgIcon, DeleteSvgIcon, PreferenceSvgIcon } from "components/svg-icons/SvgIcons";
import DasSnackbar from "components/das-snackbar/DasSnackbar";

const NewColumnPreference = ({
  columnsWithAccess,
  setOrder,
  config,
  currentScreen = "",
  columns,
}: any) => {
  const [preference, setPreference] = useState({
    selected: "default",
    list: {
      default: {
        order: [],
        unChecked: [],
      },
    },
  });
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [preferenceList, setPreferenceList] = useState<string[]>(["default"]);
  const [selectedList, setSelectedList] = useState("default");
  const [unChecked, setUnChecked] = useState<any>([]);
  const [updatedList, setUpdatedList] = useState<any>([]);
  const [isListNameError, setListNameError] = useState(false);
  const tableColumnHeaders = columns()?.fields?.filter(
    (item: any) => !["V2UUID"]?.includes(item.field)
  );

  const handleInitialLoad = () => {
    if (config && config?.list && Object.keys(config?.list)?.length > 1) {
      setPreference(config);
      setPreferenceList(Object.keys(config?.list));
      setSelectedList(config?.selected);
      config?.list[config?.selected]?.updatedList?.length > 0 &&
        setUpdatedList(config?.list[config?.selected]?.updatedList);
      setUnChecked(config?.list[config?.selected]?.unChecked);
      setOrder(config?.list[config?.selected]?.order);
    }
  };
  useEffect(() => {
    handleInitialLoad();
  }, [open]);

  const handleAddList = async (e: any) => {
    e.preventDefault();
    if (listName.trim() === "") return;
    let orderList: any = [];
    let updatedList: any = [];
    tableColumnHeaders?.forEach((element: any, index: any) => {
      orderList.push(element?.field);
      if (element?.field !== "action") {
        updatedList.push({
          field: element?.field,
          headerName: element?.headerName,
          id: index,
        });
      }
    });
    const response: any = await onApply(
      { order: orderList, unChecked: [], updatedList: updatedList },
      listName
    );
    if (response && response.success) {
      // or check response.statusCode, etc.
      setPreferenceList([...preferenceList, listName]);
      setPreference({
        ...preference,
        list: {
          ...preference.list,
          [listName]: {
            order: config?.list[listName]?.order,
            unChecked: config?.list[listName]?.unChecked,
            updatedList:
              config?.list[listName]?.updatedList?.length > 0
                ? config?.list[listName]?.updatedList
                : [],
          },
        },
      });
      // DasSnackbar.success(`${listName} added!`);
      setListName("");
    }
  };

  const handleRadioChange = (event: any) => {
    setSelectedList(event.target.value);
    setUnChecked(config?.list[event.target.value]?.unChecked);
    setOrder(config?.list[event.target.value]?.order);
    if (config?.list[event.target.value]?.updatedList?.length > 0) {
      setUpdatedList(config?.list[event.target.value]?.updatedList);
    } else {
      setUpdatedList([]);
    }
  };

  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    item: "",
  });
  const userPreference = useSelector(
    (store: any) => store?.config?.userPreference
  );
  const dispatch = useDispatch();

  const updateAdditionalColumnConfiguration = async (payload: any) => {
    const response = await Api().post("dasconfig/user-preferences", {
      configurations: payload,
    });
    DasSnackbar.success(t(`API_STATUS_MESSAGE.${response?.messageCode}`));
    return response;
  };

  const onApply = (val?: any, addItem: any = "") => {
    let newCols: any = JSON.parse(JSON.stringify(preference));
    delete newCols?.list[confirmationDialog.item];

    let newConfiguration: any = {};
    if (val) {
      newConfiguration = {
        list: { ...newCols.list, [addItem ? addItem : selectedList]: val },
        selected: selectedList,
      };
    } else {
      newConfiguration = {
        ...newCols,
        selected: selectedList,
      };
    }
    setPreference(newConfiguration);

    const payload = {
      [currentScreen]: {
        ...newConfiguration,
        list: {
          ...newConfiguration.list,
          default: { order: [], unChecked: [], updatedList: [] },
        },
      },
      ...(currentScreen === "statementList" && {
        transactionList: userPreference?.transactionList,
      }),
      ...(currentScreen === "transactionList" && {
        statementList: userPreference?.statementList,
      }),
      dateFormatType:
        userPreference?.dateFormatType || DATE_FORMATS_OPTIONS.DATE_TIME_AM_PM,
      formatType: userPreference?.formatType || FILE_FORMATS_VALUES.EXCEL,
      currencyType: userPreference?.currencyType || "USD",
    };

    dispatch(setUserPreference(payload));
    return updateAdditionalColumnConfiguration(payload);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    handleInitialLoad();
  };

  return (
    <>
      <Button
        className="common-button"
        type="button"
        onClick={() => setOpen(true)}
      >
        <Tooltip title={t("User_Settings.Column Preference")} arrow>
          <div className="filterPlusIconContainer">
            <img
              src={additionalColumns}
              alt="filter"
              className="filterPlusIcon"
            />
          </div>
        </Tooltip>
      </Button>

      <ConfirmationDialogRaw
        className="confirm-popup"
        open={confirmationDialog.open}
        onClose={() => {
          setConfirmationDialog({ open: false, item: "" });
        }}
        title={t("User_Settings.Delete Preference List")}
        heading={t("User_Settings.Are you sure?")}
        content={t(
          "User_Settings.Do you really want to delete this record? This process can not be undone"
        )}
        handleSubmit={() => {
          setPreferenceList(
            preferenceList?.filter((item) => item !== confirmationDialog.item)
          );
          onApply();
        }}
        cancel={t("HashCard.ApprovePopup.button.cancel")}
        submit={t("HashCard.ApprovePopup.button.submit")}
      />

      <Drawer
        className={`drawer-wrapper`}
        style={{ position: "relative" }}
        open={open}
        sx={{
          width: "52%",
          top: "107px",
          height: "73%",
          right: "15px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "52%",
            top: "107px",
            height: "73%",
            right: "15px",
          },
        }}
        onClose={() => {
          handleDrawerClose();
        }}
        anchor="right"
      >
        <DrawerHeader className="drawer-header preference-header">
          {/* close or back Button */}
          <IconButton
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <CloseSvgIcon className="close-svg-icon" />
          </IconButton>
          <PreferenceSvgIcon className="column-preference-svg" />
          <h3 style={{ paddingLeft: '15px' }} title={selectedList}>{t(`${selectedList}`)}</h3>
        </DrawerHeader>
        <Grid container spacing={2}>
          <GridItem
            style={{ width: "46%", boxShadow: "none", borderRadius: "none" }}
          >
            <div className="additional-preference-radio-column additional-preference-add-section">
              <div className="searchContainer additionalFiterData">
                <form onSubmit={handleAddList}>
                  <h3>{t("User_Settings.Add Custom Preference List")}</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      value={listName}
                      onChange={(e) => {
                        const exists = preferenceList.some(
                          (item) =>
                            item.toLowerCase() === e.target.value.toLowerCase()
                        );
                        if (exists) {
                          setListName(e.target.value);
                          setListNameError(true);
                        } else {
                          setListName(e.target.value);
                          setListNameError(false);
                        }
                      }}
                      placeholder={t("User_Settings.Enter List Name")}
                    />
                    {isListNameError && (
                      <span className="error-duplicate-list">
                        {" "}
                        {`${listName} ${t(
                          "User_Settings.Preference List error message"
                        )}`}
                      </span>
                    )}
                    <button className="prefernce-action-button add-prefernce-button" type="submit" disabled={isListNameError}>
                      {t("User_Settings.buttons.Add")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="additional-preference-radio-column">
              <div className="searchContainer additionalFiterData">
                <h3 className="prf-column-add-hading">
                  {t("User_Settings.Custom Preference List")}
                </h3>
                <FormControl>
                  {/* <FormLabel id="demo-radio-buttons-group-label">
                    {t("User_Settings.Select Preferred List")}
                  </FormLabel> */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleRadioChange}
                    value={selectedList}
                  >
                    {preferenceList?.map((item: any, index: any) => (
                      <div
                        key={index}
                        className={
                          item === selectedList
                            ? "list-action-view active"
                            : "list-action-view"
                        }
                      >
                        <FormControlLabel
                          title={item}
                          value={item}
                          control={<Radio />}
                          label={
                            item.toLowerCase() === "default"
                              ? t("User_Settings.default")
                              : item
                          }
                        />
                        <div className="act-btns">
                          <button
                            onClick={() => {
                              setConfirmationDialog({
                                open: true,
                                item: item,
                              });
                            }}
                            disabled={
                              item === selectedList ||
                              ["default", "DAS Lite"].includes(item)
                            }
                            className={
                              item === selectedList ||
                                ["default", "DAS Lite"].includes(item)
                                ? "delete-list disabled"
                                : "delete-list"
                            }
                          >
                            <DeleteSvgIcon className={"delete-svg-icon"} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>

                <div className="flex justify-end w-full">
                  <button
                    className="prefernce-action-button  apply-preference-button"
                    onClick={() => {
                      const order = updatedList
                        ?.filter(
                          (item: any) => !unChecked?.includes(item.field)
                        )
                        ?.map((item: any) => {
                          return item.field;
                        });
                      const newList =
                        selectedList === "default"
                          ? order
                          : ["action", ...order];
                      setOrder(newList);
                      onApply({
                        order: newList,
                        unChecked,
                        updatedList: updatedList,
                      });
                    }}
                  >
                    {t("Filter.button.Apply")}
                  </button>
                </div>
              </div>
            </div>
          </GridItem>

          <GridItem
            style={{ width: "46%", boxShadow: "none", borderRadius: "none" }}
          >
            <PreferenceList
              columnsWithAccess={columnsWithAccess}
              setOrder={setOrder}
              onApply={onApply}
              {...{ unChecked, setUnChecked }}
              selectedList={selectedList}
              updatedList={updatedList}
              setUpdatedList={setUpdatedList}
            />
          </GridItem>
        </Grid>
      </Drawer>
    </>
  );
};

export default NewColumnPreference;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
