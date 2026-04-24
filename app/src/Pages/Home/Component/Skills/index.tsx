import SkillsCard from "./Component/index";
import type { SkillItem, SkillsProps } from "@Type";
import { DownloadFile } from "@utils/Functions";

const Skills = ({ data, resumeFile }: SkillsProps) => {

  return (
    <div className="bg-gray-100 w-[93%] rounded-xl m-auto">
      <div
      data-aos="fade-down"
        className="pt-4 text-center text-purple-500 text-xl font-semibold mb-4"
       
      >
        My Skills
      </div>

      <div className="flex flex-col m-auto">
        {/* Cards Section */}
        <div
        data-aos="fade-down"
          className="w-full sm:w-[90vw] lg:w-[80vw] px-2 sm:px-0 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {
            data.length > 0 && data.map((item: SkillItem, index: number) => (
              <SkillsCard key={index} text={item.language} percentage={item.percentage} color={item.color} />
            ))
            }
        </div>

        {/* Experience Section */}
        <div
          className="w-full sm:w-[60vw] m-auto  mt-auto md:mt-0 text-center"
         data-aos="fade-down"
          id="data-section"
        >
          <h1 className="text-gray-800 text-3xl font-bold mb-4">
            Beautiful & Unique Digital <br /> Experiences
          </h1>
          <p className="text-gray-600 text-base mx-auto px-6 mb-4">
            Creating beautiful and unique digital experiences requires a blend
            of creativity and technical skill. By focusing on intuitive user
            interfaces and innovative design, digital platforms can captivate
            users, keeping them engaged and invested in the content.
          </p>
          <p className="text-gray-600 text-base mx-auto px-6">
            Personalized experiences also enhance user interaction, making the
            digital journey memorable. Thoughtful animations, seamless
            navigation, and responsive design contribute to a visually appealing
            and efficient digital environment.
          </p>
          <div className="mt-6 pb-6">
            <button
            onClick={() => {
              if (resumeFile) {
                DownloadFile(resumeFile, "Resume");
              }
            }}
             className="bg-[#fca61f] text-white px-6 py-2 text-xl leading-7 rounded-full border-none cursor-pointer hover:bg-[#6f34fe] transition-all duration-500"
            >Download CV</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
