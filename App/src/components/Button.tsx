import React from "react";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <a
      href="mailto:rathodpratik1928@gmail.com"
      className="
        inline-block
        bg-[#fca61f]
        text-white
        px-6
        py-3
        text-lg
        font-medium
        rounded-full
        shadow-lg
        transition-all
        duration-300
        hover:bg-purple-700
        hover:scale-105
      "
    >
      {text}
    </a>
  );
};

export default Button;