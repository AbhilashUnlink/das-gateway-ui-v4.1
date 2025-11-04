import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { HTTP_STATUS } from '../../components/constants';
import DasSnackbar from '../../components/das-snackbar/DasSnackbar';
import {
  MERCHANT_DETAILS,
  PRODUCT_RISK,
  USER_MANAGEMENT,
} from '../../components/constants/api-paths';
import { SUBSCRIPTION_STATUS } from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/constants/subscription';
import { setDrawer } from './drawer';
import { DRAWER_TYPE } from '../../components/constants/drawer';
import i18next from 'i18next';
import { ROUTE } from 'components/constants/route';

// createAsyncThunk
export const getMerchantDetails: any = createAsyncThunk(
  'merchant/getMerchant',
  async merchantID => {
    const merchantDetails = await Api().get(
      `${MERCHANT_DETAILS.MERCHANT_LIST}${merchantID}/`,
    );
    // handling Access denied ...
    if (merchantDetails.messageCode ==='ERR0000'){
      window.location.href = `${window.location.origin}/${ROUTE.MERCHANTS}`;
    }else{
      return merchantDetails.data;
    }
  },
);
export const getMerchantDetailsOnTransactionDetails: any = createAsyncThunk(
  'transaction/getMerchantDetailsOnTransactionDetails',
  async ({ merchantID, name }: any, { dispatch, getState }) => {
    const store: any = getState();
    const drawer = store.drawer.drawer;
    dispatch(setDrawer([...drawer, {
      title: `${name}`,
      type: DRAWER_TYPE.MERCHANT_DETAILS,
      isDrawerOpen: true
    }]));
    const merchantDetails = await Api().get(
      `${MERCHANT_DETAILS.MERCHANT_LIST}${merchantID}/`,
    );
    // if ([HTTP_STATUS.OK]?.includes(merchantDetails.statusCode)) {
    // }
    return merchantDetails.data;
  },
);

// createAsyncThunk
export const updateDASMIDStatusFromMerchantDetails: any = createAsyncThunk(
  'merchantDetailsProductSection/updateDASMIDStatusFromMerchantDetails',
  async (payload: any) => {
    const { DASMID, locationId, status, merchantDetails } = payload;
    let result = await Api().patch(PRODUCT_RISK.UPDATE_DASMID_STATUS, {
      DASMID,
      locationId,
      status,
    });
    if ([HTTP_STATUS.OK].includes(result.statusCode)) {
      DasSnackbar.success(result.message);
      let index = merchantDetails.Products.findIndex(
        (item: any) => item.DASMID === payload.DASMID,
      );
      let finalData = merchantDetails;
      if (index !== -1) {
        let itemWithDasmid = merchantDetails.Products[index];
        itemWithDasmid = { ...itemWithDasmid, Status: payload.status };

        finalData = {
          ...merchantDetails,
          Products: [
            ...merchantDetails.Products.slice(0, index),
            itemWithDasmid,
            ...merchantDetails.Products.slice(index + 1),
          ],
        };
      }
      // This is just temporary solution because final data is getting changed on redux so will look for a better solution
      window.location.reload();
      return finalData;
    } else return;
  },
);

// user mamangement
export const getUserManagementTable: any = createAsyncThunk(
  'partner/getUserManagementTable',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);

