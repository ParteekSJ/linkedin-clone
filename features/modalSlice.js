import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    modalTypeState: "dropIn",
  },
  reducers: {
    OPEN_MODAL: (state, action) => {
      state.isModalOpen = true;
    },
    CLOSE_MODAL: (state, action) => {
      state.isModalOpen = false;
    },
    SET_MODAL_TYPE: (state, action) => {
      state.modalTypeState = action.payload;
    },
  },
});

export const { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_TYPE } = modalSlice.actions;

export default modalSlice.reducer;
