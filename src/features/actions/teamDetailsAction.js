import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

export const getAllTeamDetails = createAsyncThunk(
  "get/team-details",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/team-details`, config);
      console.log("-------------team details data", data);
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

export const getSingleTeamDetails = createAsyncThunk(
  "get-single/teamDetails",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/team-details/${id}`,
        config
      );
      console.log("-------------single team details data", data);
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

export const deleteTeamDetails = createAsyncThunk(
  "delete/team-details",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(
        `/team-details/${id}`,
        config
      );
      console.log("delete team details data", data);

      toast.success("Team Details deleted Successfully", {
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

export const addTeamDetails = createAsyncThunk(
  "team/addTeamDetails",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", userData.image[0]);

      for (const key in userData) {
        if (key !== "image") {
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
        `/team-details`,
        formData,
        {
          config,
        }
      );

      console.log(data, "create team details response data");

      toast.success("Team details created Successfully", {
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

export const updateTeamDetails = createAsyncThunk(
  "update/teamDetails",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", updatedData.image[0]);

      for (const key in updatedData) {
        if (key !== "image") {
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
        `/team-details/${id}`,
        formData,
        config
      );

      toast.success("Team Details Updated Successfully", {
        position: "top-right",
      });
      return data; // Return the updated destination
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
