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
    <div className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] m-auto bg-white rounded-[20px] my-[18px] hover:scale-110 transition-all duration-300">
    <div className="flex flex-col items-center text-center my-[18px]">
      {/* Circle Container */}
      <div
        className="w-[100px] sm:w-[110px] md:w-[120px] h-[100px] sm:h-[110px] md:h-[120px] flex items-center justify-center relative rounded-full"
        style={backgroundStyle}
      >
        <div className="w-[90px] sm:w-[100px] md:w-[110px] h-[90px] sm:h-[100px] md:h-[110px] bg-white rounded-full flex items-center justify-center">
          <div className="absolute text-[20px] sm:text-[22px] md:text-[24px] font-bold" style={Color}>
            {currentPercentage}%
          </div>
        </div>
      </div>
      <br />
      {/* Card Text */}
      <div className="text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.4rem] font-medium text-black">
        {text}
      </div>
    </div>
  </div>
  
  );
};

export default Skills;