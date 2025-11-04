import { useTranslation } from "react-i18next";
import {
  componentTypes,
  FormRenderer,
} from "@data-driven-forms/react-form-renderer";
import { useState } from "react";
import editDetailSchema from "./schema";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormTemplate from "./FormTemplate";
import TextField from "@data-driven-forms/mui-component-mapper/text-field/text-field";
import Select from "@data-driven-forms/mui-component-mapper/select";
import TEXTAREA from "@data-driven-forms/mui-component-mapper/textarea";
import FieldMapper from '../../../../../components/form/field-mapper/FieldMapper';
import ConfirmationDialogRaw from "../../../../../components/confirmation-dialog/ConfirmationDialog";
import { useFetchWrapper as Api } from "../../../../../utils";
import { TRANSACTION } from "../../../../../components/constants/api-paths";
import { HTTP_STATUS } from "../../../../../components/constants";
import DasSnackbar from "../../../../../components/das-snackbar/DasSnackbar";
import { useDispatch } from "react-redux";
import { getDetails } from "../../../../../store/features/details";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
const TransactionEditDetailsDrawer = ({
  openStatusDrawer,
  uuid,
  handleDrawerClose,
}: any) => {
  const { t } = useTranslation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>({});
  const handleReset = () => { };

  const handleFormSubmit = (values: any) => {
    setDialogOpen(true);
    setSubmittedData(values);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const dispatch = useDispatch();

  const approveStatusChange = async () => {
    let payload = {
      transaction_id: uuid,
      message: submittedData.Comment,
      status: submittedData.Status,
      authCode: submittedData.AuthCode,
    };
    try {
      const apiData = await Api().post(TRANSACTION.UPDATE_STATUS, payload);
      if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(apiData.statusCode)) {
        DasSnackbar.success(apiData?.message);
        handleDrawerClose();
        setDialogOpen(false);
        dispatch(getDetails({ uuid: uuid, openDrawer: true }));
      }
      if ([HTTP_STATUS.BAD_REQUEST, HTTP_STATUS.INTERNAL_SERVER].includes(apiData.status)) {
        DasSnackbar.error(apiData?.message);
      }
    } catch (e) {
      DasSnackbar.error(t('OnBoarding.API_ERROR_MESSAGE'));
    }
  };

  return (
    <>
      <ConfirmationDialogRaw
        className="confirm-popup"
        open={isDialogOpen}
        onClose={handleCloseDialog}
        title={t("TransactionDetailDrawerBody.ApprovePopup.title")}
        heading={t("TransactionDetailDrawerBody.ApprovePopup.heading")}
        content={t("TransactionDetailDrawerBody.ApprovePopup.content")}
        handleSubmit={approveStatusChange}
        cancel={t("TransactionDetailDrawerBody.ApprovePopup.button.cancel")}
        submit={t("TransactionDetailDrawerBody.ApprovePopup.button.submit")}
      />
      <Box sx={{ display: "flex" }}>
        <DrawerHeader />

        <Drawer
          sx={{
            width: "28% !important",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "28% !important",
              zIndex: 1000,
            },
          }}
          variant="persistent"
          anchor="right"
          open={openStatusDrawer || false}
        >
          <DrawerHeader className="drawer-header">
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
            <div className="add-text-title">
              {t("TransactionDetailDrawerBody.Status_Heading")}
            </div>
          </DrawerHeader>
          <Divider />
          <div className="drawer-body pricing-drawer-body edit-status-drawer">
            <FormRenderer
              schema={editDetailSchema}
              FormTemplate={FormTemplate}
              onSubmit={handleFormSubmit}
              componentMapper={ComponentMapper}
              onReset={handleReset}
              onCancel={handleDrawerClose}
            />
          </div>
        </Drawer>
      </Box>
    </>
  );
};

export default TransactionEditDetailsDrawer;

const ComponentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.SELECT]: Select,
  [componentTypes.TEXTAREA]: TEXTAREA,
  "support-form": FieldMapper,
};
