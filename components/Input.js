import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArticleIcon from "@mui/icons-material/Article";

import { useSelector, useDispatch } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_TYPE } from "@features/modalSlice";

export default function Input() {
  const { data: session } = useSession();
  const { isModalOpen, modalTypeState } = useSelector((state) => ({
    ...state.modal,
  }));
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-[#1d2226] rounded-lg p-3 border border-gray-300 dark:border-none">
      <div className="flex items-center space-x-2">
        <Avatar
          src={session?.user?.image}
          className="!h-10 !w- 10 cursor-pointer"
        />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left"
          onClick={() => {
            dispatch(OPEN_MODAL());
            dispatch(SET_MODAL_TYPE("dropIn"));
          }}>
          Start a post
        </motion.button>
      </div>
      {/* 4 ICONS */}
      <div className="flex items-center flex-wrap justify-center mt-3 gap-4 md:gap-x-10">
        <button className="inputButton group">
          <PhotoSizeSelectActualIcon className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button>
        <button className="inputButton group">
          <VideoCameraBackIcon className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
        </button>
        <button className="inputButton group">
          <BusinessCenterIcon className="text-blue-300" />
          <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
        </button>
        <button className="inputButton group">
          <ArticleIcon className="text-red-400" />
          <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">
            Write Article
          </h4>
        </button>
      </div>
    </div>
  );
}
