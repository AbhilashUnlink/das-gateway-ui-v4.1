import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { SUBSCRIPTIONS } from '../../components/constants/api-paths';
import { HTTP_STATUS } from '../../components/constants';
import DasSnackbar from '../../components/das-snackbar/DasSnackbar';
import i18next from 'i18next';
import {
  COLUMN_HEADRES,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_TYPE_VALUES,
} from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/constants/subscription';
import { CurrencyType } from '../../config/common/currency';
import {
  CYCLE_COUNT,
  formatLinkExpiry,
  // PLAN_DISCOUNT_PERCENTAGE_VALUE,
  SUBSCRIPTION_ENDS_AT_DATE,
  SUBSCRIPTION_STARTS_AT_DATE,
  SUBSCRIPTION_TYPE_VAL,
  // TRIAL_PERIOD_DURATION_VAL,
} from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/hooks/subscription';
import {
  LANGUAGES,
  SELECTED_LANGUAGE,
} from '../../components/constants/languages';
import { SUBSCRIPTION_Type } from '../../pages/merchants/constants/merchant';
import { getCountry, getformatDate } from '../../utils/helper';
import { DATE_FORMAT } from '../../components/constants/constants';

//Subscription plan list API
export const getSubscriptionsPlans: any = createAsyncThunk(
  'risk/getSubscriptionsPlans',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);

//Subscriptions list API
export const getSubscriptions: any = createAsyncThunk(
  'risk/getSubscriptions',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);

//Subscribers list
export const getSubscribers: any = createAsyncThunk(
  'risk/getSubscribers',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);
export const subscriptionPlan: any = createAsyncThunk(
  'statements/subscriptionPlan',
  async (values: any, thunkAPI: any) => {
    const { getState, dispatch } = thunkAPI;
    const store = getState();
    const { drawer, subscriptionsTable } = store;

    let subscriptionDrawer = drawer?.drawer?.find((ele: any) => {
      return ele.DASMID;
    });
    let isDrawerEditable = drawer?.drawer?.find(
      (ele: any) => ele.subscriptionType === COLUMN_HEADRES.EDIT_PLAN,
    );
    let rowId = subscriptionsTable?.viewSubscription?.id;
    const {
      planName,
      amount,
      billingCycleType,
      ccy,
      isActive,
      comments,
      // subscriptionType,
      // planDiscountDuration,
      handleDrawerClose,
    } = values;
    // "TrialPeriodDuration": null,
    //   "TrialPeriodDurationType": "DAYS",
    //     "PlanDiscountPercentage": 10,
    //       "PlanDiscountDuration": 1,

    // subscriptionType: "trialPeriod"
    // subscriptionType: "discount"
    let payload: any = {
      id: rowId,
      planName: planName,
      billingCycleType: billingCycleType,
      ccy: ccy,
      amount:
        ccy === CurrencyType.JPY
          ? parseInt(amount)
          : parseFloat(Number(amount).toFixed(2)),
      // trialPeriodDuration: TRIAL_PERIOD_DURATION_VAL(values),
      // planDiscountPercentage: PLAN_DISCOUNT_PERCENTAGE_VALUE(values),
      // planDiscountDuration:
      //   (subscriptionType &&
      //     subscriptionType === SUBSCRIPTION_TYPE_VALUES.SUB_TRIAL_PERIOD) ||
      //   !planDiscountDuration
      //     ? null
      //     : parseInt(planDiscountDuration),
      isActive: isActive === undefined ? true : isActive,
      comments: comments || '',
      dasmid: subscriptionDrawer?.DASMID,
      tableData: subscriptionsTable?.subscriptionsPlan,
      handleDrawerClose: handleDrawerClose,
    };

    if (values.subscriptionType === "trialPeriod") {
      payload = { ...payload, trialPeriodDuration: values.trialPeriodDuration, trialPeriodDurationType: SUBSCRIPTION_TYPE_VALUES.DAYS };
    }
    if (values.subscriptionType === "discount") {
      payload = {
        ...payload,
        planDiscountPercentage: +values.planDiscountPercentage,
        planDiscountDuration: +values.planDiscountDuration,
        trialPeriodDurationType: null,
      };
    }

    if (isDrawerEditable) {
      dispatch(editSubscriptionPlan(payload));
    } else {
      dispatch(createSubscriptionPlan(payload));
    }
  },
);

