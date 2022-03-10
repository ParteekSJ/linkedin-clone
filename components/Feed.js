import { useState, useEffect } from "react";
import Input from "./Input";
import { db } from "@util/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { SET_HANDLE_POST_STATE, SET_USE_SSR_POSTS } from "@features/postSlice";
import Post from "./Post";
import { CLOSE_MODAL } from "@features/modalSlice";

/**
 * https://firebase.google.com/docs/firestore/query-data/get-data
 */

export default function Feed({ posts }) {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const { handlePostState, useSSRPosts } = useSelector((state) => ({
    ...state.post,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Whenever we perform UPLOAD or DELETE, this function gets triggered since we keep changing the SET_HANDLE_POST_STATE.
     */
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setRealtimePosts(snapshot.docs);
        dispatch(SET_HANDLE_POST_STATE(false));
        dispatch(SET_USE_SSR_POSTS(false));
        dispatch(CLOSE_MODAL());
      }
    );

    handlePostState && unsubscribe();
  }, [handlePostState]);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* useSSRPosts is default to true.
       *Once we upload a post, handlePostState is triggered and we fetch posts CLIENT SIDE..
       */}

      {useSSRPosts
        ? posts.map((post, idx) => {
            return <Post key={idx} post={post} />;
          })
        : realtimePosts.map((post, idx) => {
            return <Post key={idx} post={post.data()} />;
          })}

      {/* POSTS */}
    </div>
  );
}
