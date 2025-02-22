import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

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
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response);
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
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
);
