import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";

export const updatePassword = createAsyncThunk(
    "update/password", async(userData,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data }= await axiosInstance.post(`/users/forgot-password`,userData, config)
            return data
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.response)
            }
        }
    }
)