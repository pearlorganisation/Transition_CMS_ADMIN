import { createSlice } from "@reduxjs/toolkit"
import { getProfile, updatePassword, updateProfile } from "../../actions/User/userAction"
import { toast } from "react-toastify"
import { position } from "jodit/esm/core/helpers"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    profileData:{
        isSuccess: false,
        isError:false,
        isLoading:false,
        profileInfo:{}
    }
}

const updatePasswordSlice = createSlice({
    name:"updatepassword",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(updatePassword.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(updatePassword.rejected,(state,action)=>{
            state.isError= false
            state.isSuccess= false
            state.isLoading= false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(updatePassword.fulfilled,(state,action)=>{
            state.isError= false
            state.isLoading= false
            state.isSuccess= true
            toast.success("Password updated successfully")
        })
        .addCase(getProfile.pending,state=>{
            state.profileData = state.profileData ?? {}
            state.profileData.isLoading= true
        })
        .addCase(getProfile.rejected,(state,action)=>{
             state.profileData = state.profileData ?? {}
             state.profileData.isError= true
             state.profileData.isSuccess= false
             state.profileData.isLoading= false
             state.profileData.profileInfo= {}
             toast.error(action.payload, {
                position: "top-center"
            })
        })
        .addCase(getProfile.fulfilled,(state,action)=>{
            state.profileData = state.profileData ?? {}
            state.profileData.profileInfo = action.payload.user
            state.profileData.isLoading= false
            state.profileData.isSuccess= true
            state.profileData.isError= false
            toast.success("Profile recieved ", {position:"top-right"})
        })
        .addCase(updateProfile.pending,state=>{
            state.isLoading= true
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            toast.success("Profile Updated Successfully",{position:"top-right"})
        })
    }
})

export default updatePasswordSlice.reducer