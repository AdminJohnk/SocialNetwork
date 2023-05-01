import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postArr: [],
  post: {},
  ownerInfo: {},

  isOpenPostDetail: false,
  isInProfile: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setAllPost: (state, action) => {
      return {
        ...state,
        postArr: action.payload.postArr,
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
      };
    },
    setOwnerInfo: (state, action) => {
      return {
        ...state,
        ownerInfo: action.payload.ownerInfo,
      };
    },
    setIsInProfile: (state, action) => {
      return {
        ...state,
        isInProfile: action.payload,
      };
    }
  },
});

export const { setAllPost, openPostDetail, setPost, setOwnerInfo, setIsInProfile } = postSlice.actions;
export default postSlice.reducer;
