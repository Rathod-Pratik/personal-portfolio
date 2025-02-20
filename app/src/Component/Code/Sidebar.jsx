import React from "react";

import { ScrollArea } from "../../components/ui/scroll-area";

const Sidebar = ({
  OpenSidebar,
  codeData,
  selectedCodeData,
  setSelectedCodeData,
  ScrollFromStart,
}) => {
  return (
    <>
      {OpenSidebar && (
        <ScrollArea className="!sticky hidden z-[100] lg:block top-[126px] w-[300px] h-[calc(100vh-127px)] rounded-md border-r p-4">
          <ol type="1" className="py-2">
            <li className="text-2xl text-center">Topics</li>
            <ol className="pl-5 flex flex-col gap-1">
              {codeData.map((item, index) => (
                <li
                  key={index}
                  className={`pl-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-md 
                    ${
                      selectedCodeData === item
                        ? "bg-blue-500 text-white"
                        : ""
                    }`} // Conditional styling
                  onClick={() => {
                    setSelectedCodeData(item);
                    ScrollFromStart();
                  }}
                >
                  {index + 1}. {item.file_name}
                </li>
              ))}
            </ol>
          </ol>
        </ScrollArea>
      )}
    </>
  );
};

export default Sidebar;
