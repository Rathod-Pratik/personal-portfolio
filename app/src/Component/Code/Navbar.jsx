import React from "react";
import { IoMenu } from "react-icons/io5";

const Navbar = ({
  languages,
  selectedLanguage,
  setSelectedLanguage,
  inlangClick,
  SetinlangClick,
  handleScrollAreaMenuClick,
}) => {
  const ScrollFromStart = () => {
    const scroll = document.documentElement;
    scroll.scrollTop = 0;
  };
  return (
    <div className="flex gap-3 fixed w-full z-50" id="sub-menu">
      <ul className="flex flex-row gap-7 px-3 sticky lg:justify-center top-[64px] bg-[hsl(222.2,84%,4.9%)]/50 backdrop-blur-lg m-auto justify-start py-2 cursor-pointer border-b w-full z-10 overflow-x-auto whitespace-nowrap scrollbar-hide sm:py-4">
        {inlangClick && (
          <li>
            <IoMenu
              className="cursor-pointer w-[40px] h-[34px] lg:hidden" // Hidden on medium and larger screens
              onClick={handleScrollAreaMenuClick}
              aria-label="Open menu"
            />
          </li>
        )}
        <ul className="m-auto flex flex-row gap-7">
          {languages.map((language, index) => (
            <li
              key={index}
              className={`hover:border-white flex items-center
                hover:border-b transition duration-300 ease-in-out 
                ${
                  
                  selectedLanguage?.language ===language.language
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              onClick={() => {
                setSelectedLanguage(language);
                SetinlangClick(true);
                ScrollFromStart();
              }}
            >
              {language.language}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default Navbar;
