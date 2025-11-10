import { Suspense, useEffect, useState } from 'react';
import { Divider, Drawer, IconButton, useTheme } from '@mui/material';
import "./style.css";
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearMerchantStatementEditData,
  clearProductRiskEditData,
  clearRiskEditData,
  setDrawer,
} from 'store/features/drawer';
import { clearDetails } from 'store/features/details';
import RefundDetails from '../../pages/transaction/components/drawers/refund-drawer';
import CaptureDetails from '../../pages/transaction/components/drawers/capture-drawer';
import { useTranslation } from 'react-i18next';
import { MENU } from '../constants/route';
import { DRAWER_TYPE, DRAWER_WIDTH } from '../constants/drawer';
import { resetCreateDisputeDrawer, resetDisputeDrawerTableList } from 'store/features/dispute-management-table.redux';
import MerchantDetailsDrawer from '../../pages/transaction/components/drawers/details-drawer/components/merchant-details-drawer/MerchantDetailsDrawer';
import { resetProductDetails } from 'store/features/product-table';
import { clearMerchantDetails } from 'store/features/merchant';
import { resetAcquirerDetails } from 'store/features/acquirer-details';
import AcquirerDetailsDrawer from '../../pages/transaction/components/drawers/details-drawer/components/acquirer-details-drawer/AcquirerDetailsDrawer';
import useLegacy from '../../hooks/use-legacy/useLegacy';
import TransactionDetailsWrapper from '../../pages/transaction/components/drawers/details-drawer';
import { useNavigate } from 'react-router';
import { CloseSvgIcon } from 'components/svg-icons/SvgIcons';
// import RiskDrawer from '../../pages/risk/components/risk-drawer';
// import ProductDrawer from '../../pages/merchants/merchant-view/components/drawers/product-details-drawer/ProductDrawer';
// import NestedTable from '../../pages/merchants/merchant-view/components/drawers/nested-drawer/NestedTable';
// import ProductRiskDrawer from '../../pages/merchants/merchant-view/components/drawers/product-risk-drawer';
// import PblDrawer from '../../pages/merchants/merchant-view/components/drawers/pbl-drawer';
// import ProductRisk from '../../pages/merchants/merchant-view/components/drawers/product-risk';
// import AddPblDrawer from '../../pages/merchants/merchant-view/components/drawers/add-pbl-drawer/AddPblDrawer';
// import AddProduct from '../../pages/merchants/merchant-view/components/drawers/add-product';
// import AcquirerMidDetails from '../../pages/acquirers/components/drawer';
// import DisputeDetails from '../../pages/dispute-management/drawer/DisputeDetails';
// import CreateDisputeDrawer from '../../pages/dispute-management/drawer/create-dispute-drawer/CreateDisputeDrawer';
// import EditDisputeDrawer from '../../pages/dispute-management/drawer/edit-dispute-drawer/EditDisputeDrawer';
// import NestedTableFromProductTab from '../../pages/merchants/merchant-view/components/drawers/nested-drawer/NestedTableFromProductTab';
// import QRProductDetailsDrawer from '../../pages/merchants/merchant-view/components/drawers/product-details-drawer/QRProductDetailsDrawer';
// import { EditMerchantStatement } from '../../pages/statements/components/merchant-statement/drawers/EditMerchantStatement';
// import { EditHolidayList } from '../../pages/statements/components/holiday-list/drawers/AddHolidayList';
// import { SendRefLinkEmail } from '../../pages/partner/components/drawers/referral-link-email/SendRefLinkEmail';
// import SubmitEvidence from '../../pages/dispute-management/drawer/all-options/submit-evidence/SubmitEvidence';
// import ChallengeDispute from '../../pages/dispute-management/drawer/all-options/challenge-dispute/ChallengeDispute';
// import SubscriptionDrawer from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer';
// import ViewSubscriber from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/subscribers/view-subscriber/ViewSubscriber';
// import EditSubscriber from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/subscribers/edit-subscriber/EditSubscriber';
// import ViewSubscriptionsPlans from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/subscriptions-plans/view-subscriptions-plans/contact-details-section/ViewSubscriptionPlan';
// import ViewSubscriptions from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/subscriptions/view-subscriptions/ViewSubscriptions';
// import CreateSubscriptionsPlan from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/subscriptions-plans/create-subscriptions/CreateSubscriptionPlan';
// import CreateSubscription from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/subscriptions/add-edit-subscriptions/CreateSubscriptions';
// import AddUser from '../../pages/merchants/merchant-view/components/merchant-details/components/user-management/add-user/AddUser';
// import UploadMissingInfoDrawer from '../../pages/onboarding/missing-info/UploadMissingInfoDrawer';
// import MDRRatesDrawer from '../../pages/onboarding/components/MDRRatesDrawer';
// import AddHashCardDrawer from '../../pages/hash-card/components/drawer';
// import SentToAcquirerDrawer from 'pages/dispute-management/drawer/all-options/send-to-acquirer-upload/SentToAcquirerDrawer';
// import MissingInfoDisputeDrawer from 'pages/dispute-management/drawer/all-options/missing-info-dispute-drawer/MissingInfoFileUpload';
// import CloseCaseDrawer from 'pages/dispute-management/drawer/all-options/case-close/CaseCloseUpload';
// import OnfidoDocsTable from 'pages/onboarding/stakeholder-info/onfido-components/OnfidoDocsTable';
// import { UploadHolidayList } from 'pages/statements/components/holiday-list/drawers/UploadHolidayList';
// import AddIpAddressDrawer from 'pages/merchants/merchant-view/components/merchant-details/components/merchant-settings/ip-whitelisting/drawer';
// import AddWebhookUrlDrawer from 'pages/merchants/merchant-view/components/merchant-details/components/merchant-settings/webhook-url/drawer';
// import AddCatalogCategoryDrawer from 'pages/merchants/merchant-view/components/merchant-details/components/merchant-catalogs/components/category-drawer';
// import AddCatalogCategoryProductDrawer from 'pages/merchants/merchant-view/components/merchant-details/components/merchant-catalogs/components/product-drawer';
// import CreateRuleDrawer from 'pages/rules/CreateRuleDrawer';
export default function DasDrawer({ drawer, children, onClose, tableApiEndPoint, payload, pagination }: any) {
  const theme = useTheme();
  const [drawerWidth, setDrawerWidth] = useState(DRAWER_WIDTH.DEFAULT);
  const allDrawer = useSelector((store: any) => store.drawer.drawer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const legacy = useLegacy();
  useEffect(() => {
    switch (drawer.type) {
      case DRAWER_TYPE.DETAILS:
        setDrawerWidth(DRAWER_WIDTH.DETAILS);
        break;
      case DRAWER_TYPE.REFUND:
        setDrawerWidth(DRAWER_WIDTH.REFUND);
        break;
      case DRAWER_TYPE.MERCHANT_DETAILS:
        setDrawerWidth(DRAWER_WIDTH.MERCHANT_DETAILS);
        break;
      case DRAWER_TYPE.ACQUIRER_DETAILS:
        setDrawerWidth(DRAWER_WIDTH.ACQUIRER_DETAILS);
        break;
      case DRAWER_TYPE.CAPTURE:
        setDrawerWidth(DRAWER_WIDTH.CAPTURE);
        break;
      case DRAWER_TYPE.RISK:
        setDrawerWidth(DRAWER_WIDTH.RISK);
        break;
      case DRAWER_TYPE.HASH_CARD_FORM:
        setDrawerWidth(DRAWER_WIDTH.HASH_CARD_FORM);
        break;
      case DRAWER_TYPE.IP_WHITELIST_FORM:
        setDrawerWidth(DRAWER_WIDTH.IP_WHITELIST_FORM);
        break;
      case DRAWER_TYPE.WEBHOOK_URL_FORM:
        setDrawerWidth(DRAWER_WIDTH.WEBHOOK_URL_FORM);
        break;
      case DRAWER_TYPE.CATALOG_CATEGORY_FORM:
        setDrawerWidth(DRAWER_WIDTH.CATALOG_CATEGORY_FORM);
        break;
      case DRAWER_TYPE.CATALOG_CATEGORY_PRODUCT_FORM:
        setDrawerWidth(DRAWER_WIDTH.CATALOG_CATEGORY_PRODUCT_FORM);
        break;
      case DRAWER_TYPE.PRODUCT:
        setDrawerWidth(DRAWER_WIDTH.PRODUCT);
        break;
      case DRAWER_TYPE.QR_PRODUCT:
        setDrawerWidth(DRAWER_WIDTH.QR_PRODUCT);
        break;
      case DRAWER_TYPE.NESTED_TABLE:
        setDrawerWidth(DRAWER_WIDTH.NESTED_TABLE);
        break;
      case DRAWER_TYPE.NESTED_TABLE_FROM_PRODUCT_TAB:
        setDrawerWidth(DRAWER_WIDTH.NESTED_TABLE_FROM_PRODUCT_TAB);
        break;
      case DRAWER_TYPE.PRODUCT_RISK:
        setDrawerWidth(DRAWER_WIDTH.PRODUCT_RISK);
        break;
      case DRAWER_TYPE.PRODUCT_RISK_ADD:
        setDrawerWidth(DRAWER_WIDTH.PRODUCT_RISK_ADD);
        break;
      case DRAWER_TYPE.PRODUCT_PBL:
        setDrawerWidth(DRAWER_WIDTH.PRODUCT_PBL);
        break;
      case DRAWER_TYPE.ADD_PBL:
        setDrawerWidth(DRAWER_WIDTH.ADD_PBL);
        break;
      case DRAWER_TYPE.ADD_PRODUCT:
        setDrawerWidth(DRAWER_WIDTH.ADD_PRODUCT);
        break;
      case DRAWER_TYPE.ACQUIRER_MID_DETAILS:
        setDrawerWidth(DRAWER_WIDTH.ACQUIRER_MID_DETAILS);
        break;
      case DRAWER_TYPE.MERCHANT_STATEMENT_EDIT:
        setDrawerWidth(DRAWER_WIDTH.MERCHANT_STATEMENT_EDIT);
        break;
      case DRAWER_TYPE.DISPUTE_DRAWER:
        setDrawerWidth(DRAWER_WIDTH.DISPUTE_DRAWER);
        break;
      case DRAWER_TYPE.DISPUTE_CREATE_DRAWER:
        setDrawerWidth(DRAWER_WIDTH.DISPUTE_CREATE_DRAWER);
        break;
      case DRAWER_TYPE.DISPUTE_EDIT_DRAWER:
        setDrawerWidth(DRAWER_WIDTH.DISPUTE_EDIT_DRAWER);
        break;
      case DRAWER_TYPE.PARTNER_CREATE_EMAIL:
        setDrawerWidth(DRAWER_WIDTH.PARTNER_CREATE_EMAIL);
        break;
      case DRAWER_TYPE.ADD_HOLIDAY:
        setDrawerWidth(DRAWER_WIDTH.ADD_HOLIDAY);
        break;
      case DRAWER_TYPE.UPLOAD_HOLIDAY:
        setDrawerWidth(DRAWER_WIDTH.UPLOAD_HOLIDAY);
        break;
      case DRAWER_TYPE.SEND_TO_ACQUIRER:
        setDrawerWidth(DRAWER_WIDTH.SEND_TO_ACQUIRER);
        break;
      case DRAWER_TYPE.MISSING_INFO:
        setDrawerWidth(DRAWER_WIDTH.MISSING_INFO);
        break;
      case DRAWER_TYPE.SUBMIT_EVIDENCE:
        setDrawerWidth(DRAWER_WIDTH.SUBMIT_EVIDENCE);
        break;
      case DRAWER_TYPE.CHALLENGE_DISPUTE:
        setDrawerWidth(DRAWER_WIDTH.CHALLENGE_DISPUTE);
        break;
      case DRAWER_TYPE.ACCEPT_DISPUTE:
        setDrawerWidth(DRAWER_WIDTH.ACCEPT_DISPUTE);
        break;
      case DRAWER_TYPE.CASE_CLOSE:
        setDrawerWidth(DRAWER_WIDTH.CASE_CLOSE);
        break;
      case DRAWER_TYPE.SUBSCRIPTION:
        setDrawerWidth(DRAWER_WIDTH.SUBSCRIPTION);
        break;
      case DRAWER_TYPE.CREATE_SUBSCRIPTION_PLAN:
        setDrawerWidth(DRAWER_WIDTH.CREATE_SUBSCRIPTION_PLAN);
        break;
      case DRAWER_TYPE.VIEW_SUBSCRIPTION_PLAN:
        setDrawerWidth(DRAWER_WIDTH.VIEW_SUBSCRIPTION_PLAN);
        break;
      case DRAWER_TYPE.VIEW_SUBSCRIPTION:
        setDrawerWidth(DRAWER_WIDTH.VIEW_SUBSCRIPTION);
        break;
      case DRAWER_TYPE.VIEW_SUBSCRIBER:
        setDrawerWidth(DRAWER_WIDTH.VIEW_SUBSCRIBER);
        break;
      case DRAWER_TYPE.EDIT_SUBSCRIBER:
        setDrawerWidth(DRAWER_WIDTH.EDIT_SUBSCRIBER);
        break;
      case DRAWER_TYPE.ADD_SUBSCRIPTION:
        setDrawerWidth(DRAWER_WIDTH.ADD_SUBSCRIPTION);
        break;
      case DRAWER_TYPE.ADD_USER:
        setDrawerWidth(DRAWER_WIDTH.ADD_USER);
        break;
      case DRAWER_TYPE.CHILDREN:
        setDrawerWidth(drawer.width);
        break;
      case DRAWER_TYPE.ONBOARDING_MISSING_INFO:
        setDrawerWidth(DRAWER_WIDTH.TWENTY_FIVE);
        break;
      case DRAWER_TYPE.ONBOARDING_UPLOAD_MISSING_INFO:
        setDrawerWidth(DRAWER_WIDTH.TWENTY_FIVE);
        break;
      case DRAWER_TYPE.MDR_RATES_FORM:
        setDrawerWidth(DRAWER_WIDTH.MDR_RATES_FORM);
        break;
      case DRAWER_TYPE.CREATE_RULE:
        setDrawerWidth(DRAWER_WIDTH.CREATE_RULE);
        break;
      case DRAWER_TYPE.ONFIDO_DOCS_DRAWER:
        setDrawerWidth(DRAWER_WIDTH.SEVENTY_FIVE);
        break;
      default:
        setDrawerWidth(DRAWER_WIDTH.DEFAULT);
    }
  }, [drawer]);
  const navigate = useNavigate();
  const filterItems = allDrawer.filter(
    (item: any) => item.type !== drawer.type,
  );

  let oldPath = window.location.pathname.split('?')[0];
  let nestedPath = window.location.search.split('&')[0];

  const handleDrawerClose = (drawer: any) => {
    switch (drawer.type) {
      case DRAWER_TYPE.DETAILS:
        dispatch(setDrawer([...filterItems]));
        dispatch(clearDetails());
        navigate(oldPath);
        break;
      case DRAWER_TYPE.CAPTURE:
        dispatch(setDrawer([...filterItems]));
        if (filterItems.length === 1) {
          navigate(-1);
        } else navigate(MENU.TRANSACTIONS);

        break;
      case DRAWER_TYPE.REFUND:
        dispatch(setDrawer([...filterItems]));
        if (filterItems.length === 1) {
          navigate(-1);
        } else {
          if (legacy) {
            navigate(MENU.LEGACY_TRANSACTIONS);
          } else {
            navigate(MENU.TRANSACTIONS);
            dispatch(setDrawer([]));
          }
        }
        break;
      case DRAWER_TYPE.MERCHANT_DETAILS:
        dispatch(setDrawer([...filterItems]));
        dispatch(clearMerchantDetails());
        break;
      case DRAWER_TYPE.ACQUIRER_DETAILS:
        dispatch(setDrawer([...filterItems]));
        dispatch(resetAcquirerDetails());
        break;
      case DRAWER_TYPE.ADD_PRODUCT:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.QR_PRODUCT:
        navigate(nestedPath);
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.PRODUCT_PBL:
        navigate(oldPath);
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.NESTED_TABLE:
        navigate(oldPath);
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.NESTED_TABLE_FROM_PRODUCT_TAB:
        navigate(oldPath);
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.PRODUCT_RISK:
        navigate(oldPath);
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.PRODUCT:
        if (drawer.dasmid) {
          dispatch(setDrawer([...filterItems]));
          dispatch(resetProductDetails());
        } else {
          navigate(oldPath);
          dispatch(setDrawer([]));
        }
        break;

      case DRAWER_TYPE.RISK:
        dispatch(clearRiskEditData());
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.HASH_CARD_FORM:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.IP_WHITELIST_FORM:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.WEBHOOK_URL_FORM:
      case DRAWER_TYPE.CATALOG_CATEGORY_FORM:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.CATALOG_CATEGORY_PRODUCT_FORM:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.MERCHANT_STATEMENT_EDIT:
        dispatch(clearMerchantStatementEditData());
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.PRODUCT_RISK_ADD:
        dispatch(setDrawer([...filterItems]));
        dispatch(clearProductRiskEditData());
        break;
      case DRAWER_TYPE.ACQUIRER_MID_DETAILS:
        navigate(oldPath);
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.DISPUTE_DRAWER:
        dispatch(setDrawer([]));
        navigate(oldPath);
        break;
      case DRAWER_TYPE.DISPUTE_CREATE_DRAWER:
        dispatch(setDrawer([]));
        dispatch(resetCreateDisputeDrawer());
        dispatch(resetDisputeDrawerTableList());
        break;
      case DRAWER_TYPE.DISPUTE_EDIT_DRAWER:
        dispatch(setDrawer([...filterItems]));
        // dispatch(resetCreateDisputeDrawer());
        // dispatch(resetDisputeDrawerTableList());
        break;
      case DRAWER_TYPE.ADD_PBL:
        navigate(oldPath);
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.PARTNER_CREATE_EMAIL:
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.ADD_HOLIDAY:
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.UPLOAD_HOLIDAY:
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.SEND_TO_ACQUIRER:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.MISSING_INFO:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.SUBMIT_EVIDENCE:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.CHALLENGE_DISPUTE:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.ACCEPT_DISPUTE:
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.CASE_CLOSE:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.VIEW_SUBSCRIPTION_PLAN:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.VIEW_SUBSCRIBER:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.VIEW_SUBSCRIPTION:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.EDIT_SUBSCRIBER:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.SUBSCRIPTION:
        navigate(oldPath);
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.CREATE_SUBSCRIPTION_PLAN:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.ADD_SUBSCRIPTION:
        dispatch(setDrawer([...filterItems]));
        break;
      case DRAWER_TYPE.ADD_USER:
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.CREATE_RULE:
        dispatch(setDrawer([]));
        break;
      case DRAWER_TYPE.MDR_RATES_FORM:
        dispatch(setDrawer([]));
        dispatch(clearDetails());
        break;
      case DRAWER_TYPE.CHILDREN:
        onClose();
        break;
      default:
        dispatch(setDrawer([]));
    }
  };
  return (
    <Suspense fallback={<></>}>
      <Drawer
        className={`drawer-wrapper ${drawer.className}`}
        style={{ position: 'relative' }}
        open={drawer.isDrawerOpen || false}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="temporary"
        onClose={() => handleDrawerClose(drawer)}
        anchor="right"
      >
        <DrawerHeader className='drawer-header'>
          {/* close or back Button */}
          <IconButton onClick={() => handleDrawerClose(drawer)}>
            <CloseSvgIcon/>
          </IconButton>
          {/* Drawer Title */}
          <span style={{display:'flex', gap:'8px', alignItems:'center'}}>
            {drawer.icon ? drawer.icon : ''}
            <h3
            // style={{ color: drawer.titleColor ? drawer.titleColor : 'white' }}
            >
              {t(drawer?.title)}
            </h3>
          </span>
          {/* <span onClick={()=>handleDrawerClose(drawer)}>
            X
          </span> */}
        </DrawerHeader>
        <Divider />
        {drawer.type === DRAWER_TYPE.DETAILS && <TransactionDetailsWrapper />}
        {drawer.type === DRAWER_TYPE.REFUND && (
          <RefundDetails
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
            tableApiEndPoint={tableApiEndPoint}
            payload={payload}
          />
        )}
        {drawer.type === DRAWER_TYPE.MERCHANT_DETAILS && (
          <MerchantDetailsDrawer
          // drawer={drawer}
          // handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.ACQUIRER_DETAILS && (
          <AcquirerDetailsDrawer />
        )}
        {drawer.type === DRAWER_TYPE.CAPTURE && (
          <CaptureDetails
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
            tableApiEndPoint={tableApiEndPoint}
            payload={payload}
          />
        )}
        {drawer.type === DRAWER_TYPE.CHILDREN && children}
        {/* {drawer.type === DRAWER_TYPE.RISK && (
          <RiskDrawer
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.PRODUCT && <ProductDrawer
          dasmid={drawer.dasmid || ""}
          showQrSection={drawer.showQrSection}
        />}
        {drawer.type === DRAWER_TYPE.QR_PRODUCT && <QRProductDetailsDrawer />}
        {drawer.type === DRAWER_TYPE.NESTED_TABLE && <NestedTable />}
        {drawer.type === DRAWER_TYPE.NESTED_TABLE_FROM_PRODUCT_TAB && (
          <NestedTableFromProductTab />
        )}

        {drawer.type === DRAWER_TYPE.PRODUCT_RISK && <ProductRisk />}
        {drawer.type === DRAWER_TYPE.PRODUCT_RISK_ADD && (
          <ProductRiskDrawer
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.PRODUCT_PBL && (
          <PblDrawer
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.ADD_PBL && (
          <AddPblDrawer
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.ADD_PRODUCT && (
          <AddProduct
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.ACQUIRER_MID_DETAILS && (
          <AcquirerMidDetails
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.MERCHANT_STATEMENT_EDIT && (
          <EditMerchantStatement
            tableApiPath={drawer?.tableApiPath}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.DISPUTE_DRAWER && <DisputeDetails />}
        {drawer.type === DRAWER_TYPE.DISPUTE_CREATE_DRAWER && (
          <CreateDisputeDrawer />
        )}
        {drawer.type === DRAWER_TYPE.DISPUTE_EDIT_DRAWER && (
          <EditDisputeDrawer
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.PARTNER_CREATE_EMAIL && (
          <SendRefLinkEmail />
        )}
        {drawer.type === DRAWER_TYPE.ADD_HOLIDAY && (
          <EditHolidayList drawer={drawer} />
        )}
        {drawer.type === DRAWER_TYPE.UPLOAD_HOLIDAY && (
          <UploadHolidayList take={pagination?.take} skip={pagination?.skip} />
        )}
        {drawer.type === DRAWER_TYPE.HASH_CARD_FORM && <AddHashCardDrawer
          handleDrawerClose={() => handleDrawerClose(drawer)}
          initialValues=
          {{
            ...drawer.data,
            hashCardComment:
              drawer.data?.Comments?.length > 0 ? drawer.data?.Comments[0]?.CommentText : ""
          }}
          editMode={drawer.editMode}
          tableApiEndPoint={tableApiEndPoint}
        />}
        {drawer.type === DRAWER_TYPE.IP_WHITELIST_FORM && <AddIpAddressDrawer
          handleDrawerClose={() => handleDrawerClose(drawer)}
          initialValues=
          {{
            ...drawer.data,
            hashCardComment:
              drawer.data?.Comments?.length > 0 ? drawer.data?.Comments[0]?.CommentText : ""
          }}
          editMode={drawer.editMode}
          tableApiEndPoint={tableApiEndPoint}
        />}
        {drawer.type === DRAWER_TYPE.WEBHOOK_URL_FORM && <AddWebhookUrlDrawer
          handleDrawerClose={() => handleDrawerClose(drawer)}
          initialValues=
          {{
            ...drawer.data,
            hashCardComment:
              drawer.data?.Comments?.length > 0 ? drawer.data?.Comments[0]?.CommentText : ""
          }}
          editMode={drawer.editMode}
          tableApiEndPoint={tableApiEndPoint}
        />}
        {drawer.type === DRAWER_TYPE.CATALOG_CATEGORY_FORM && <AddCatalogCategoryDrawer
          handleDrawerClose={() => handleDrawerClose(drawer)}
          initialValues=
          {{
            ...drawer.data,
          }}
          editMode={drawer.editMode}
          tableApiEndPoint={tableApiEndPoint}
        />}
        {drawer.type === DRAWER_TYPE.CATALOG_CATEGORY_PRODUCT_FORM && <AddCatalogCategoryProductDrawer
          handleDrawerClose={() => handleDrawerClose(drawer)}
          initialValues=
          {{
            ...drawer.data,
          }}
          editMode={drawer.editMode}
          tableApiEndPoint={tableApiEndPoint}
          CategoryID={drawer.CategoryID}
        />}
        {drawer.type === DRAWER_TYPE.SEND_TO_ACQUIRER
          && <SentToAcquirerDrawer
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />}
        {drawer.type === DRAWER_TYPE.MISSING_INFO && <MissingInfoDisputeDrawer
          handleDrawerClose={() => handleDrawerClose(drawer)}
        />}
        {drawer.type === DRAWER_TYPE.SUBMIT_EVIDENCE && <SubmitEvidence
          handleDrawerClose={() => handleDrawerClose(drawer)}
        />}
        {drawer.type === DRAWER_TYPE.CHALLENGE_DISPUTE && <ChallengeDispute
          handleDrawerClose={() => handleDrawerClose(drawer)}
        />}
        {drawer.type === DRAWER_TYPE.CASE_CLOSE && <CloseCaseDrawer
          handleDrawerClose={() => handleDrawerClose(drawer)}
        />}
        {drawer.type === DRAWER_TYPE.SUBSCRIPTION && <SubscriptionDrawer />}
        {drawer.type === DRAWER_TYPE.CREATE_SUBSCRIPTION_PLAN && (
          <CreateSubscriptionsPlan
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.VIEW_SUBSCRIPTION_PLAN && (
          <ViewSubscriptionsPlans
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.VIEW_SUBSCRIBER && (
          <ViewSubscriber handleDrawerClose={() => handleDrawerClose(drawer)} />
        )}
        {drawer.type === DRAWER_TYPE.EDIT_SUBSCRIBER && (
          <EditSubscriber handleDrawerClose={() => handleDrawerClose(drawer)} />
        )}
        {drawer.type === DRAWER_TYPE.VIEW_SUBSCRIPTION && (
          <ViewSubscriptions
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.ADD_SUBSCRIPTION && (
          <CreateSubscription
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )}
        {drawer.type === DRAWER_TYPE.ADD_USER && (
          <AddUser handleDrawerClose={() => handleDrawerClose(drawer)} />
        )}
        {drawer.type === DRAWER_TYPE.MDR_RATES_FORM && (
          <MDRRatesDrawer drawer={drawer} handleDrawerClose={() => handleDrawerClose(drawer)} />
        )}
        

        {drawer.type === DRAWER_TYPE.ONBOARDING_UPLOAD_MISSING_INFO && (
          <UploadMissingInfoDrawer
            id={drawer.id}
            data={drawer.data}
            handleDrawerClose={() => handleDrawerClose(drawer)}
            getData={drawer.getData}
          />
        )}
        {drawer.type === DRAWER_TYPE.ONFIDO_DOCS_DRAWER && (
          <OnfidoDocsTable
            onfidoApplicantID={drawer?.data?.onfidoApplicantID}
            kycStatus={drawer?.data?.kycStatus}
            docs={drawer?.data?.docs}
          />
        )}
        {drawer.type === DRAWER_TYPE.CREATE_RULE && (
          <CreateRuleDrawer
            drawer={drawer}
            handleDrawerClose={() => handleDrawerClose(drawer)}
          />
        )} */}
      </Drawer>
    </Suspense>
  );
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
