import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

//listinvesttimeline
export const getListInvest = createAsyncThunk(
  "investmentTimeline/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/v1/investment-timeline");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getSingleInvest = createAsyncThunk(
  "investmentSingleTimeline/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/investment-timeline/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createListInvest = createAsyncThunk(
  "investmentTimeline/create",
  async (newInvestment, { rejectWithValue }) => {
    try {
      console.log(newInvestment, "new investment");
      const formData = new FormData();

      formData.append("image", newInvestment.image);
      formData.append("investmentYear", newInvestment.investmentYear);
      formData.append("description", newInvestment.description);
      formData.append("cards", JSON.stringify(newInvestment.cards));

      console.log(formData, "firo data");
      const response = await axiosInstance.post(
        "/api/v1/investment-timeline",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data, "qwerty");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateListInvest = createAsyncThunk(
  "investmentTimeline/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/api/v1/investment-timeline/${id}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteListInvest = createAsyncThunk(
  "delete/investmentTimeline",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/investment-timeline/${id}`,
        config
      );
      console.log("delete focus area data", data);
      toast.success("Investment Timeline deleted Successfully", {
        position: "top-right",
      });
      return id;
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
