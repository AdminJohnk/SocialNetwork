import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Admintck1",
  passWord: "Admintck1",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userName = action.payload.userName;
      state.passWord = action.payload.passWord;
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
