import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
   data: null
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        getMessage: (state, action) => {
            return {
                ...state,
                data: action.payload
            }
        },
    }
});

export const { getMessage } = chatSlice.actions;
export default chatSlice.reducer;
