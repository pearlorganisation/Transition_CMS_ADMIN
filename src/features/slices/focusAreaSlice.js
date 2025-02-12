import { createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";
import {
  addFocusArea,
  addFocusAreaFeature,
  deleteFocusArea,
  deleteFocusFeature,
  getFocusAreaById,
  getFocusAreaFeatures,
  getFocusAreas,
  getFocusFeatureById,
  updateFocusArea,
  updateFocusAreaFeature,
} from "../actions/focusAreaAction";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  focusAreaInfo: [],
  focusArea: {},
  focusAreaFeatureInfo: [],
  focusAreaFeature: {},
  pagination: {},
};

const focusAreaSlice = createSlice({
  name: "focusArea",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Focus Areas
      .addCase(getFocusAreas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFocusAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload, "action.payload");
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getFocusAreas.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.focusAreaInfo = action.payload.data;
        state.pagination = action.payload.pagination;
        toast.success("All Focus Areas recieved", { position: "top-right" });
      })

      // get all focus area features
      .addCase(getFocusAreaFeatures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFocusAreaFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload, "action.payload");
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getFocusAreaFeatures.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.focusAreaFeatureInfo = action.payload.data;
        state.pagination = action.payload.pagination;
        toast.success("All Focus Area Features recieved", {
          position: "top-right",
        });
      })

      // get single focus area

      .addCase(getFocusAreaById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFocusAreaById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getFocusAreaById.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.focusArea = action.payload.data;
        toast.success("Single Focus Area recieved", { position: "top-right" });
      })

      // get single focus area feature
      // get single focus area

      .addCase(getFocusFeatureById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFocusFeatureById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getFocusFeatureById.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.focusAreaFeature = action.payload.data;
        toast.success("Single Focus Area Feature recieved", {
          position: "top-right",
        });
      })

      // add  focus Area

      .addCase(addFocusArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFocusArea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(addFocusArea.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Focus Area created Successfully", {
          position: "top-right",
        });
      })

      .addCase(addFocusAreaFeature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFocusAreaFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(addFocusAreaFeature.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Focus Area Feature created Successfully", {
          position: "top-right",
        });
      })

      // delete focus Area
      .addCase(deleteFocusArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFocusArea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteFocusArea.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.focusAreaInfo = state.focusAreaInfo.filter(
          (focusArea) => focusArea._id !== action.meta.arg
        );
        toast.success("Focus Area deleted Successfully", {
          position: "top-right",
        });
      })

      // delete focus Area Feature
      .addCase(deleteFocusFeature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFocusFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteFocusFeature.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.focusAreaFeatureInfo = state.focusAreaFeatureInfo.filter(
          (focusArea) => focusArea._id !== action.meta.arg
        );
        toast.success("Focus Area Feature deleted Successfully", {
          position: "top-right",
        });
      })

      // update focus Area

      .addCase(updateFocusArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFocusArea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateFocusArea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.focusArea = action.payload;

        toast.success("Focus Area updated successfully", {
          position: "top-right",
        });
      })

      // update focus Area feature

      .addCase(updateFocusAreaFeature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFocusAreaFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateFocusAreaFeature.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.focusAreaFeature = action.payload;

        toast.success("Focus Area Feature updated successfully", {
          position: "top-right",
        });
      });
  },
});

export default focusAreaSlice.reducer;
