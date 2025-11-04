import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from "../../utils";


const initialState: any = {
    loading: false,
    rows:[],
    count:0
};
export const getHashcardTable: any = createAsyncThunk(
    "hashcard/getHashcardTable",
    async (apiPath) => {
      let data = await Api().get(apiPath);
      return data;
    }
  );


export const hashcardSlice = createSlice({
  name: 'hashcard',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getHashcardTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHashcardTable.fulfilled, (state, action) => {
      state.loading = false;
      state.rows = action?.payload?.data?.records;
      state.count = action?.payload?.data?.total_count;
    });
    builder.addCase(getHashcardTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

// Action creators are generated for each case reducer function
// export const { } = hashcardSlice.actions;

export default hashcardSlice.reducer;