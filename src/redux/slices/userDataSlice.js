import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userDatabaseSlice = createSlice({
  name: "userDatabase",
  initialState,
  reducers: {
    fetchUserInfoStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserInfoSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    fetchUserInfoFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserInfoStart,
  fetchUserInfoSuccess,
  fetchUserInfoFailure,
} = userDatabaseSlice.actions;

export default userDatabaseSlice.reducer;
