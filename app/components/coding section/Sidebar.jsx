// File: components/Sidebar.js
import React from 'react';

const Sidebar = ({ codeData, selectedCodeData, setSelectedCodeData, ScrollFromStart }) => {
  return (
    <div className="sidebar">
      <h2>Topics</h2>
      <ul>
        {codeData.map((item, index) => (
          <li
            key={index}
            className={`pl-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ${
                             selectedCodeData === item ? "bg-blue-500 text-white" : ""
                           }`}
            onClick={() => {
              setSelectedCodeData(item);
              ScrollFromStart();
            }}
          >
            {item.file_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
