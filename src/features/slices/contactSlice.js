import { createSlice } from "@reduxjs/toolkit";
import { getContactData, postContactData } from "../actions/contactAction";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  contactsData: null,
};

const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllContactData
      .addCase(getContactData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getContactData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactsData = action.payload;
      })
      .addCase(getContactData.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Something went wrong!!");
      })
      // postConatactData
      .addCase(postContactData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postContactData.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contactsData = action.payload;
        toast.success("Successfully Added!!");
      })
      .addCase(postContactData.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Something went wrong!!");
      });
  },
});

export default contactSlice.reducer;
