import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "@features/modalSlice";
import postSlice from "@features/postSlice";

export default configureStore({
  reducer: {
    modal: modalSlice,
    post: postSlice,
  },
});
