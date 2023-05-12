import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesArr: {},
  convArr: {},
  conv2UserArr: {},
};

const messageSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAllMessageByConvId: (state, action) => {
        // console.log(action.payload)
      return {
        ...state,
        messagesArr: action.payload,
      };
    },

    setConvByUserId: (state, action) => {
      return {
        ...state,
        convArr: action.payload,
      };
    },

    setConvByTwoUserId: (state, action) => {
        // console.log(action.payload)
      return {
        ...state,
        conv2UserArr: action.payload,
      };
    },
  },
});

export const { setAllMessageByConvId, setConvByUserId, setConvByTwoUserId } =
  messageSlice.actions;
export default messageSlice.reducer;
