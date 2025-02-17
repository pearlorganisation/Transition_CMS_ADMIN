import { createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";
import {
  addTeamDetails,
  deleteTeamDetails,
  getAllTeamDetails,
  getSingleTeamDetails,
  updateTeamDetails,
} from "../actions/teamDetailsAction";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  teamDetailsInfo: [],
  teamDetails: {},
  pagination: {},
};

const teamDetailsSlice = createSlice({
  name: "teamDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getting team details
      .addCase(getAllTeamDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTeamDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload, "action.payload");
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getAllTeamDetails.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.teamDetailsInfo = action.payload;
        state.pagination = action.payload.pagination;
        toast.success("All Teams recieved", { position: "top-right" });
      })

      // get single team detail

      .addCase(getSingleTeamDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTeamDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getSingleTeamDetails.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.teamDetails = action.payload;
        toast.success("Single Team Details recieved", {
          position: "top-right",
        });
      })

      // add team

      .addCase(addTeamDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTeamDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(addTeamDetails.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Team Details created Successfully", {
          position: "top-right",
        });
      })

      // delete team
      .addCase(deleteTeamDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTeamDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteTeamDetails.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.teamDetailsInfo = state.teamDetailsInfo.filter(
          (teamD) => teamD._id !== action.meta.arg
        );
        toast.success("Team detais deleted Successfully", {
          position: "top-right",
        });
      })

      // update team

      .addCase(updateTeamDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTeamDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateTeamDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.teamDetails = action.payload;

        toast.success("Team Details updated successfully", {
          position: "top-right",
        });
      });
  },
});

export default teamDetailsSlice.reducer;
