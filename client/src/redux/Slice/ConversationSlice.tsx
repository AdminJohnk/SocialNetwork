import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: null,
  currentConversation: null,
  currentConversationId: null,

  message: null,
  messages: null,
};

const messageSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    SetConversations: (state, action) => {
      return { ...state, conversations: action.payload.conversations };
    },
  },
});

export const { SetConversations } = messageSlice.actions;
export default messageSlice.reducer;
