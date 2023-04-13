import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postArr: [],
  userInfo: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPost: (state, action) => {
      return {
        ...state,
        postArr: action.payload.postArr,
        userInfo: action.payload.userInfo,
      };
    },
  },
});

export const { setAllPost } = postSlice.actions;
export default postSlice.reducer;
