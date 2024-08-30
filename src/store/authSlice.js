import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    restoreSession(state) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.isAuthenticated = true;
        state.user = JSON.parse(storedUser);
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
