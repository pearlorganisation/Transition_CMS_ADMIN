import { createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";
import {
  addInvestmentTimelineCard,
  deleteInvestmentTimelineCard,
  getInvestmentTimelineCards,
  getSingleInvestmentTimelineCard,
  updateInvestmentTimelineCard,
} from "../../actions/Portfolio/investmentTimelineCardsAction";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  investmentTimelineCards: [],
  singleInvestmentTimelineCard: {},
  pagination: {},
};

const investmentTimelineCardsSlice = createSlice({
  name: "investmentTimelineCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getting destinations
      .addCase(getInvestmentTimelineCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvestmentTimelineCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getInvestmentTimelineCards.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.investmentTimelineCards = action.payload.data;
        state.pagination = action.payload.pagination;
        toast.success("All Portfolio Cards recieved", {
          position: "top-right",
        });
      })

      // get single destination

      .addCase(getSingleInvestmentTimelineCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleInvestmentTimelineCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getSingleInvestmentTimelineCard.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.singleInvestmentTimelineCard = action.payload;
        toast.success("Single Investment Timeline card recieved", {
          position: "top-right",
        });
      })

      // add portfolio card

      .addCase(addInvestmentTimelineCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addInvestmentTimelineCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(addInvestmentTimelineCard.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Investment Timeline Card created Successfully", {
          position: "top-right",
        });
      })

      // delete portfolio card
      .addCase(deleteInvestmentTimelineCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvestmentTimelineCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteInvestmentTimelineCard.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.investmentTimelineCards = state.investmentTimelineCards.filter(
          (investf) => investf._id !== action.meta.arg
        );
        toast.success("Investment Timeline Card deleted Successfully", {
          position: "top-right",
        });
      })

      // update portfolio card

      .addCase(updateInvestmentTimelineCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInvestmentTimelineCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateInvestmentTimelineCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.singleInvestmentTimelineCard = action.payload;

        toast.success("Investment Timeline Card updated successfully", {
          position: "top-right",
        });
      });
  },
});

export default investmentTimelineCardsSlice.reducer;
