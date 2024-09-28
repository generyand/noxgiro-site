import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isAiTyping: false,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setAiTyping: (state, action) => {
      state.isAiTyping = action.payload;
    },
  },
});

export const { addMessage, setAiTyping } = chatSlice.actions;
export default chatSlice.reducer;
