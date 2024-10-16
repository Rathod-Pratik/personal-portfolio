import React, { useEffect } from "react";
import Button from "../Button";
import Aos from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    Aos.init();
  });

  return (
    <main className="bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col md:flex-row w-full px-12 pt-[5rem] items-center h-[650px]">
      {/* Info Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left md:items-start md:pl-[5rem]" id="info" data-aos="fade-right">
        <div className="mt-14">
          <span className="text-gray-800 text-5xl block">Hello! I Am</span>
          <span className="text-purple-500 text-5xl mt-2 block">Rathod Pratik</span>
          <span className="text-gray-700 text-lg mt-4 block max-w-[70%] mx-auto md:mx-0">
            I'm A Web Developer having experience in creating websites with fully responsive design and handling backend development.
          </span>
        </div>
        <div className="mt-4">
          <Button text={"Hire me"} />
        </div>
      </div>

      {/* Image Section - hidden on small screens */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center mt-14" id="image" data-aos="fade-left">
        <img src="Images/home.jpg" alt="profile" className="rounded-full w-[400px] h-[400px] object-cover" />
      </div>
    </main>
  );
};

export default Home;
