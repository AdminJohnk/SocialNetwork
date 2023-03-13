import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
        state.login = action.payload.login;
    },
  },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
