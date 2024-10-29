import { IoIosClose } from "react-icons/io";
import React from "react";
import {createPortal} from "react-dom"

const Model = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-content-center absolute top-0 z-40 h-screen w-screen backdrop-blur">
          <div className="flex flex-col relative z-50 m-auto min-h-[200px] w-[340px] bg-white p-1">
            <div className="flex justify-end">
              <IoIosClose className="text-5xl" onClick={onClose} />
            </div>
              {children}
          </div>
          <div className="absolute top-0 z-40 h-screen w-screen backdrop-blur"></div>
        </div>
      )}
    </>
  ,document.getElementById("model-root"));
};

export default Model;
