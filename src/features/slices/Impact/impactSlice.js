import { createSlice } from "@reduxjs/toolkit";
import { getImpact, updateImpactById } from "../../actions/Impact/ImapctAction";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  impactData: {},
};

const createImpactSlice = createSlice({
  name: "impact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImpact.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getImpact.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.impactData = {};
        toast.error(action.payload, { position: "top-center" });
      })
      .addCase(getImpact.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.impactData = action.payload;
        toast.success("Impact Data recieved", { position: "top-right" });
      })
      .addCase(updateImpactById.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateImpactById.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        toast.error(action.payload, { position: "top-center" });
      })
      .addCase(updateImpactById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Updated the impact data", { position: "top-right" });
      });
  },
});

export default createImpactSlice.reducer;
