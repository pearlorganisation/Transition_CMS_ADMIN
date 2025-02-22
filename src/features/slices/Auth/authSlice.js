import { createSlice } from "@reduxjs/toolkit"
import { adminLogout, loginAdmin } from "../../actions/Auth/authAction"
import { toast } from "react-toastify"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    isAdminLoggedIn: false
}

const createAuthSlice = createSlice({
    name:"login",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAdminLoggedIn = false;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginAdmin.pending,(state)=>{
            state.isLoading= true
            
            
        })
        .addCase(loginAdmin.rejected,(state,action)=>{
            state.isLoading= false
            state.isError= true
            state.isSuccess= false
            state.isAdminLoggedIn= false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(loginAdmin.fulfilled,(state,action)=>{
            state.isLoading= false
            state.isError= false
            state.isSuccess= true
            state.isAdminLoggedIn= true
            toast.success("Admin is logged in", {position:"top-right"})
        })
        .addCase(adminLogout.pending, state=>{
            state.isLoading= true
        })
        .addCase(adminLogout.rejected,(state,action)=>{
            state.isError= true
            state.isSuccess= false
            // state.isAdminLoggedIn= false
            state.isLoading= false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(adminLogout.fulfilled,(state,action)=>{
            state.isError= false
            state.isSuccess= true
            state.isLoading= false
            toast.success("Admin logged out", {position:"top-right"})
        })
    },
})


export default createAuthSlice.reducer

export const { logout } = createAuthSlice.actions