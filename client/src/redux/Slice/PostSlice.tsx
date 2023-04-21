import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postArr: [],
  userInfo: "",

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
    }
  },
});

export const { setAllPost, openPostDetail } = postSlice.actions;
export default postSlice.reducer;
