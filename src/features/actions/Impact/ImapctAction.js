import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

export const getImpact = createAsyncThunk(
  "get/impact",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/impact`, config);
      console.log(data);
      return data?.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-center" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message, { position: "top-center" });
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateImpactById = createAsyncThunk(
  "update/impact",
  async (impactData, { rejectWithValue }) => {
    try {
      const { id } = impactData;
      console.log("the impact data is", impactData);
      console.log("the id is", id);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.put(
        `/impact/${id}`,
        impactData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-center" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.response, { position: "top-center" });
        return rejectWithValue(error.response);
      }
    }
  }
);
