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
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-500">
          MY SKILLS
        </h1>

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
              className="inline-block
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
        hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10">Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;