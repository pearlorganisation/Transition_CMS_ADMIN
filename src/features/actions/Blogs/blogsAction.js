import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

export const getBlogsById = createAsyncThunk(
    "get/press-by-id", async(id,{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/blogs/${id}`,config)
            return data
        } catch (error) {
          if(error.response && error.response.data.message){
            return rejectWithValue(error.response.data.message)
          }else{
            return rejectWithValue(error.message)
          }            
        }
    }
)