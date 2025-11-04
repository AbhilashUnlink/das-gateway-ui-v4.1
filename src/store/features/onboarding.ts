import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useFetchWrapper as Api } from '../../utils';
import { REGISTER_DETAIL_API } from '../../components/constants/api-paths';

// createAsyncThunk
export const getOnboardingData: any = createAsyncThunk(
  'onboarding/getOnboardingData',
  async () => {
    let { data } = await Api().get(REGISTER_DETAIL_API);
    return data;
  },
);
export const saveOnboardingData: any = createAsyncThunk(
  'onboarding/saveOnboardingData',
  async payload => {
    let { data } = await Api().post(REGISTER_DETAIL_API, payload);
    return data;
  },
);
// createSlice
export const onboardingSlice: any = createSlice({
  name: 'onboarding',
  initialState: {
    activeStep: 0,
    onboardingPayload: {},
    aboutBusinessFieldsLeft: 0,
    onboardingData:{},
    onboardingFields: {
      aboutBusiness: {
        individual: {},
      },
    },
  },
  reducers: {
    setAboutBusinessFieldsLeft: (state, action) => {
      state.aboutBusinessFieldsLeft = action.payload;
    },
    setOnboardingData: (state, action) => {
      state.onboardingData = action.payload;
    },
    setAboutBusinessFieldValue: (state, { payload }) => {
      // const {key,value} = payload;
      // if (
      //   // eslint-disable-next-line no-prototype-builtins
      //   !state.onboardingFields.aboutBusiness.hasOwnProperty(payload.key)
      // ) {
      // @ts-ignore

      state.onboardingFields.aboutBusiness[payload.key] = payload.value;
      // }
    },
    setOnboardingPayload: (state, action) => {
      state.onboardingPayload = {
        ...state.onboardingPayload,
        ...action.payload,
      };
    },
    onBackClick: state => {
      if (state.activeStep !== 0) {
        state.activeStep = state.activeStep - 1;
      }
    },
    onNextClick: state => {
      state.activeStep = state.activeStep + 1;
    },
    onStepClick: (state, { payload }) => {
      state.activeStep = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(saveOnboardingData.pending, () => {});
    builder.addCase(saveOnboardingData.fulfilled, (state, action) => {
      state.onboardingPayload = action.payload;
    });
    builder.addCase(saveOnboardingData.rejected, () => {});
    builder.addCase(getOnboardingData.pending, () => {});
    builder.addCase(getOnboardingData.fulfilled, (state, action) => {
      state.onboardingPayload = action.payload;
    });
    builder.addCase(getOnboardingData.rejected, () => {});
  },
});
export const {
  setOnboardingPayload,
  onBackClick,
  onNextClick,
  onStepClick,
  setAboutBusinessFieldValue,
  setAboutBusinessFieldsLeft,
  setOnboardingData,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
