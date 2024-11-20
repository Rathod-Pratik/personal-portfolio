import React, { useEffect } from "react";
import Button from "./Button";
import Aos from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';

const Home = () => {
  useEffect(() => {
    Aos.init();
  });

  return (

    <section className="w-[90vw] m-auto overflow-hidden">
	<div className="container flex flex-col-reverse justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
    <span className="text-5xl block">Hello! I Am</span>
      <span className="text-purple-500 text-5xl mt-2 block"><Typewriter
  options={{
    delay: 75,
    strings: ['Rathod Pratik', 'MERN Developer','Web Developer'],
    autoStart: true,
    loop: true,
  }}
/></span>
<span className="mt-6 mb-8 text-lg sm:mb-12">
        I&apos;m A Web Developer having experience in creating websites with fully responsive design and handling backend development.
      </span>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start pt-2">
			<Button text={"Hire me"} />
			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src="https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/home.jpg" alt="" className="object-contain  sm:h-80 rounded-full lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
</section>


  );
};

export default Home;
