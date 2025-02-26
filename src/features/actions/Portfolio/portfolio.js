import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

export const getPortfolios = createAsyncThunk(
  "get/getPortfolios",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(`/portfolio`, config);
      toast.success("Fetched Portfolios Successfully", {
        position: "top-right",
      });
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

export const addPortfolio = createAsyncThunk(
  "post/addPortfolio",
  async (portfolioData, { rejectWithValue }) => {
    try {
      console.log(portfolioData, "port 1234");
      const formData = new FormData();

      formData.append("name", portfolioData.name);
      formData.append("title", portfolioData.title);
      formData.append("link", portfolioData.link || "");

      formData.append("overview", portfolioData.overview);
      formData.append("mainDescription", portfolioData.mainDescription);
      formData.append(
        "bottomSectionContent",
        portfolioData.bottomSectionContent
      );

      if (portfolioData.image) {
        formData.append("image", portfolioData.image);
      }
      if (portfolioData.bg) {
        formData.append("bg", portfolioData.bg);
      }
      if (portfolioData.bottomSectionIcon) {
        formData.append("bottomSectionIcon", portfolioData.bottomSectionIcon);
      }

      if (portfolioData.investmentTimeline) {
        formData.append(
          "investmentTimeline",
          JSON.stringify(portfolioData.investmentTimeline)
        );
      }

      formData.append("cards", JSON.stringify(portfolioData.cards));
      formData.append(
        "coInvestedBy",
        JSON.stringify(portfolioData.coInvestedBy)
      );

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axiosInstance.post("/portfolio", formData, config);
      toast.success("Portfolio added successfully!", { position: "top-right" });

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

export const editPortfolio = createAsyncThunk(
  "post/editPortfolio",
  async ({ id, portfolioData }, { rejectWithValue }) => {
    try {
      console.log(portfolioData, "Editing portfolio");

      // const formData = new FormData();

      // formData.append("name", portfolioData.name);
      // formData.append("title", portfolioData.title);
      // formData.append("link", portfolioData.link || "");
      // formData.append("overview", portfolioData.overview);
      // formData.append("mainDescription", portfolioData.mainDescription);
      // formData.append(
      //   "bottomSectionContent",
      //   portfolioData.bottomSectionContent
      // );

      // if (portfolioData.image) {
      //   formData.append("image", portfolioData.image);
      // }
      // if (portfolioData.bg) {
      //   formData.append("bg", portfolioData.bg);
      // }
      // if (portfolioData.bottomSectionIcon) {
      //   formData.append("bottomSectionIcon", portfolioData.bottomSectionIcon);
      // }

      // if (portfolioData.investmentTimeline) {
      //   formData.append(
      //     "investmentTimeline",
      //     JSON.stringify(portfolioData.investmentTimeline)
      //   );
      // }

      console.log(portfolioData, "Portfolio data for edit");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axiosInstance.patch(
        `/portfolio/${id}`,
        portfolioData,
        config
      );
      toast.success("Portfolio updated successfully!", {
        position: "top-right",
      });

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

export const deletePortfolio = createAsyncThunk(
  "delete/portfolio",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(`/portfolio/${id}`, config);
      console.log("delete portfolio data", data);

      toast.success("Portfolio data deleted Successfully", {
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
