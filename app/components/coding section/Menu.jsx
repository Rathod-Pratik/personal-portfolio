import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";

const Menu = ({ selectedLanguage, languages, setSelectedLanguage, setIsMenuOpen }) => {
  
    const ScrollFromStart = () => {
        document.documentElement.scrollTop = 0;
    };
    const handleScrollAreaMenuClick = () => {
        console.log("Hello world");
        setIsMenuOpen((prev) => !prev);

      };
    return (
        <div>
            <div className="flex gap-3 fixed w-full z-50">
                {/* Language selection list */}
                <ul className="flex flex-row gap-7 px-3 sticky lg:justify-center top-[64px] bg-background/50 backdrop-blur-lg m-auto justify-start py-2 cursor-pointer border-b w-full z-10 overflow-x-auto whitespace-nowrap scrollbar-hide sm:py-4">
                    <li>
                        <IoMenu
                            className="cursor-pointer w-[40px] h-[34px] lg:hidden"
                            onClick={handleScrollAreaMenuClick}
                            aria-label="Open menu"
                        />
                    </li>
                    <div className="m-auto flex flex-row gap-7">
                        {languages.map((language, index) => (
                            <li
                                key={index}
                                className={`hover:border-white flex items-center
                                    hover:border-b transition duration-300 ease-in-out ${
                                    selectedLanguage && selectedLanguage.code === language.code
                                        ? "border-b-2 border-blue-500"
                                        : ""
                                    }`}
                                onClick={() => {
                                    setSelectedLanguage(language);
                                    ScrollFromStart();
                                }}
                            >
                                {language.code}
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Menu;