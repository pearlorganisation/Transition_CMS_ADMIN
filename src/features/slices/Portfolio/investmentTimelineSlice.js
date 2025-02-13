import { createSlice } from "@reduxjs/toolkit";
import {
  createListInvest,
  deleteListInvest,
  getListInvest,
  getSingleInvest,
  updateListInvest,
} from "../../actions/Portfolio/investmentTimelineAction";

const ListInvestSlice = createSlice({
  name: "listInvest",
  initialState: {
    listInvest: [],
    singleInvest: {},
    loading: false,
    isSuccess: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createListInvest.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })

      .addCase(createListInvest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.listInvest = action.payload;
        state.isSuccess = true;
      })

      .addCase(createListInvest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getListInvest.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })

      .addCase(getListInvest.fulfilled, (state, action) => {
        state.loading = false;
        state.listInvest = action.payload;
        state.isSuccess = true;
      })

      .addCase(getListInvest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSingleInvest.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })

      .addCase(getSingleInvest.fulfilled, (state, action) => {
        state.loading = false;
        state.singleInvest = action.payload;
        state.isSuccess = true;
      })

      .addCase(getSingleInvest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateListInvest.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateListInvest.fulfilled, (state, action) => {
        state.loading = false;
        state.listInvest = action.payload;
        state.isSuccess = true;
      })

      .addCase(deleteListInvest.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteListInvest.fulfilled, (state, action) => {
        state.loading = false;
        state.listInvest = state.listInvest.filter(
          (item) => item._id !== action.meta.arg
        );
      })

      .addCase(deleteListInvest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ListInvestSlice.reducer;
