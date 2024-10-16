import React from "react"; 
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import contextValue from './contect/notes/noteContect';

const NoteItem = (props) => {
  const context = useContext(contextValue);
  const { deleteNode } = context;
  const { updatenote, note } = props;

  return (
    <div>
      <div className=" w-[250px] h-[250px] mx-auto py-6 px-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-600 transition-shadow duration-300">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           Title: {props.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
         Desc: {props.description}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
         Tag: {props.tag}
        </p>

        <div className="flex gap-2">
          <a
            onClick={() => { deleteNode(props.id); }}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400"
          >
            <MdDelete />
          </a>
          <a
            onClick={() => updatenote(note)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
          >
            <FaRegEdit />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
