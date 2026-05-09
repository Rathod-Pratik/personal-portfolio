import { useEffect, useState } from "react";
import type { SkillCardProps } from "@Type";

const SkillsCard = ({ color, text, percentage }: SkillCardProps) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(percentage);

    if (start === end) return;

    const totalDuration = 800;
    const incrementTime = (totalDuration / end) * 5;

    const timer = setInterval(() => {
      start += 1;
      setCurrentPercentage(start);

      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [percentage]);

  const backgroundStyle = {
    background: `conic-gradient(${color} ${
      currentPercentage * 3.6
    }deg, #1f2937 0deg)`,
  };

  return (
    <div className="group w-full max-w-[240px] m-auto bg-[#111827] rounded-3xl py-6 px-4 transition-all duration-500 hover:-translate-y-3">
      
      <div className="flex flex-col items-center text-center">
        
        {/* Progress Circle */}
        <div
          className="relative w-[110px] sm:w-[120px] md:w-[130px] h-[110px] sm:h-[120px] md:h-[130px] rounded-full flex items-center justify-center transition-all duration-500"
          style={backgroundStyle}
        >
          {/* Inner Circle */}
          <div className="w-[90px] sm:w-[100px] md:w-[110px] h-[90px] sm:h-[100px] md:h-[110px] bg-[#0f172a] rounded-full flex items-center justify-center shadow-inner">
            
            {/* Percentage */}
            <span
              className="text-[22px] sm:text-[24px] md:text-[28px] font-bold"
              style={{ color }}
            >
              {currentPercentage}%
            </span>
          </div>

          {/* Glow Effect */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"
            style={{ background: color }}
          ></div>
        </div>

        {/* Skill Name */}
        <h2 className="mt-6 text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-wide">
          {text}
        </h2>

        {/* Small Bottom Line */}
        <div
          className="mt-3 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-20"
          style={{ background: color }}
        ></div>
      </div>
    </div>
  );
};

export default SkillsCard;