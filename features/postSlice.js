import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    handlePostState: false, // to trigger the fetch
    useSSRPosts: true, // tells whether we used server-side fetched posts or not
    post: {},
  },
  reducers: {
    SET_HANDLE_POST_STATE: (state, action) => {
      state.handlePostState = action.payload;
    },
    SET_USE_SSR_POSTS: (state, action) => {
      state.useSSRPosts = action.payload;
    },
    SET_POST: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { SET_HANDLE_POST_STATE, SET_USE_SSR_POSTS, SET_POST } =
  postSlice.actions;

export default postSlice.reducer;
