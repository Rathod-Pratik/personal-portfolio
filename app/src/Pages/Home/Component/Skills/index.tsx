import SkillsCard from "./Component/index";
import type { SkillItem, SkillsProps } from "@Type";
import { DownloadFile } from "@utils/Functions";

const Skills = ({ data, resumeFile }: SkillsProps) => {
  return (
    <div className="bg-[#0f172a] w-[93%] rounded-3xl m-auto border border-gray-800 shadow-2xl overflow-hidden">
      
      {/* Heading */}
      <div
        data-aos="fade-down"
        className="pt-8 text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          My <span className="text-purple-500">Skills</span>
        </h1>

        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-3"></div>
      </div>

      <div className="flex flex-col gap-10 py-10">
        
        {/* Skills Cards */}
        <div
          data-aos="fade-up"
          className="w-full sm:w-[90vw] lg:w-[80vw] px-4 sm:px-0 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {data.length > 0 &&
            data.map((item: SkillItem, index: number) => (
              <div
                key={index}
                className="bg-[#111827] border border-gray-700 hover:border-purple-500 rounded-2xl p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
              >
                <SkillsCard
                  text={item.language}
                  percentage={item.percentage}
                  color={item.color}
                />
              </div>
            ))}
        </div>

        {/* Experience Section */}
        <div
          data-aos="fade-down"
          id="data-section"
          className="w-full sm:w-[75vw] m-auto text-center px-4"
        >
          <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight mb-6">
            Beautiful & Unique Digital <br />
            <span className="text-purple-500">Experiences</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-8 mx-auto max-w-4xl mb-5">
            Creating beautiful and unique digital experiences requires a blend
            of creativity and technical skill. By focusing on intuitive user
            interfaces and innovative design, digital platforms can captivate
            users while keeping them engaged and invested in the content.
          </p>

          <p className="text-gray-500 text-base sm:text-lg leading-8 mx-auto max-w-4xl">
            Personalized experiences enhance user interaction, making the
            digital journey memorable. Thoughtful animations, seamless
            navigation, and responsive design contribute to a visually stunning
            and efficient digital environment.
          </p>

          {/* Button */}
          <div className="mt-10 pb-4">
            <button
              onClick={() => {
                if (resumeFile) {
                  DownloadFile(resumeFile, "Resume");
                }
              }}
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
            >
              <span className="relative z-10">Download CV</span>

              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;