// Create Subscription Plan
export const createSubscriptionPlan: any = createAsyncThunk(
  'statements/createSubscriptionPlan',
  async (payload: any) => {
    const { tableData, handleDrawerClose } = payload;
    delete payload['tableData'];
    delete payload['handleDrawerClose'];
    let response = await Api().post(
      SUBSCRIPTIONS.CREATE_SUBSCRIPTION_PLAN,
      payload,
    );
    const { data } = response;
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(response?.statusCode)) {
      let newValue = {
        id: data.ID,
        planName: data.Name,
        billingCycleType: data.BillingCycleType,
        amount: data.Amount,
        ccy: data.Ccy,
        trialPeriodDuration:
          data.TrialPeriodDuration && data.TrialPeriodDurationType
            ? `${data.TrialPeriodDuration} ${data.TrialPeriodDurationType}`
            : 'N/A',
        planDiscountDuration: data?.PlanDiscountDuration,
        planDiscountPercentage: data?.PlanDiscountPercentage,
        subscriberCount: 0,
      };
      let finalData = [newValue, ...tableData];
      DasSnackbar.success(response?.message);
      //This is a temporary fix
      window.location.reload();
      handleDrawerClose();
      return finalData;
    } else {
      return tableData;
    }
  },
);
export const subscriptionRecord: any = createAsyncThunk(
  'statements/subscriptionRecord',
  async (values: any, thunkAPI: any) => {
    const { getState, dispatch } = thunkAPI;
    const {
      subscriptionPlan,
      email,
      firstName,
      lastName,
      linkExpiry,
      notificationToCustomer,
      handleDrawerClose,
      startDate,
    } = values;

    const store = getState();
    const { drawer, subscriptionsTable } = store;
    let ID = drawer?.drawer?.find((ele: any) => {
      return ele.DASMID;
    });
    let subscriptionPlanData = subscriptionsTable?.subscriptionsPlan.find(
      (item: any) => item.id == subscriptionPlan,
    );
    let subscriptionID = subscriptionsTable?.viewSubscription;
    let isDrawerEditable = drawer?.drawer?.find(
      (ele: any) => ele.showInitialValues,
    );
    let duplicateSubscriptionPlanData = {
      ...subscriptionPlanData,
      subscriptionEndsAt: SUBSCRIPTION_ENDS_AT_DATE(values),
      subscriptionStartsAt: SUBSCRIPTION_STARTS_AT_DATE(values),
    };
    dispatch(setSelectedPlan(duplicateSubscriptionPlanData));
    let commonPayload = {
      subscriptionType: SUBSCRIPTION_TYPE_VAL(values),
      maxCycleCount: CYCLE_COUNT(values),
      subscriptionEndsAt: SUBSCRIPTION_ENDS_AT_DATE(values),
      subscriptionStartsAt: SUBSCRIPTION_STARTS_AT_DATE(values),
      linkExpiry: formatLinkExpiry(linkExpiry),
      notificationToCustomer: notificationToCustomer
        ? notificationToCustomer
        : false,
    };
    let payload = {
      ...commonPayload,
      planId: subscriptionPlan,
      subscriptionPlan: subscriptionPlanData?.planName,
      dasmid: ID?.DASMID,
      tableData: subscriptionsTable?.subscriptions,
      handleDrawerClose: handleDrawerClose,
    };
    let createPayload = {
      ...commonPayload,
      ...payload,
      subscriber: {
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
    };
    let editPayload = {
      ...commonPayload,
      editAdditionalPayload: {
        tableData: subscriptionsTable?.subscriptions,
        handleDrawerClose: handleDrawerClose,
        startDate: startDate,
        subscriptionPlanAmount: subscriptionPlanData?.amount,
        subscriptionPlanCcy: subscriptionPlanData.ccy,
      },
      subscriptionId: subscriptionID?.id,
      sentEmailLanguage: SELECTED_LANGUAGE
        ? SELECTED_LANGUAGE
        : LANGUAGES.ENGLISH,
      planId: subscriptionPlan,
    };
    if (isDrawerEditable) {
      dispatch(editSubscription(editPayload));
    } else {
      dispatch(createSubscription(createPayload));
    }
  },
);

//Edit Subscription

export const editSubscription: any = createAsyncThunk(
  'statements/editSubscription',
  async (editPayload: any) => {
    const { subscriptionId, subscriptionStartsAt, subscriptionEndsAt } =
      editPayload;
    const {
      tableData,
      handleDrawerClose,
      startDate,
      subscriptionPlanAmount,
      subscriptionPlanCcy,
    } = editPayload?.editAdditionalPayload;
    delete editPayload['editAdditionalPayload'];
    let resp = await Api().patch(SUBSCRIPTIONS.EDIT_SUBSCRIPTION, { ...editPayload, ...(subscriptionEndsAt && {subscriptionEndsAt: new Date(subscriptionEndsAt)}) });
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(resp?.statusCode)) {
      DasSnackbar.success(resp?.message);
      const { data } = resp;
      let index = tableData.findIndex(
        (item: any) => item.id === subscriptionId,
      );
      let finalData = tableData;
      if (index !== -1) {
        let itemWithID = tableData[index];
        itemWithID = {
          ...itemWithID,
          subscriptionPlan: data?.subscriptionPlan,
          subscriptionStartsAt:
            startDate === SUBSCRIPTION_TYPE_VALUES.IMMEDIATELY
              ? new Date()
              : subscriptionStartsAt,
          subscriptionEndsAt: subscriptionEndsAt,
          subscriptionPlanAmount: subscriptionPlanAmount,
          subscriptionPlanCcy: subscriptionPlanCcy,
        };
        finalData = [
          ...tableData.slice(0, index),
          itemWithID,
          ...tableData.slice(index + 1),
        ];
      }
      handleDrawerClose();
      return finalData;
    }
  },
);

