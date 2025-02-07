import { createSlice } from "@reduxjs/toolkit"
 
import { toast } from "react-toastify"
 
import { getBlogsById } from "../../actions/Blogs/blogsAction"

const initialState = {
    isLoading: false,
    isError:false,
    isSuccess:false,
    singleBlogData:{}
}

const pressSlice= createSlice({
    name:"press",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getBlogsById.pending,state=>{
            state.isLoading= true
            state.isError= false
            state.isSuccess= false
        })
        .addCase(getBlogsById.rejected, (state, action) => {
            state.isSuccess= false
            state.isError= true
            state.isLoading=false
            state.singleBlogData= {}
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(getBlogsById.fulfilled, (state, action) => {
            state.isSuccess= true
            state.isError= false
            state.isLoading= false
            state.singleBlogData= action.payload.data;
            toast.success("Press fetched successfully",{position:"top-right"})
        })
    }
})

export default pressSlice.reducer