import React, { useEffect } from 'react';
import Card from "../language-card";
import Button from "../Button";
import Aos from 'aos';
import 'aos/dist/aos.css';
import './language.css'

const Language = () => {
  useEffect(() => {
    Aos.init();
  });

  return (
    <div className="bg-gray-100 p-4">
      <div className="text-center text-purple-500 text-xl font-semibold mb-4" data-aos="fade-down">
        My Skills
      </div>

      <div className="flex flex-col md:flex-row" id='fix-item'>
        {/* Cards Section */}
        <div className="flex flex-wrap justify-center w-full md:w-1/2 gap-4" data-aos="fade-down" id='card-width'>
          <Card text={"HTML & CSS"} percentage={70} color={"yellow"} />
          <Card text={"jQuery"} percentage={95} color={"#ff6161"} />
          <Card text={"Javascript"} percentage={60} color={"orange"} />
          <Card text={"ReactJs"} percentage={30} color={"green"} />
        </div>

        {/* Experience Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 text-center" data-aos="fade-down" id='data-section'>
          <h1 className="text-gray-800 text-3xl font-bold mb-4">
            Beautiful & Unique Digital <br /> Experiences
          </h1>
          <p className="text-gray-600 text-base mx-auto px-6 mb-4">
            Creating beautiful and unique digital experiences requires a blend of creativity and technical skill. By focusing on intuitive user interfaces and innovative design, digital platforms can captivate users, keeping them engaged and invested in the content.
          </p>
          <p className="text-gray-600 text-base mx-auto px-6">
            Personalized experiences also enhance user interaction, making the digital journey memorable. Thoughtful animations, seamless navigation, and responsive design contribute to a visually appealing and efficient digital environment.
          </p>
          <div className="mt-6">
            <Button text={"Download CV"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