//reset password -user management
export const resetUserManagementPassword: any = createAsyncThunk(
  'partner/resetUserManagementPassword',
  async id => {
    let result = await Api().post(`${USER_MANAGEMENT.RESET_PASSWORD}${id}`);
    if ([HTTP_STATUS.OK].includes(result.statusCode)) {
      DasSnackbar.success(i18next.t(`API_STATUS_MESSAGE.${result?.messageCode}`));
    }
    else if ([HTTP_STATUS.BAD_REQUEST, HTTP_STATUS.INTERNAL_SERVER].includes(result.statusCode)) {
      DasSnackbar.error(i18next.t(`API_STATUS_MESSAGE.${result?.messageCode}`));
    }
    return result;
  },
);
//active/Inactive user- user management
export const setActiveUserManagementRecord: any = createAsyncThunk(
  'chargeback/setActiveUserManagementRecord',
  async (values: any, thunkAPI: any) => {
    const { getState } = thunkAPI;
    const store = getState();
    const { userManagement } = store.merchant;
    const { userId, status } = values;
    let payload = {
      userId: userId,
      enabled: status === SUBSCRIPTION_STATUS.INACTIVE ? true : false,
    };
    let data = await Api().patch(
      `${USER_MANAGEMENT.USER_STATUS}/${userId}`,
      payload,
    );
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      let index = userManagement.findIndex(
        (item: any) => item.userId === userId,
      );
      let finalData = userManagement;
      if (index !== -1) {
        let itemWithID = userManagement[index];
        itemWithID = {
          ...itemWithID,
          status:
            status === SUBSCRIPTION_STATUS.INACTIVE
              ? SUBSCRIPTION_STATUS.ACTIVE
              : status === SUBSCRIPTION_STATUS.ACTIVE
                ? SUBSCRIPTION_STATUS.INACTIVE
                : status,
        };
        finalData = [
          ...userManagement.slice(0, index),
          itemWithID,
          ...userManagement.slice(index + 1),
        ];
      }
      DasSnackbar.success(data?.message);
      return finalData;
    }
  },
);

export const deleteUserRecord: any = createAsyncThunk(
  'chargeback/deleteUserRecord',
  async (values: any, thunkAPI: any) => {
    const { userId } = values;
    const { getState } = thunkAPI;
    const store = getState();
    const { userManagement } = store.merchant;
    let data = await Api().delete(
      `${USER_MANAGEMENT.USER_MANAGEMENT_LIST}/${userId}`,
    );
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      let finalData = userManagement.filter(
        (item: any) => item.userId != userId,
      );
      DasSnackbar.success(data.message);
      return finalData;
    }
  },
);

//add user
export const userRecord: any = createAsyncThunk(
  'chargeback/addUserRecord',
  async (values: any, thunkAPI: any) => {
    const { getState, dispatch } = thunkAPI;
    dispatch(setUserManagementLoading(true));
    const store = getState();
    const { drawer } = store;
    const { merchantDetails, userManagement, viewUserRecord } = store.merchant;
    const { initialData, handleDrawerClose } = values;
    let isDrawerEditable = drawer?.drawer?.find((ele: any) => ele.isEdit);
    let payload = {
      initialData: {
        ...initialData,
        groups: [values.groups],
        merchantID: merchantDetails.MerchantID,
      },
      additionalData: {
        userManagement: userManagement,
        handleDrawerClose: handleDrawerClose,
        userId: viewUserRecord.userId,
        createdDate: viewUserRecord.createdDate,
      },
    };
    if (isDrawerEditable) {
      dispatch(editUserRecord(payload));
    } else {
      dispatch(addUserRecord(payload));
    }
  },
);

export const addUserRecord: any = createAsyncThunk(
  'chargeback/addUserRecord',
  async (payload: any, { dispatch }) => {
    const { initialData, additionalData } = payload;
    let response = await Api().post(
      USER_MANAGEMENT.ADD_USER_INFO_QUERY,
      initialData,
    );
    const { data } = response;
    dispatch(setUserManagementLoading(false));

    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(response?.statusCode)) {
      let newValue = {
        ...data,
        createdDate: new Date(),
      };
      let finalData = [newValue, ...additionalData.userManagement];
      DasSnackbar.success(response?.message);
      additionalData.handleDrawerClose();
      return finalData;
    } else {
      return additionalData.userManagement;
    }
  },
);

//edit user
export const editUserRecord: any = createAsyncThunk(
  'statements/editUserRecord',
  async (payload: any, { dispatch }) => {
    const { initialData, additionalData } = payload;
    let response = await Api().patch(
      `${USER_MANAGEMENT.USER_MANAGEMENT_LIST}/${additionalData?.userId}`,
      initialData,
    );
    dispatch(setUserManagementLoading(false));
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(response?.statusCode)) {
      DasSnackbar.success(response?.message);
      let index = additionalData.userManagement.findIndex(
        (item: any) => item.userId === additionalData.userId,
      );
      let finalData = additionalData.userManagement;
      if (index !== -1) {
        let itemWithID = additionalData.userManagement[index];
        itemWithID = {
          ...payload?.initialData,
        };

        finalData = [
          ...additionalData.userManagement.slice(0, index),
          itemWithID,
          ...additionalData.userManagement.slice(index + 1),
        ];
      }
      additionalData.handleDrawerClose();
      return finalData;
    } else {
      return additionalData.userManagement;
    }
  },
);

