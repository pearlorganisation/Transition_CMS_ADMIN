import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

export const CreateCoInvester = createAsyncThunk(
  "coInvestors/create",
  async (coInvestorData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axiosInstance.post(
        "/co-investors",
        coInvestorData,
        { config }
      );

      toast.success("Coinvestor Created Successfully", {
        position: "top-right",
      });

      return response.data;
    } catch (error) {
      toast.error(error.response?.data, { position: "top-center" });
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getInvestors = createAsyncThunk(
  "get/coInvestors",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axiosInstance.get("/co-investors", {
        config,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || "Server Error", {
          position: "top-right",
        });
        return rejectWithValue(error.response.data || "Something went wrong");
      } else {
        toast.error(error.message, { position: "top-right" });
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateInvestor = createAsyncThunk(
  "coInvestors/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    console.log("id:", id);
    console.log("updatedData:", updatedData);

    try {
      const response = await axiosInstance.patch(
        `/co-investors/${id}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Co-Investor updated successfully!", {
        position: "top-center",
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// DELETE CO-INVESTOR
export const deleteInvestor = createAsyncThunk(
  "coInvestors/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/co-investors/${id}`);
      toast.success("Co-Investor deleted successfully!", {
        position: "top-center",
      });
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
