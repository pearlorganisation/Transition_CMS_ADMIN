import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

export const getPortfolioCards = createAsyncThunk(
  "get/getPortfolioCards",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/portfolio-cards`,
        config
      );

      return data;
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

export const getSinglePortfolioCard = createAsyncThunk(
  "get/getSinglePortfolioCard",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/portfolio-cards/${id}`,
        config
      );
      return data.data;
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

export const deletePortfolioCard = createAsyncThunk(
  "delete/portfolio-card",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(
        `/portfolio-cards/${id}`,
        config
      );
      console.log("delete portfolio cards data", data);
      toast.success("Portfolio Card deleted Successfully", {
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

export const addPortfolioCard = createAsyncThunk(
  "team/addPortfolioCard",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("icon", userData.icon[0]);

      for (const key in userData) {
        if (key !== "icon") {
          if (typeof userData[key] === "object" && userData[key] !== null) {
            formData.append(key, JSON.stringify(userData[key]));
          } else {
            formData.append(key, userData[key]);
          }
        }
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.post(
        `/portfolio-cards`,
        formData,
        {
          config,
        }
      );

      console.log(data, "create team response data");

      toast.success("Portfolio Card created Successfully", {
        position: "top-right",
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-right" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message, { position: "top-right" });
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePortfolioCard = createAsyncThunk(
  "update/PortfolioCard",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("icon", updatedData.icon[0]);

      for (const key in updatedData) {
        if (key !== "icon") {
          if (
            typeof updatedData[key] === "object" &&
            updatedData[key] !== null
          ) {
            formData.append(key, JSON.stringify(updatedData[key]));
          } else {
            formData.append(key, updatedData[key]);
          }
        }
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.patch(
        `/portfolio-cards/${id}`,
        formData,
        config
      );

      toast.success("Portofolio Card updated Successfully", {
        position: "top-right",
      });
      return data; // Return the updated destination
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-right" });
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message, { position: "top-right" });
        return rejectWithValue(error.message);
      }
    }
  }
);
