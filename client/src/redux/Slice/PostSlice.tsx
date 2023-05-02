import { createSlice } from '@reduxjs/toolkit';

interface State {
  postArr: any;
  post: any;
  ownerInfo: any;
  isOpenPostDetail: boolean;
  isInProfile: boolean;
}

const initialState: State = {
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
    },
    updatePosts: (state, action) => {
      const updatedPosts = state.postArr.map((post: any) => {
        if (post._id === action.payload.post._id) {
          return action.payload;
        }
        return post;
      });
      return {
        ...state,
        postArr: updatedPosts,
      };
    },
  },
});

export const { setAllPost, openPostDetail, setPost, setOwnerInfo, setIsInProfile, updatePosts } = postSlice.actions;
export default postSlice.reducer;
