import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { MERCHANT_DETAILS } from '../../components/constants/api-paths';
import { HTTP_STATUS } from '../../components/constants';
import DasSnackbar from '../../components/das-snackbar/DasSnackbar';
import { SUBSCRIPTION_STATUS } from '../../pages/merchants/merchant-view/components/drawers/subscription-drawer/constants/subscription';
import { resetPblCartTable } from './add-pbl';
import { setDrawer } from './drawer';
import { t } from 'i18next';

// createAsyncThunk
export const getPayByLinkTable: any = createAsyncThunk(
  'payByLink/getPayByLinkTable',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);

export const generatePBLLink: any = createAsyncThunk(
  'payByLink/generatePBLLink',
  async ({ dateValue, PBLLinkName }: any, thunkAPI: any) => {
    const { getState, dispatch } = thunkAPI;
    const store = getState();
    const { pblCartTable, drawer, payByLinkTable } = store;
    let DASMID = drawer?.drawer[0]?.DASMID;
    let { rows } = payByLinkTable;
    let cartData = pblCartTable.pblCartTable;
    let payload = cartData.map((item: any) => {
      let newItem = { ...item };
      const idIndex = Object.keys(item).find(key => key === 'Id');
      if (idIndex !== undefined) {
        delete newItem[idIndex];
      }
      newItem.TotalPrice = item.TotalPrice.toString();
      return newItem;
    });
    let data: any = {
      Product: payload,
      ExpiryDate: dateValue,
      PBLLinkName,
    };
    let generateLinkPayload = {
      payload: data,
      DASMID: DASMID,
      rows: rows,
      drawer: drawer,
      dateValue: dateValue,
    };
    let reGenerateLinkPayload = {
      payload: data,
      DASMID: DASMID,
      pblCartTable: pblCartTable,
      rows: rows,
      drawer: drawer,
      dateValue: dateValue,
    };
    if (pblCartTable?.Link) {
      dispatch(reGenerateLink(reGenerateLinkPayload));
    } else {
      dispatch(generateLink(generateLinkPayload));
    }
  },
);
export const generateLink: any = createAsyncThunk(
  'payByLink/generateLink',
  async (values: any, thunkAPI: any) => {
    const { dispatch } = thunkAPI;
    const { payload, DASMID, rows, drawer, dateValue } = values;
    let data = await Api().post(
      `${MERCHANT_DETAILS.GENERATE_LINK}/${DASMID}`,
      payload,
    );
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      let totalPriceSum = 0;
      data?.data?.Product?.forEach((item: any) => {
        totalPriceSum += parseFloat(item.TotalPrice);
      });
      const { Currency, ProductID, PBLLinkName } = data?.data;
      let newData = {
        Link: ProductID,
        CreatedAt: new Date(),
        Status: SUBSCRIPTION_STATUS.ACTIVE,
        Amount: `${Currency} ${totalPriceSum}`,
        ExpiryDate: dateValue,
        PBLLinkName
      };
      let finalData = [newData, ...rows];
      DasSnackbar.success(t(`API_STATUS_MESSAGE.${data?.messageCode}`));
      const filterItems = drawer?.drawer?.filter(
        (item: any) => item.type !== drawer.drawer[1].type,
      );
      dispatch(setDrawer([...filterItems]));
      dispatch(resetPblCartTable());
      return finalData;
    } else {
      return rows;
    }
  },
);
export const deactivatePBLLink: any = createAsyncThunk(
  'payByLink/deactivatePBLLink',
  async (value: any, thunkAPI: any) => {
    const { getState, dispatch } = thunkAPI;
    // const { drawer } = value;
    const store = getState();
    const { pblCartTable, drawer, payByLinkTable } = store;
    const result = await Api().delete(
      `${MERCHANT_DETAILS.REGENERATE_LINK}/${value?.DASMID}/order/${pblCartTable?.Link}`,
    );
    const { rows } = payByLinkTable;
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(result?.statusCode)) {
      let index = rows.findIndex(
        (item: any) => item.Link === pblCartTable?.Link,
      );
      let finalData = rows;
      if (index !== -1) {
        let itemWithID = rows[index];
        itemWithID = {
          ...itemWithID,
          Status: SUBSCRIPTION_STATUS.INACTIVE,
        };
        finalData = [
          ...rows.slice(0, index),
          itemWithID,
          ...rows.slice(index + 1),
        ];
      }
      DasSnackbar.success(t(`API_STATUS_MESSAGE.${result?.messageCode}`));
      const filterItems = drawer?.drawer?.filter(
        (item: any) => item.type !== drawer.drawer[1].type,
      );
      dispatch(setDrawer([...filterItems]));
      dispatch(resetPblCartTable());
      return finalData;
    }
  },
);
export const reGenerateLink: any = createAsyncThunk(
  'payByLink/reGenerateLink',
  async (values: any, thunkAPI: any) => {
    const { dispatch } = thunkAPI;
    const { payload, dateValue, DASMID, pblCartTable, rows, drawer } =
      values;
    let data = await Api().patch(
      `${MERCHANT_DETAILS.REGENERATE_LINK}/${DASMID}/order/${pblCartTable.Link}`,
      payload,
    );
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      const { Currency } = data?.data?.Product[0];
      let totalPriceSum = 0;
      data?.data?.Product?.forEach((item: any) => {
        totalPriceSum += parseFloat(item.TotalPrice);
      });
      let index = rows.findIndex(
        (item: any) => item.Link === pblCartTable?.Link,
      );
      let finalData = rows;
      if (index !== -1) {
        let itemWithID = rows[index];
        itemWithID = {
          ...itemWithID,
          ExpiryDate: dateValue,
          Status: SUBSCRIPTION_STATUS.ACTIVE,
          PBLLinkName: payload.PBLLinkName,
          Amount: `${Currency} ${totalPriceSum}`,
        };
        finalData = [
          ...rows.slice(0, index),
          itemWithID,
          ...rows.slice(index + 1),
        ];
      }
      DasSnackbar.success(t(`API_STATUS_MESSAGE.${data?.messageCode}`));
      const filterItems = drawer?.drawer?.filter(
        (item: any) => item.type !== drawer.drawer[1].type,
      );
      dispatch(setDrawer([...filterItems]));
      dispatch(resetPblCartTable());
      return finalData;
    }
  },
);
// createSlice
export const payByLinkTableSlice = createSlice({
  name: 'payByLinkTable',
  initialState: {
    rows: [],
    loading: false,
    count: 0,
    error: null,
    payByLinkId: '',
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.rows = [payload, ...state.rows];
    },
    deleteRow: (state: any, { payload }) => {
      state.rows = state.rows.filter(
        (item: any) => item.ID !== payload,
      );
    },
    newPayByLinkTable: (state: any, { payload }) => {
      state.rows = [...payload];
    },
    // updateTable: (state: any, { payload }) => {
    //   let index =
    //     state.payByLinkTable.indexOf(payload) + state.payByLinkTable.length;

    //   const { Link, CreatedAt, Amount, ExpiryDate } = payload;

    //   const updatedPayload = {
    //     Link,
    //     CreatedAt,
    //     Amount: `JPY ${Amount}`,
    //     ExpiryDate,
    //     ProductLink: `${productLink}/${Link}`,
    //     Status: "INactive",
    //   };
    //   console.log(index, updatedPayload);

    //   state.payByLinkTable = [
    //     ...(state.payByLinkTable.slice(0, index) + updatedPayload,
    //     [...state.payByLinkTable.slice(index)]),
    //   ];
    // },
  },
  extraReducers: builder => {
    builder.addCase(getPayByLinkTable.pending, state => {
      state.loading = true;
    });
    builder.addCase(getPayByLinkTable.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action?.payload?.data?.total_count;
      state.rows = action?.payload?.data?.records;
    });
    builder.addCase(getPayByLinkTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(generateLink.pending, state => {
      state.loading = true;
    });
    builder.addCase(generateLink.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.rows = payload;
    });
    builder.addCase(generateLink.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //regenerate
    builder.addCase(reGenerateLink.pending, state => {
      state.loading = true;
    });
    builder.addCase(reGenerateLink.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.rows = payload;
    });
    builder.addCase(reGenerateLink.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //deactivate
    builder.addCase(deactivatePBLLink.pending, state => {
      state.loading = true;
    });
    builder.addCase(deactivatePBLLink.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.rows = payload;
    });
    builder.addCase(deactivatePBLLink.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
// for editing I am removing the old row and adding the new row
export const { addNewRow, deleteRow, newPayByLinkTable } =
  payByLinkTableSlice.actions;

export const pblMainTableGlobalData = (state: any) => state?.payByLinkTable;
export default payByLinkTableSlice.reducer;
