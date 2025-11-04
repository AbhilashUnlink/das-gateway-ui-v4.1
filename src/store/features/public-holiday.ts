import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useFetchWrapper as Api } from "../../utils";
import { STATEMENT } from "../../components/constants/api-paths";
import DasSnackbar from "../../components/das-snackbar/DasSnackbar";
import { HTTP_STATUS } from "../../components/constants";
import { DRAWER_TYPE } from "../../components/constants/drawer";
import { setDrawer } from "./drawer";
import { store } from "../store";
// createAsyncThunk
export const getPublicHoliday: any = createAsyncThunk(
  "statements/getPublicHoliday",
  async (apiPath) => {
    store.dispatch(setHolidayAPIPath(apiPath));
    let data = await Api().get(apiPath);
    return data;
  }
);
export const deletePublicHoliday: any = createAsyncThunk(
  "statements/deletePublicHoliday",
  async (values: any) => {
    let payload = {
      ...values,
      IsActive: 0,
    };
    let data = await Api().put(STATEMENT.PUBLIC_HOLIDAY_LIST, payload);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      DasSnackbar.success(data?.message);
      return values.ID;
    }
  }
);
export const addPublicHoliday: any = createAsyncThunk(
  "statements/addPublicHoliday",
  async (payload: any, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const store: any = getState();
    const { publicHoliday } = store;
    let data = await Api().put(STATEMENT.PUBLIC_HOLIDAY_LIST, payload);
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      DasSnackbar.success(data?.message);
      dispatch(getPublicHoliday(publicHoliday.holidayAPIPath));
      dispatch(
        setDrawer([
          {
            type: DRAWER_TYPE.ADD_HOLIDAY,
            isDrawerOpen: false,
          },
        ])
      );
      return payload.ID;
    }
  }
);

export const uploadPublicHoliday: any = createAsyncThunk(
  "statements/uploadPublicHoliday",
  async (formData: any, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const data = await Api().post(
      STATEMENT.UPLOAD_PUBLIC_HOLIDAY_LIST,
      formData
    );
    if ([HTTP_STATUS.CREATED, HTTP_STATUS.OK].includes(data?.statusCode)) {
      DasSnackbar.success(data?.message);
      dispatch(
        setDrawer([
          {
            type: DRAWER_TYPE.UPLOAD_HOLIDAY,
            isDrawerOpen: false,
          },
        ])
      );
    }
  }
);
// createSlice
export const publicHolidayTableSlice = createSlice({
  name: "publicHoliday",
  initialState: {
    rows: [],
    count: 0,
    loading: false,
    error: null,
    holidayAPIPath: "",
  },
  reducers: {
    addNewRow: (state: any, { payload }) => {
      state.publicHolidayTable = [payload, ...state.publicHolidayTable];
    },
    deletePublicHolidayRow: (state: any, { payload }) => {
      state.publicHolidayTable = [payload, ...state.publicHolidayTable];
    },
    setHolidayAPIPath: (state: any, { payload }) => {
      state.holidayAPIPath = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPublicHoliday.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPublicHoliday.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.records[0]?.TotalCount;
    });
    builder.addCase(getPublicHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //Add public holiday
    builder.addCase(addPublicHoliday.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPublicHoliday.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.rows = state?.rows?.filter((item: any) => item.ID !== payload);
      state.count = payload ? state.count : state.count + 1;
    });

    builder.addCase(addPublicHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete public holiday
    builder.addCase(deletePublicHoliday.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePublicHoliday.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.rows = state?.rows?.filter((item: any) => item.ID !== payload);
      state.count = state.count - 1;
    });
    builder.addCase(deletePublicHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addNewRow, setHolidayAPIPath } = publicHolidayTableSlice.actions;

export const publicHolidayTableData = (state: any) => state?.publicHoliday;

export default publicHolidayTableSlice.reducer;
