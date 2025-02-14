import { createSlice } from "@reduxjs/toolkit";
import {
  createListInvest,
  deleteListInvest,
  getListInvest,
  getSingleInvest,
  updateListInvest,
} from "../../actions/Portfolio/investmentTimelineAction";
import { toast } from "react-toastify";

const ListInvestSlice = createSlice({
  name: "listInvest",
  initialState: {
    listInvest: [],
    singleInvest: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createListInvest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createListInvest.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        toast.success("Investment Created Successfully", {
          position: "top-center",
        });
      })

      .addCase(createListInvest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })

      .addCase(getListInvest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getListInvest.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.listInvest = action.payload;
      })

      .addCase(getListInvest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload, "action.payload");
        toast.error(action.payload, { position: "top-right" });
      })

      .addCase(getSingleInvest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getSingleInvest.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.singleInvest = action.payload;
      })

      .addCase(getSingleInvest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })

      .addCase(updateListInvest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateListInvest.fulfilled, (state, action) => {
        state.loading = false;
        state.listInvest = action.payload;
        state.isSuccess = true;
      })

      .addCase(deleteListInvest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteListInvest.fulfilled, (state, action) => {
        state.loading = false;
        state.listInvest = state.listInvest.filter(
          (item) => item._id !== action.meta.arg
        );
      })

      .addCase(deleteListInvest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      });
  },
});

export default ListInvestSlice.reducer;
