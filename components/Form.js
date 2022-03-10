import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "@features/modalSlice";

import { db } from "@util/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { SET_HANDLE_POST_STATE } from "@features/postSlice";

export default function Form() {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: session } = useSession();

  const dispatch = useDispatch();

  const uploadPost = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "posts"), {
      input: input,
      photoUrl: photoUrl,
      timestamp: serverTimestamp(),
      username: session.user.name,
      email: session.user.email,
      userImg: session.user.image,
      userId: session.user.uid,
    });

    await updateDoc(docRef, {
      postId: docRef.id,
    });

    // dispatch(CLOSE_MODAL());
    dispatch(SET_HANDLE_POST_STATE(true));
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        className="bg-transparent focus:outline-none dark:placeholder-white/75 min-h-[50px] mb-6"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What do you want to talk about?"
      />
      <input
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        type="text"
        placeholder="Add a photo URL (Optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
      />
      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1 transition-all duration-150"
        type="submit"
        onClick={uploadPost}
        disabled={!input.trim() && !photoUrl.trim()}>
        Post
      </button>
    </form>
  );
}
