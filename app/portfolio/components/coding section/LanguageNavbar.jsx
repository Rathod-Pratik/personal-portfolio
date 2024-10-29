"use client";
import React from "react";
import { IoMenu } from "react-icons/io5";

const LanguageNavbar = ({ 
  languages = [], // Default empty array in case languages is undefined
  selectedLanguage, 
  setSelectedLanguage, 
  inlangClick, 
  SetinlangClick, 
  handleScrollAreaMenuClick, 
  ScrollFromStart 
}) => (
  <div className="flex gap-3 fixed w-full z-50">
    <ul className="flex flex-row gap-7 px-3 sticky lg:justify-center top-[64px] bg-background/50 backdrop-blur-lg m-auto justify-start py-2 cursor-pointer border-b w-full z-10 overflow-x-auto whitespace-nowrap scrollbar-hide sm:py-4">
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
        {languages.length > 0 && // Only map if languages is not empty
          languages.map((language, index) => (
            <li
              key={index}
              className={`hover:border-white flex items-center hover:border-b transition duration-300 ease-in-out ${
                selectedLanguage && selectedLanguage.code === language.code
                  ? "border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => {
                setSelectedLanguage(language);
                SetinlangClick(true);
                ScrollFromStart();
              }}
            >
              {language.code}
            </li>
          ))}
      </ul>
    </ul>
  </div>
);

export default LanguageNavbar;
