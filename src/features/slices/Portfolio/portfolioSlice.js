import { createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";
import {
  deletePortfolio,
  getPortfolios,
} from "../../actions/Portfolio/portfolio";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  portfolios: [],
  singlePortfolio: {},
  pagination: {},
};

const portfoliosSlice = createSlice({
  name: "portfolios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getting destinations
      .addCase(getPortfolios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPortfolios.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload, "action.payload");
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getPortfolios.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.portfolios = action.payload.data;
        state.pagination = action.payload.pagination;
        toast.success("All Portfolios recieved", { position: "top-right" });
      })

      // get single destination

      //   .addCase(getSingleTeam.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(getSingleTeam.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = true;
      //     state.isSuccess = false;
      //     toast.error(action.payload, { position: "top-right" });
      //   })
      //   .addCase(getSingleTeam.fulfilled, (state, action) => {
      //     state.isError = false;
      //     state.isSuccess = true;
      //     state.isLoading = false;
      //     state.team = action.payload.data;
      //     toast.success("Single Team Mate recieved", { position: "top-right" });
      //   })

      // add team

      //   .addCase(addTeam.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(addTeam.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = true;
      //     state.isSuccess = false;
      //     toast.error(action.payload, { position: "top-right" });
      //   })
      //   .addCase(addTeam.fulfilled, (state) => {
      //     state.isError = false;
      //     state.isSuccess = true;
      //     state.isLoading = false;
      //     toast.success("Team created Successfully", {
      //       position: "top-right",
      //     });
      //   })

      // delete team
      .addCase(deletePortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.portfolios = state.portfolios.filter(
          (portfolio) => portfolio._id !== action.meta.arg
        );
        toast.success("Portfolio  deleted Successfully", {
          position: "top-right",
        });
      });

    // update team

    //   .addCase(updateTeam.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(updateTeam.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.isSuccess = false;
    //     toast.error(action.payload, { position: "top-right" });
    //   })
    //   .addCase(updateTeam.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = false;
    //     state.isSuccess = true;

    //     state.team = action.payload;

    //     toast.success("Team updated successfully", {
    //       position: "top-right",
    //     });
    //   });
  },
});

export default portfoliosSlice.reducer;
