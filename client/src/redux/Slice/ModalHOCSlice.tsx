import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  visible: false,
  ComponentContentModal: <p>default</p>,
  footer: <p>default</p>,
};

const modalHOCSlide = createSlice({
  name: "post",
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log("abc");
      return {
        ...state,
        title: action.payload.title,
        visible: true,
        ComponentContentModal: action.payload.component,
        footer: action.payload.footer,
      };
    },
    closeModal: (state, action) => {
      return {
        ...state,
        visible: false,
      };
    },
  },
});

export const { openModal, closeModal } = modalHOCSlide.actions;
export default modalHOCSlide.reducer;
