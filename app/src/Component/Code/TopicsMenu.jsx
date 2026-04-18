import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../../components/ui/sheet"; 

const TopicsMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  codeData,
  selectedCodeData,
  setSelectedCodeData,
}) => {
  const ScrollFromStart = () => {
    const scroll = document.documentElement;
    scroll.scrollTop = 0;
  };
  return (
    <>
      {isMenuOpen && (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button onClick={() => setIsMenuOpen(true)}></button>
          </SheetTrigger>
          <SheetContent side="left" size="sm">
            <SheetHeader>
              <SheetTitle className="font-bold my-4">Topics</SheetTitle>
            </SheetHeader>
            <ol className="pl-4 overflow-y-auto h-full">
              {codeData.map((item, index) => (
                <li
                  key={index}
                  className={`pl-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ${
                    selectedCodeData === item ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => {
                    ScrollFromStart();
                    setSelectedCodeData(item);
                    setIsMenuOpen(false);
                  }}
                >
                  {index + 1}. {item.title}
                </li>
              ))}
            </ol>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default TopicsMenu;
