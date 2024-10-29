import React, { useEffect } from "react";
import Button from "./Button";
import Aos from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";
 import home from '../public/home.jpg'
const Home = () => {
  useEffect(() => {
    Aos.init();
  });

  return (
    <main className="flex flex-col md:flex-row w-full px-12 items-center h-[650px]">
    {/* Info Section */}
    <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left md:items-start md:pl-[5rem]" id="info" data-aos="zoom-in-down">
      <div className="mt-28">
        <span className=" text-5xl block">Hello! I Am</span>
        <span className="text-purple-500 text-5xl mt-2 block">Rathod Pratik</span>
        <span className=" text-lg mt-4 block max-w-[70%] mx-auto md:mx-0">
          I'm A Web Developer having experience in creating websites with fully responsive design and handling backend development.
        </span>
      </div>
      <div className="mt-4">
        <Button text={"Hire me"} />
      </div>
    </div>

    {/* Image Section - hidden on small screens */}
    <div className="hidden md:flex w-full md:w-1/2 justify-center mt-14" id="image" data-aos="zoom-in-down">
    <Image
            className="rounded-full w-[400px] h-[400px] object-cover"
        src={home} // Path to the image in the public folder
        alt="Description of the image"          // Set height of the image
      />
    </div>
  </main>
  );
};

export default Home;
