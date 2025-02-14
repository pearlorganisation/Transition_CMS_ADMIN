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
      const { data } = await axiosInstance.get(`/api/v1/portfolio`, config);
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

      console.log(formData, "Form 12346");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axiosInstance.post(
        "/api/v1/portfolio",
        formData,
        config
      );
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