// Create Subscription
export const createSubscription: any = createAsyncThunk(
  'statements/createSubscription',
  async (createPayload: any, thunkAPI: any) => {
    const { dispatch } = thunkAPI;
    const { tableData, handleDrawerClose } = createPayload;
    delete createPayload['tableData'];
    delete createPayload['handleDrawerClose'];
    let response = await Api().post(
      SUBSCRIPTIONS.CREATE_SUBSCRIPTION,
      createPayload,
    );
    const { data } = response;
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(response?.statusCode)) {
      DasSnackbar.success(response.message);
      let newValue = {
        ...data,
        subscriberName: `${data?.firstName} ${data?.lastName}`,
        subscriptionPlanAmount: data?.subscriptionAmount,
        subscriptionPlanCcy: data?.subscriptionCcy,
        // trialPeriodDuration:
      };
      let finalData = [newValue, ...tableData];
      handleDrawerClose();

      return finalData;
    } else if ([HTTP_STATUS.NOT_ACCEPTABLE].includes(response?.status)) {
      // DasSnackbar.error(response.message);
      dispatch(setShowDuplicatePopup(true));
      return tableData;
      // dispatch(viewSubscriptionPlan(createPayload.planId))
    } else {
      return tableData;
    }
  },
);

// Edit subscription plan
export const editSubscriptionPlan: any = createAsyncThunk(
  'statements/editSubscriptionPlan',
  async (editSubscriptionPayload: any) => {
    const {
      id,
      tableData,
      handleDrawerClose,
      planName,
      billingCycleType,
      ccy,
      amount,
      trialPeriodDuration,
      planDiscountPercentage,
      planDiscountDuration,
      isActive,
    } = editSubscriptionPayload;
    delete editSubscriptionPayload['tableData'];
    delete editSubscriptionPayload['handleDrawerClose'];
    let data = await Api().put(
      `${SUBSCRIPTIONS.EDIT_SUBSCRIPTION_PLAN}/${id}`,
      editSubscriptionPayload,
    );
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      DasSnackbar.success(data?.message);
      let index = tableData.findIndex((item: any) => item.id === id);
      let finalData = tableData;
      if (index !== -1) {
        let itemWithID = tableData[index];
        itemWithID = {
          ...itemWithID,
          planName: planName,
          billingCycleType: billingCycleType,
          ccy: ccy,
          amount: amount,
          trialPeriodDuration: trialPeriodDuration,
          planDiscountPercentage: planDiscountPercentage,
          planDiscountDuration: planDiscountDuration,
          isActive: isActive,
        };

        finalData = [
          ...tableData.slice(0, index),
          itemWithID,
          ...tableData.slice(index + 1),
        ];
      }
      handleDrawerClose();
      return finalData;
    } else {
      return tableData;
    }
  },
);

