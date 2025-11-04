import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import i18n from '../../i18n';
// import { getBase64 } from "../../utils/helper";

// createAsyncThunk
export const getPblCartTable: any = createAsyncThunk(
  'pbl/getPblCartTable',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);
// createAsyncThunk
export const getPblCartTableWithImage: any = createAsyncThunk(
  'pbl/getPblCartTableWithImage',
  async (urlencoded: any) => {
    const data = await Api().post(`paybylink/image/upload`, urlencoded, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return data.data;
  },
);

// createSlice
export const pblCartTableSlice = createSlice({
  name: 'pblCartTable',
  initialState: {
    pblCartTable: [],
    // count: 0,
    loading: false,
    error: null,
    Total: 0,
    ExpiryDate: '',
    Status: '',
    Link: '',
    ButtonText: 'PayByLinkConfiguration.Pbl_button.Generate Link',
    isDisableLink: false,
    url: '',
    Currency: '',
    pblCartDetails: {},
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      if (payload.Id) {
        state.pblCartTable = state.pblCartTable.filter(
          (item: any) => item.Id !== payload.Id,
        );
      }
      state.pblCartTable = [
        {
          ...payload,
          Id: Date.now(),
          TotalPrice: payload.Quantity * payload.Price,
        },
        ...state.pblCartTable,
      ];
      state.Total = state.pblCartTable.reduce(function add(
        accumulator: any,
        a: any,
      ) {
        return parseFloat(accumulator) + parseFloat(a.TotalPrice);
      },
      0);
      state.Currency = payload.Currency;
    },
    deleteRow: (state: any, { payload }) => {
      let totalCount = parseFloat(state.Total) - parseFloat(payload.TotalPrice);
      if (payload.Id) {
        state.pblCartTable = state.pblCartTable.filter(
          (item: any) => item.Id !== payload.Id,
        );
        state.Total = totalCount;
        state.Currency = totalCount === 0 ? '' : payload?.Currency;
      }
    },
    resetPblCartTable: (state: any) => {
      (state.pblCartTable = []),
        // count= 0,
        (state.loading = false),
        (state.error = null),
        (state.Total = 0),
        (state.ExpiryDate = ''),
        (state.Status = ''),
        (state.Link = ''),
        (state.Currency = ''),
        (state.ButtonText = i18n.t(
          'PayByLinkConfiguration.Pbl_button.Generate Link',
        ));
      state.isDisableLink = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPblCartTable.pending, state => {
      state.loading = true;
    });
    builder.addCase(getPblCartTable.fulfilled, (state, action) => {
      state.loading = false;
      state.pblCartTable = action?.payload?.data[0].Product;
      state.ExpiryDate = action?.payload?.data[0].ExpiryDate;
      state.Status = action?.payload?.data[0]?.status;
      state.Link = action?.payload?.data[0]?.ProductID;
      // state.Link = action?.payload?.data[0]?.ProductID;
      state.ButtonText = i18n.t(
        'Merchant_Detail.Subscription.buttons.regenerateLink',
      );
      state.isDisableLink = true;
      state.Currency = action?.payload?.data[0]?.Product[0]?.Currency;
      state.pblCartDetails = action?.payload?.data[0];
      state.Total = action?.payload?.data[0]?.Amount;
    });
    builder.addCase(getPblCartTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // =================================================================
    builder.addCase(getPblCartTableWithImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(getPblCartTableWithImage.fulfilled, (state, action) => {
      state.loading = false;
      state.url = action?.payload;
    });
    builder.addCase(getPblCartTableWithImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addNewRow, deleteRow, resetPblCartTable } =
  pblCartTableSlice.actions;

export const loadingPblCartTableRows = (state: any) => state?.pblCartTable?.loading;

export default pblCartTableSlice.reducer;
