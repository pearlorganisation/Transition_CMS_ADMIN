// import { createSlice } from "@reduxjs/toolkit";

// import { toast } from "sonner";
// import {
//   addTeam,
//   deleteTeam,
//   getAllTeams,
//   getSingleTeam,
//   updateTeam,
// } from "../actions/teamsAction";

// const initialState = {
//   isLoading: false,
//   isError: false,
//   isSuccess: false,
//   teamInfo: {},
//   team: {},
//   pagination: {},
// };

// const newsSlice = createSlice({
//   name: "teams",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       // getting destinations
//       .addCase(getAllTeams.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllTeams.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         toast.error(action.payload, { position: "top-right" });
//       })
//       .addCase(getAllTeams.fulfilled, (state, action) => {
//         state.isError = false;
//         state.isSuccess = true;
//         state.isLoading = false;
//         state.teamInfo = action.payload.data;
//         state.pagination = action.payload.pagination;
//         toast.success("All Teams recieved", { position: "top-right" });
//       })

//       // get single destination

//       .addCase(getSingleTeam.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getSingleTeam.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         toast.error(action.payload, { position: "top-right" });
//       })
//       .addCase(getSingleTeam.fulfilled, (state, action) => {
//         state.isError = false;
//         state.isSuccess = true;
//         state.isLoading = false;
//         state.team = action.payload.data;
//         toast.success("Single Team Mate recieved", { position: "top-right" });
//       })

//       // add team

//       .addCase(addTeam.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addTeam.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         toast.error(action.payload, { position: "top-right" });
//       })
//       .addCase(addTeam.fulfilled, (state) => {
//         state.isError = false;
//         state.isSuccess = true;
//         state.isLoading = false;
//         toast.success("Team created Successfully", {
//           position: "top-right",
//         });
//       })

//       // delete team
//       .addCase(deleteTeam.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteTeam.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         toast.error(action.payload, { position: "top-right" });
//       })
//       .addCase(deleteTeam.fulfilled, (state, action) => {
//         state.isError = false;
//         state.isSuccess = true;
//         state.isLoading = false;

//         state.teamInfo = state.teamInfo.filter(
//           (team) => team._id !== action.meta.arg
//         );
//         toast.success("Team deleted Successfully", {
//           position: "top-right",
//         });
//       })

//       // update team

//       .addCase(updateTeam.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateTeam.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         toast.error(action.payload, { position: "top-right" });
//       })
//       .addCase(updateTeam.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;

//         state.team = action.payload;

//         toast.success("Team updated successfully", {
//           position: "top-right",
//         });
//       });
//   },
// });

// export default newsSlice.reducer;