// View Subscription Plan
export const viewSubscriptionPlan: any = createAsyncThunk(
  'statements/viewSubscriptionPlan',
  async (val: any) => {
    let response = await Api().get(
      `${SUBSCRIPTIONS.VIEW_SUBSCRIPTION_PLAN_DETAILS}/${val?.id ? val?.id : val
      }`,
    );
    const { data } = response;
    let updatedRecords = {
      ...data,
      planDiscountPercentage:
        val?.viewSubscription &&
          data?.planDiscountPercentage !== null &&
          data?.planDiscountDuration !== null
          ? `${data?.planDiscountPercentage} % First ${data?.planDiscountDuration
          }  ${i18next.t(SUBSCRIPTION_Type.Month)}`
          : data?.planDiscountPercentage
            ? data?.planDiscountPercentage
            : 'N/A',
      trialPeriodDuration:
        val?.viewSubscription &&
          data.trialPeriodDuration !== 'N/A' &&
          data.trialPeriodDuration !== null
          ? `${data.trialPeriodDuration} ${i18next.t(SUBSCRIPTION_Type.Days)}`
          : data?.trialPeriodDuration
            ? data?.trialPeriodDuration
            : 'N/A',
      isActive:
        data.isActive === true && val?.viewSubscription
          ? i18next.t(SUBSCRIPTION_Type.Active)
          : data.isActive === false && val?.viewSubscription
            ? i18next.t(SUBSCRIPTION_Type.InActive)
            : data?.isActive,
    };
    return updatedRecords;
  },
);

// View Subscriber
export const viewSubscriberDetails: any = createAsyncThunk(
  'statements/viewSubscriberDetails',
  async (id: any) => {
    let response = await Api().get(
      `${SUBSCRIPTIONS.VIEW_SUBSCRIBER_DETAILS}/${id}`,
    );
    const { data } = response;
    let updatedRecords = {
      ...data,
      billingCountry:
        data.billingCountry !== 'N/A'
          ? getCountry(data.billingCountry)?.name
          : 'N/A',
    };
    return updatedRecords;
  },
);

// View Subscription
export const viewSubscriptions: any = createAsyncThunk(
  'statements/viewSubscriptions',
  async (value: any) => {
    let response = await Api().get(
      `${SUBSCRIPTIONS.VIEW_SUBSCRIPTION_DETAILS}/${value?.id}`,
    );
    const { data } = response;

    let updatedRecords = {
      ...data,
      subscriptionStartsAt:
        data?.subscriptionStartsAt !== null &&
        data?.subscriptionStartsAt !== "N/A"
          ? getformatDate(
              new Date(data?.subscriptionStartsAt).toISOString(),
              DATE_FORMAT
            )
          : "N/A",

      subscriptionEndsAt:
        data?.subscriptionEndsAt !== null && data?.subscriptionEndsAt !== "N/A"
          ? getformatDate(
              new Date(data?.subscriptionEndsAt).toISOString(),
              DATE_FORMAT
            )
          : "N/A",

      linkExpiry:
        data?.linkExpiry !== null
          ? getformatDate(new Date(data?.linkExpiry).toISOString(), DATE_FORMAT)
          : "N/A",

      status:
        data?.status === SUBSCRIPTION_STATUS.INITIATED
          ? SUBSCRIPTION_STATUS.PENDING
          : data.status,
      subscriptionAmount: `${data?.subscriptionCcy} ${data?.subscriptionAmount}`,
      subscriptionLink: `${import.meta.env.VITE_GENERATE_LINK_URL}/${data?.id}`,
    };
    return updatedRecords;
  },
);

