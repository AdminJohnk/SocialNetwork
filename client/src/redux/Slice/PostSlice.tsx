import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postArr: [],
  userInfo: "",
  post: {},

  isOpenPostDetail: false,
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
    openPostDetail: (state, action) => {
      return {
        ...state,
        isOpenPostDetail: true,
      };
    },
    setPost: (state, action) => {
      return {
        ...state,
        post: action.payload.post,
        userInfo: action.payload.userInfo,
      };
    },
  },
});

export const { setAllPost, openPostDetail, setPost } = postSlice.actions;
export default postSlice.reducer;
