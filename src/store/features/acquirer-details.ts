import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { setDrawer } from './drawer';
import { DRAWER_TYPE } from '../../components/constants/drawer';
import { ACQUIRER } from '../../components/constants/api-paths';

// createAsyncThunk
export const getAcquirerDetails: any = createAsyncThunk(
  'acquirer/getAcquirerDetails',
  async apiPath => {
    let data = await Api().get(apiPath);
    return data;
  },
);
export const getAcquirerDetailsAndOpenDrawer: any = createAsyncThunk(
  'acquirer/getAcquirerDetailsAndOpenDrawer',
  async ({ title, id }: any, { dispatch, getState }) => {
    const store: any = getState();
    const drawer = store.drawer.drawer;
    dispatch(setDrawer([
      ...drawer, {
        type: DRAWER_TYPE.ACQUIRER_DETAILS,
        isDrawerOpen: true,
        title
      }
    ]));
    let data = await Api().get(`${ACQUIRER.ACQUIRER_MID_DETAILS}/${id}`);
    return data;
  },
);

// createSlice
export const acquirerDetailsSlice = createSlice({
  name: 'acquirerDetails',
  initialState: {
    details: {},
    acquirerTable: [],
    loading: false,
    error: null,
    path: '',
    acquirerMIDDetails: {},
    AcquirerMIDOptions: []
  },
  reducers: {
    addNewRow: (state: any, { payload }: any) => {
      state.acquirerTable = [payload, ...state.acquirerTable];
    },
    acquirerDetailsPath: (state: any, { payload }: any) => {
      state.path = payload;
    },
    setAcquirerMIDDetails: (state: any, { payload }: any) => {
      state.acquirerMIDDetails = payload;
    },
    resetAcquirerDetails: (state: any) => {
      state.details = {};
      state.acquirerTable = [];
      state.loading = false;
      state.error = null;
      state.path = '';
      state.acquirerMIDDetails = {};
      state.AcquirerMIDOptions = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(getAcquirerDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAcquirerDetails.fulfilled, (state, action) => {
      const urlParams = new URLSearchParams(window.location.search);
      const acquirerMidRecord = urlParams.get('acquirer-mid-drawer');
      state.loading = false;
      state.details = action?.payload?.data;
      state.acquirerTable = action?.payload?.data.AcquirerMID;
      if (!action?.meta?.arg?.includes('?AcquirerMID')) {
        state.AcquirerMIDOptions = action?.payload?.data.AcquirerMID?.map((item: any) => item.AcquirerMID);
      }
      state.acquirerMIDDetails = action?.payload?.data.AcquirerMID.find(
        (ele: any) => ele.ID === acquirerMidRecord,
      );
    });
    builder.addCase(getAcquirerDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAcquirerDetailsAndOpenDrawer.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAcquirerDetailsAndOpenDrawer.fulfilled, (state, action) => {
      //const urlParams = new URLSearchParams(window.location.search);
      //const acquirerMidRecord = urlParams.get('acquirer-mid-drawer');
      state.loading = false;
      state.details = action?.payload?.data;
      state.acquirerTable = action?.payload?.data.AcquirerMID;
      // state.acquirerMIDDetails = action?.payload?.data.AcquirerMID.find(
      //   (ele: any) => ele.ID === acquirerMidRecord,
      // );
    });
    builder.addCase(getAcquirerDetailsAndOpenDrawer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const acquirerDetailsData = (state: any) =>
  state?.acquirerDetails;

export const { addNewRow, acquirerDetailsPath, setAcquirerMIDDetails, resetAcquirerDetails } =
  acquirerDetailsSlice.actions;

export default acquirerDetailsSlice.reducer;
