import React, { useEffect, useState } from "react";

const Skills = ({ color, text, percentage }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(percentage);
    if (start === end) return;

    let totalDuration = 500; // 2 seconds
    let incrementTime = (totalDuration / end) * 5;

    let timer = setInterval(() => {
      start += 1;
      setCurrentPercentage(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [percentage]);

  const backgroundStyle = {
    background: `conic-gradient(${color} ${currentPercentage * 3.6}deg, #ededed 0deg)`,
  };

  const Color = {
    color: `${color}`,
  };

  return (
    <div className="w-[229px] md:w-[198px] bg-white rounded-[20px] my-[18px] hover:scale-110 transition-all duration-300">
      <div className="flex flex-col items-center text-center my-[18px]">
        <div
          className="w-[120px] h-[120px] flex items-center justify-center relative rounded-full"
          style={backgroundStyle}
        >
          <div className="w-[110px] h-[110px] bg-white rounded-full flex items-center justify-center">
            <div className="absolute text-[24px] font-bold" style={Color}>
              {currentPercentage}%
            </div>
          </div>
        </div>
        <br />
        <div className="text-[1.2rem] font-medium text-black">{text}</div>
      </div>
    </div>
  );
};

export default Skills;