// Edit Subscriber
export const editSubscriber: any = createAsyncThunk(
  'statements/editSubscriber',
  async (values: any, thunkAPI: any) => {
    const { getState } = thunkAPI;
    const store = getState();
    const { subscriptionsTable } = store;
    let tableData = subscriptionsTable?.subscribers;
    const { id, handleDrawerClose } = values;
    delete values.id;
    delete values['tableData'];
    delete values['handleDrawerClose'];
    let data = await Api().patch(
      `${SUBSCRIPTIONS.EDIT_SUBSCRIBER}/${id}`,
      values,
    );
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      DasSnackbar.success(i18next.t('API_STATUS_MESSAGE.INFO_MS_0045'));
      let index = tableData.findIndex((item: any) => item.id === id);
      let finalData = tableData;
      if (index !== -1) {
        let itemWithID = tableData[index];
        itemWithID = {
          ...itemWithID,
          firstName: data?.data?.FirstName,
          lastName: data?.data?.LastName,
          billingCountry: data?.data?.BillingCountry,
          postCode: data?.data?.PostCode,
          email: data?.data?.Email,
          contactNo: data?.data?.ContactNo,
        };

        finalData = [
          ...tableData.slice(0, index),
          itemWithID,
          ...tableData.slice(index + 1),
        ];
      }
      handleDrawerClose();
      return finalData;
    }
  },
);

// Delete subscription plan
export const deleteSubscriptionPlan: any = createAsyncThunk(
  'chargeback/deleteSubscriptionPlan',
  async (values: any) => {
    const { id, subscriberCount, tableData } = values;
    if (subscriberCount === 0) {
      let data = await Api().delete(
        `${SUBSCRIPTIONS.DELETE_SUBSCRIPTION_PLAN}/${id}`,
      );
      if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
        let finalData = tableData.filter((item: any) => item.id != id);
        DasSnackbar.success(
          i18next.t(
            'Merchant_Detail.Subscription.deletePopup.subscriptionPlanDeleteMsg',
          ),
        );
        return finalData;
      }
    } else {
      DasSnackbar.error(
        i18next.t('Merchant_Detail.Subscription.subscriberCount'),
      );
      return tableData;
      // dispatch(setDrawer([]));
    }
  },
);

// Cancel subscription
export const cancelSubscription: any = createAsyncThunk(
  'chargeback/cancelSubscription',
  async (values: any) => {
    const { id, tableData } = values;
    let data = await Api().post(`${SUBSCRIPTIONS.CANCEL_SUBSCRIPTION}/${id}`);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      let index = tableData.findIndex((item: any) => item.id === id);
      let finalData = tableData;
      if (index !== -1) {
        let itemWithID = tableData[index];
        itemWithID = { ...itemWithID, status: SUBSCRIPTION_STATUS.CANCELLED };

        finalData = [
          ...tableData.slice(0, index),
          itemWithID,
          ...tableData.slice(index + 1),
        ];
      }
      DasSnackbar.success(data?.message);
      return finalData;
    }
  },
);

