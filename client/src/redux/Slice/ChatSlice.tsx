import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    messagesArr: {},
    convArr: {},
    conv2UserArr: {}

}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setAllMessageByConvId: (state, action) => {
            return {
                ...state,
                messagesArr: action.payload
            }
        },

        setConvByUserId: (state, action) => {
            return {
                ...state,
                convArr: action.payload
            }
        },

        setConvByTwoUserId: (state, action) => {
            return {
                ...state,
                conv2UserArr: action.payload
            }
        },
    }
});

export const { setAllMessageByConvId, setConvByUserId, setConvByTwoUserId } = chatSlice.actions;
export default chatSlice.reducer;
