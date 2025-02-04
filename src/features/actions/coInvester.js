import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../axiosInstance";
import { toast } from "sonner";

export const CreateCoInvester = createAsyncThunk(
  "coInvestors/create",
  async (coInvestorData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axiosInstance.post("/api/v1/co-investors", coInvestorData, {config});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getInvestors = createAsyncThunk("get/coInvestors", async (_, { rejectWithValue }) => {
    try {

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }
        const response = await axiosInstance.get("/api/v1/co-investors",{config});
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data?.message || "Server Error", { position: "top-right" });
            return rejectWithValue(error.response.data || "Something went wrong");
        } else {
            toast.error(error.message, { position: "top-right" });
            return rejectWithValue(error.message);
        }
    }
});


export const updateInvestor = createAsyncThunk(
  "update/investor",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Only append logo if there's a new file selected
      if (updatedData.logo) {
        formData.append("logo", updatedData.logo);
      }

      // Append the other fields (name, etc.)
      for (const key in updatedData) {
        console.log
        if (key !== "logo") { 
          if (updatedData[key] && typeof updatedData[key] === "object") {
            formData.append(key, JSON.stringify(updatedData[key])); // Append as string if it's an object
          } else {
            formData.append(key, updatedData[key]); // Append regular fields
          }
        }
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Send the update request
      const { data } = await axiosInstance.patch(
        `/api/v1/co-investors/${id}`, 
        formData, 
        config
      );
      return data; // Return the response data

    } catch (error) {
      console.error("Update error:", error);
      
      // Show error message based on response or generic error message
      if (error.response) {
        toast.error(error.response.data?.message || "Server Error", { position: "top-right" });
        return rejectWithValue(error.response.data || "Something went wrong");
      } else {
        toast.error(error.message, { position: "top-right" });
        return rejectWithValue(error.message);
      }
    }
  }
);



