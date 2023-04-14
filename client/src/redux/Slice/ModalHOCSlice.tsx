import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  visible: false,
  ComponentContentModal: <p>default</p>,
  callBackSubmit: () => {},
};

const modalHOCSlide = createSlice({
  name: "post",
  initialState,
  reducers: {
    openModal: (state, action) => {
      return {
        ...state,
        title: action.payload.title,
        visible: true,
        ComponentContentModal: action.payload.component,
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
