import { createSlice } from "@reduxjs/toolkit"
import { updatePassword } from "../../actions/User/userAction"
import { toast } from "react-toastify"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false
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
    }
})

export default updatePasswordSlice.reducer