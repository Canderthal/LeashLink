import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../userActions";

const initialState = {
    user: null,
  };
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUser, (state, action) => {
          // Update the user state with the logged-in user's information
          state.user = action.payload;
        })
        .addCase(logoutUser, (state) => {
          // Clear the user state when logging out
          state.user = null;
          localStorage.removeItem("user");
        })
        .addCase(registerUser, (state, action) => {
          // Update the user state with the registered user's information
          state.user = action.payload;
        });
    },
  });

export default userSlice.reducer;