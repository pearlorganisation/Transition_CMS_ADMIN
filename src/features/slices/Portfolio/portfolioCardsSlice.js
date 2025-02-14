import { createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";
import {
  addPortfolioCard,
  deletePortfolioCard,
  getPortfolioCards,
  getSinglePortfolioCard,
  updatePortfolioCard,
} from "../../actions/Portfolio/portfolioCardsAction";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  portfolioCards: [],
  singlePortfolioCard: {},
  pagination: {},
};

const portfolioCardsSlice = createSlice({
  name: "portfolioCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getting destinations
      .addCase(getPortfolioCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPortfolioCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getPortfolioCards.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.portfolioCards = action.payload.data;
        state.pagination = action.payload.pagination;
        toast.success("All Portfolio Cards recieved", {
          position: "top-right",
        });
      })

      // get single destination

      .addCase(getSinglePortfolioCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglePortfolioCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getSinglePortfolioCard.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.singlePortfolioCard = action.payload;
        toast.success("Single Portfolio card recieved", {
          position: "top-right",
        });
      })

      // add portfolio card

      .addCase(addPortfolioCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPortfolioCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(addPortfolioCard.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Portfolio Card created Successfully", {
          position: "top-right",
        });
      })

      // delete portfolio card
      .addCase(deletePortfolioCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePortfolioCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deletePortfolioCard.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.portfolioCards = state.portfolioCards.filter(
          (portf) => portf._id !== action.meta.arg
        );
        toast.success("Portfolio Card deleted Successfully", {
          position: "top-right",
        });
      })

      // update portfolio card

      .addCase(updatePortfolioCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePortfolioCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updatePortfolioCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.singlePortfolioCard = action.payload;

        toast.success("Portfolio Card updated successfully", {
          position: "top-right",
        });
      });
  },
});

export default portfolioCardsSlice.reducer;
