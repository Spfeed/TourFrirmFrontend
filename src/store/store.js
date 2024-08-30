import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toastSlice";
import authReducer from "./authSlice";
import chatBotReducer from "./chatBotSlice";

const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    chatbot: chatBotReducer,
  },
});

export default store;
