import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "Admintck1",
  password: "Admintck1",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return { ...state, username: action.payload.username, password: action.payload.password };
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
