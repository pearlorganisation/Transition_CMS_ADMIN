import { createSlice } from "@reduxjs/toolkit";
import {
  deleteContact,
  getContactData,
  postContactData,
  updateContact,
} from "../actions/contactAction";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isDeleted: false,
  isError: false,
  isSuccess: false,
  contactsData: null,
  postResponse: null,
  deleteResponse: null,
  updateResponse: null,
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
        state.isDeleted = false;
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
        console.log(action.payload, "action.payload");
        state.postResponse = action.payload;
        toast.success("Successfully Added!!");
      })
      .addCase(postContactData.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Something went wrong!!");
      })
      //delte contact
      .addCase(deleteContact.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.deleteResponse = action.payload;
        toast.success("Successfully Deleted!!");
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Something went wrong!!");
      })
      //update contact
      .addCase(updateContact.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.updateResponse = action.payload;
        toast.success("Successfully Deleted!!");
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Something went wrong!!");
      });
  },
});

export default contactSlice.reducer;