// createSlice
export const merchantSlice = createSlice({
  name: 'merchant',
  initialState: {
    merchantDetails: {},
    merchantDetailsProductList: [],
    userManagementLoading: false,
    loading: false,
    error: null,
    userManagement: [],
    count: 0,
    viewUserRecord: {},
    productTypeDasMid: [],
    filteredDASMID: [],
  },
  reducers: {
    setUserManagementLoading: (state, action) => {
      state.userManagementLoading = action.payload;
    },
    clearMerchantDetails: state => {
      state.merchantDetails = {};
    },
    // setMerchantDetailsProductList: (state, action) => {
    //   state.merchantDetailsProductList = action.payload;
    // },
    setViewUserRecord: (state, action) => {
      state.viewUserRecord = action.payload;
    },
    setFilteredDASMID: (state, action) => {
      state.filteredDASMID = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMerchantDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(getMerchantDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.merchantDetails = action?.payload;
      state.productTypeDasMid = action?.payload?.Products.map((item: any) => {
        return {
          label: `${item.DASMID}-(${item.Type})`,
          value: `${item.DASMID}`,
        };
      });
      state.merchantDetailsProductList = action?.payload?.Products;
      // state.filteredDASMID = action?.payload?.Products?.map(
      //   (ele: any) => ele.DASMID,
      // );
    });
    builder.addCase(getMerchantDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getMerchantDetailsOnTransactionDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(getMerchantDetailsOnTransactionDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.merchantDetails = action?.payload;
      state.productTypeDasMid = action?.payload?.Products.map((item: any) => {
        return {
          label: `${item.DASMID}-(${item.Type})`,
          value: `${item.DASMID}`,
        };
      });
      state.merchantDetailsProductList = action?.payload?.Products;
      // state.filteredDASMID = action?.payload?.Products?.map(
      //   (ele: any) => ele.DASMID,
      // );
    });
    builder.addCase(getMerchantDetailsOnTransactionDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Update DASMID Status

    builder.addCase(updateDASMIDStatusFromMerchantDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateDASMIDStatusFromMerchantDetails.fulfilled,
      (state, action) => {
        state.merchantDetails = action.payload;
      },
    );
    builder.addCase(updateDASMIDStatusFromMerchantDetails.rejected, () => { });

    //User Management
    builder.addCase(getUserManagementTable.pending, state => {
      state.loading = true;
    });
    builder.addCase(getUserManagementTable.fulfilled, (state, action) => {
      state.loading = false;
      state.userManagement = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getUserManagementTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //add user
    builder.addCase(addUserRecord.pending, state => {
      state.loading = true;
    });
    builder.addCase(addUserRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.userManagement = action?.payload;
    });
    builder.addCase(addUserRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //edit user
    builder.addCase(editUserRecord.pending, state => {
      state.loading = true;
    });
    builder.addCase(editUserRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.userManagement = action?.payload;
    });
    builder.addCase(editUserRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //active inactive status
    builder.addCase(setActiveUserManagementRecord.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      setActiveUserManagementRecord.fulfilled,
      (state, action) => {
        state.loading = false;
        state.userManagement = action?.payload;
      },
    );
    builder.addCase(setActiveUserManagementRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //delete record
    builder.addCase(deleteUserRecord.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteUserRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.userManagement = action?.payload;
    });
    builder.addCase(deleteUserRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const merchantDetails = (state: any) => state.merchant.merchantDetails;
export const merchantName = (state: any) =>
  state.merchant.merchantDetails.LegalName;
export const productsInformation = (state: any) =>
  state?.merchant?.merchantDetails?.Products;
export const loadingMerchantDetailsPage = (state: any) => state.merchant.loading;
export const userManagementLoading = (state: any) => state.merchant.userManagementLoading;
export const {
  clearMerchantDetails,
  // setMerchantDetailsProductList,
  setViewUserRecord,
  setFilteredDASMID,
  setUserManagementLoading
} = merchantSlice.actions;
export default merchantSlice.reducer;
