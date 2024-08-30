import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    showToast: false,
    toastTitle: "",
    toastMessage: "",
  },
  reducers: {
    showToast(state, action) {
      state.showToast = true;
      state.toastTitle = action.payload.toastTitle;
      state.toastMessage = action.payload.toastMessage;
    },
    hideToast(state) {
      state.showToast = false;
      state.toastTitle = "";
      state.toastMessage = "";
    },
  },
});

export const toastActions = toastSlice.actions;

export default toastSlice.reducer;
