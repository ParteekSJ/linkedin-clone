import { Avatar, IconButton } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { CLOSE_MODAL, OPEN_MODAL, SET_MODAL_TYPE } from "@features/modalSlice";
import { SET_HANDLE_POST_STATE, SET_POST } from "@features/postSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@util/firebase";
import TimeAgo from "timeago-react";

export default function Post({ post, modalPost }) {
  /* modalPost - When the post is clicked. */
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);

  console.log(post?.timestamp?.seconds);

  // Convert UNIX Epoch time to Human Readable Format
  var myDate = new Date(post?.timestamp?.seconds * 1000);

  /**
   * @notice Truncates the text upto `n` characters
   * @param string - Our input
   * @param n - Character Limit
   */
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", post.postId));
    dispatch(SET_HANDLE_POST_STATE(true));
    // dispatch(CLOSE_MODAL());
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border border-r-gray-300 dark:border-none`}>
      <div className="flex items-center px-2.5 cursor-pointer">
        {/* USER PROFILE IMAGE */}
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        {/* POST TIME DETAILS - user, email, time */}
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-md hover:text-blue-500 transition-all">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post.email}</p>
          {/* time ago */}

          <TimeAgo
            datetime={myDate}
            className="text-xs dark:text-white/75 opacity-80"
          />
        </div>
        {/* ICON -> CLOSE/HORIZONTAL */}
        {modalPost ? (
          <IconButton onClick={() => dispatch(CLOSE_MODAL())}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>
      {/* POST INPUT */}
      {post.input && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}
      {/* POST IMAGE */}
      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt=""
          className="w-full cursor-pointer"
          onClick={() => {
            dispatch(OPEN_MODAL());
            dispatch(SET_MODAL_TYPE("gifYouUp"));
            dispatch(SET_POST(post));
          }}
        />
      )}
      <div className="flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={() => setLiked(!liked)}>
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}

            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button
            className="postButton focus:text-red-400 "
            onClick={deletePost}>
            <DeleteRoundedIcon />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton ">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
}
