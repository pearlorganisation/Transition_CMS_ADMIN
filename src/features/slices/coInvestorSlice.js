import { createSlice } from "@reduxjs/toolkit";
import {
  CreateCoInvester,
  getInvestors,
  updateInvestor,
} from "../actions/conInvestorAction";

const coInvestorSlice = createSlice({
  name: "coInvestors",
  initialState: {
    coInvestors: [],
    loading: false,
    error: null,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateCoInvester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateCoInvester.fulfilled, (state, action) => {
        state.loading = false;
        state.coInvestors = action.payload;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(CreateCoInvester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInvestors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvestors.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.coInvestors = action.payload;
      })
      .addCase(getInvestors.rejected, (state, action) => {
        state.loading = false;
        state.coInvestors = action.payload;
      })
      .addCase(updateInvestor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvestor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.coInvestors = action.payload;
        state.isSuccess = true;
      })
      .addCase(updateInvestor.rejected, (state, action) => {
        state.loading = false;
        state.coInvestors = action.payload;
      });
  },
});

export default coInvestorSlice.reducer;
