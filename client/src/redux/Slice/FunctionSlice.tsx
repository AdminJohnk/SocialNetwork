import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navigate: () => {},
  useDispatch: () => {},
  useSelector: () => {},
};

const functionSlice = createSlice({
  name: "function",
  initialState,
  reducers: {
    setNavigate: (state, action) => {
      return { ...state, navigate: action.payload.navigate };
    },
    setUseDispatch: (state, action) => {
      return { ...state, useDispatch: action.payload.useDispatch };
    },
    setUseSelector: (state, action) => {
      return { ...state, useSelector: action.payload.useSelector };
    },
  },
});

export const { setNavigate } = functionSlice.actions;
export default functionSlice.reducer;