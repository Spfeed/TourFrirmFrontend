import { createSlice } from "@reduxjs/toolkit";

const chatBotSlice = createSlice({
  name: "chatbot",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const chatBotActions = chatBotSlice.actions;
export default chatBotSlice.reducer;
