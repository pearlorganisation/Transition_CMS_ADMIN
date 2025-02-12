import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { toast } from "sonner";

export const getFocusAreas = createAsyncThunk(
  "get/focusArea",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/api/v1/focusArea`, config);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getFocusAreaFeatures = createAsyncThunk(
  "get/focusAreaFeature",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/focus-features`,
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getFocusAreaById = createAsyncThunk(
  "get/focusAreaById",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/focusArea/${id}`,
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getFocusFeatureById = createAsyncThunk(
  "get/focusFeatureById",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/focus-features/${id}`,
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteFocusArea = createAsyncThunk(
  "delete/featureArea",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/focusarea/${id}`,
        config
      );
      console.log("delete focus area data", data);
      return id;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteFocusFeature = createAsyncThunk(
  "delete/focusFeature",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/focus-features/${id}`,
        config
      );
      console.log("delete focus area feature data", data);
      return id;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addFocusArea = createAsyncThunk(
  "focusarea/addFocusArea",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(`/api/v1/focusarea`, userData, {
        config,
      });

      console.log(data, "create  focus area response data");

      toast.success("Focus Area created Successfully", {
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

export const addFocusAreaFeature = createAsyncThunk(
  "add/addFocusAreaFeature",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      if (userData.image && userData.image.length > 0) {
        formData.append("image", userData.image[0]);
      }
      formData.append("title", userData.title);
      formData.append(
        "features",
        JSON.stringify(userData.features?.map((item) => item.value))
      );

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/focus-features`,
        formData,
        {
          config,
        }
      );

      toast.success("Focus Area Feature created Successfully", {
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

export const updateFocusArea = createAsyncThunk(
  "update/focusArea",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.patch(
        `/api/v1/focusarea/${id}`,
        updatedData,
        config
      );
      return data; // Return the updated destination
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateFocusAreaFeature = createAsyncThunk(
  "update/focusAreaFeature",
  async ({ id, updatedData }, { rejectWithValue }) => {
    console.log(updatedData, "update focus area feature data");
    try {
      const formData = new FormData();
      formData.append("image", updatedData.image[0]);
      formData.append("title", updatedData.title);
      formData.append(
        "features",
        JSON.stringify(updatedData.features?.map((item) => item.value))
      );

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.patch(
        `/api/v1/focus-features/${id}`,
        formData,
        config
      );
      return data; // Return the updated destination
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