// Pause/Resume subscription
export const pauseSubscription: any = createAsyncThunk(
  'chargeback/pauseSubscription',
  async (values: any) => {
    const { id, tableData } = values;
    let data =
      values.status === SUBSCRIPTION_STATUS.PAUSED
        ? await Api().post(`${SUBSCRIPTIONS.RESUME_SUBSCRIPTION}/${id}`)
        : await Api().post(`${SUBSCRIPTIONS.PAUSE_SUBSCRIPTION}/${id}`);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      let index = tableData.findIndex((item: any) => item.id === id);
      let finalData = tableData;
      if (index !== -1) {
        let itemWithID = tableData[index];
        itemWithID = {
          ...itemWithID,
          status:
            values.status === SUBSCRIPTION_STATUS.PAUSED
              ? SUBSCRIPTION_STATUS.ACTIVE
              : SUBSCRIPTION_STATUS.PAUSED,
        };

        finalData = [
          ...tableData.slice(0, index),
          itemWithID,
          ...tableData.slice(index + 1),
        ];
      }
      DasSnackbar.success(data?.message);
      return finalData;
    }
  },
);

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
    count: 0,
    loading: false,
    error: null,
    viewSubscription: {},
    subscriptionsPlan: [],
    subscribers: [],
    subscriptionDrawerTitle: '',
    showDuplicatePopup: false,
    selectedPlan: {},
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.subscriptions = [payload, ...state.subscriptions];
    },
    approveStatemenetRow: (state: any, { payload }) => {
      state.subscriptions = [payload, ...state.subscriptions];
    },
    setSubscriptionDrawerTitle: (state: any, { payload }) => {
      state.subscriptionDrawerTitle = payload;
    },
    setShowDuplicatePopup: (state: any, { payload }) => {
      state.showDuplicatePopup = payload;
    },
    setSelectedPlan: (state: any, { payload }) => {
      state.selectedPlan = payload;
    },
  },
  extraReducers: builder => {
    //Subscription list
    builder.addCase(getSubscriptionsPlans.pending, state => {
      state.loading = true;
    });
    builder.addCase(getSubscriptionsPlans.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptionsPlan = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getSubscriptionsPlans.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Subscription

    builder.addCase(getSubscriptions.pending, state => {
      state.loading = true;
    });
    builder.addCase(getSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptions = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getSubscriptions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Subscribers

    builder.addCase(getSubscribers.pending, state => {
      state.loading = true;
    });
    builder.addCase(getSubscribers.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribers = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getSubscribers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //View Subscriptions

    builder.addCase(viewSubscriptionPlan.pending, state => {
      state.loading = true;
    });
    builder.addCase(viewSubscriptionPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.viewSubscription = action?.payload;
      // state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(viewSubscriptionPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //View Subscriber
    builder.addCase(viewSubscriberDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(viewSubscriberDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewSubscription = action?.payload;
      // state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(viewSubscriberDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editSubscriber.pending, state => {
      state.loading = true;
    });
    builder.addCase(editSubscriber.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribers = action?.payload;
      // state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(editSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //View Subscription
    builder.addCase(viewSubscriptions.pending, state => {
      state.loading = true;
    });
    builder.addCase(viewSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.viewSubscription = action?.payload;
      // state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(viewSubscriptions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //delete subscription plan
    builder.addCase(deleteSubscriptionPlan.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteSubscriptionPlan.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subscriptionsPlan = payload;
    });
    builder.addCase(deleteSubscriptionPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //cancel subscription

    builder.addCase(cancelSubscription.pending, state => {
      state.loading = true;
    });
    builder.addCase(cancelSubscription.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subscriptions = payload;
    });
    builder.addCase(cancelSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Pause subscription
    builder.addCase(pauseSubscription.pending, state => {
      state.loading = true;
    });
    builder.addCase(pauseSubscription.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subscriptions = payload;
    });
    builder.addCase(pauseSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Add subcription plan
    builder.addCase(createSubscriptionPlan.pending, state => {
      state.loading = true;
    });
    builder.addCase(createSubscriptionPlan.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subscriptionsPlan = payload;
    });
    builder.addCase(createSubscriptionPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //edit subscription plan
    builder.addCase(editSubscriptionPlan.pending, state => {
      state.loading = true;
    });
    builder.addCase(editSubscriptionPlan.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subscriptionsPlan = payload;
    });
    builder.addCase(editSubscriptionPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Add subscription

    builder.addCase(createSubscription.pending, state => {
      state.loading = true;
    });
    builder.addCase(createSubscription.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subscriptions = payload;
    });
    builder.addCase(createSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //edit subscription

    builder.addCase(editSubscription.pending, state => {
      state.loading = true;
    });
    builder.addCase(editSubscription.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subscriptions = payload;
    });
    builder.addCase(editSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const {
  addNewRow,
  setSubscriptionDrawerTitle,
  setShowDuplicatePopup,
  setSelectedPlan,
} = subscriptionsSlice.actions;

export const riskRows = (state: any) => state?.subscriptions?.subscriptionsPlan;
export const rowsCount = (state: any) => state?.subscriptionsTable?.count;
export const subscriptionTableLoading = (state: any) => state?.subscriptionsTable?.loading;
export default subscriptionsSlice;
