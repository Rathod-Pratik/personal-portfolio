import React, { useEffect } from "react";
import Card from "./language-card";
import Button from "./Button";
import Aos from "aos";
import "aos/dist/aos.css";

const Language = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="bg-gray-100 w-[93%] rounded-xl m-auto">
      <div
        className="pt-4 text-center text-purple-500 text-xl font-semibold mb-4"
        data-aos="fade-down"
      >
        My Skills
      </div>

      <div className="flex flex-col m-auto">
        {/* Cards Section */}
        <div
          className="w-[80vw] m-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  gap-4"
          data-aos="fade-down"
        >
          {/* Cards visible on all screen sizes */}
          <Card text={"HTML & CSS"} percentage={70} color={"yellow"} />
          <Card text={"jQuery"} percentage={95} color={"#ff6161"} />
          <Card text={"Javascript"} percentage={60} color={"orange"} />

          {/* Cards hidden on small screens */}

          <Card
            text={"NextJS"}
            percentage={50}
            color={"#BAFF39"}
          />

          <Card
            text={"ReactJs"}
            hidden={true}
            percentage={55}
            color={"#e314e3"}
          />

          <Card
            text={"ExpressJS"}
            hidden={true}
            percentage={60}
            color={"#EF036C"}
          />

          <Card
            text={"NodeJs"}
            hidden={true}
            percentage={60}
            color={"#00ABE4"}
          />

          <Card
            text={"MongoDB"}
            hidden={true}
            percentage={60}
            color={"#FFCE32"}
          />

          <Card
            text={"PHP"}
            hidden={true}
            percentage={50}
            color={"#8e0d3c"}
          />
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
            <Button text={"Download CV"} />
          </div>
        </div>
      </div>

      {/* Custom CSS for responsiveness */}
      
    </div>
  );
};

export default Language;
