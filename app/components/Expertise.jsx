import React, { useEffect } from "react";
import Aos from "aos";

import "aos/dist/aos.css";
import Image from "next/image";
 import service1 from '../public/Images/service-icon1.png'
 import service2 from '../public/Images/service-icon2.png'
 import service3 from '../public/Images/service-icon3.png'

const Expertise = () => {
 
  useEffect(() => {
    Aos.init();
  });

  return (
    <div className="p-4">
      <h1
        className="text-center text-purple-500 text-xl font-semibold mt-3"
        data-aos="fade-down"
      >
        My Expertise
      </h1>
      <h2
        className="text-center text-3xl font-bold mt-5"
        data-aos="fade-down"
      >
        Provide Wide Range of <br />
        Digital Services
      </h2>

      <div
        className="flex flex-col md:flex-row justify-evenly mt-8 space-y-6 md:space-y-0 "
        data-aos="fade-down"
      >
        <div className="bg-[#1f2937] shadow-md rounded-lg text-center p-6 max-w-xs mx-auto w-[400px]">
          
          <Image
            className="w-24 mx-auto mb-4"
        src={service1} // Path to the image in the public folder
        alt="Description of the image"
        width={400}                // Set width of the image
        height={400}               // Set height of the image
      />
          <h1 className="text-white text-2xl font-bold mb-4">Frontend</h1>
          <p className="text-gray-600 mb-4">
            The frontend of the website will be built using React for dynamic
            user interfaces and CSS for styling. The components will be reusable
            and modular.
          </p>
          <a href="#" className="text-orange-500 text-lg hover:text-purple-500">
            Read more
          </a>
        </div>

        <div className="bg-[#1f2937] shadow-md rounded-lg text-center p-6 max-w-xs mx-auto w-[400px]">
        <Image
            className="w-24 mx-auto mb-4"
        src={service2} // Path to the image in the public folder
        alt="Description of the image"
        width={400}                // Set width of the image
        height={400}               // Set height of the image
      />
          <h1 className="text-white text-2xl font-bold mb-4">Debugging</h1>
          <p className="text-gray-600 mb-4">
            To ensure smooth functionality, debugging will involve tools like
            Chrome DevTools for real-time inspection of elements.
          </p>
          <a href="#" className="text-orange-500 text-lg hover:text-purple-500">
            Read more
          </a>
        </div>

        <div className="bg-[#1f2937] shadow-md rounded-lg text-center p-6 max-w-xs mx-auto w-[400px]">
        <Image
            className="w-24 mx-auto mb-4"
        src={service3} // Path to the image in the public folder
        alt="Description of the image"
        width={400}                // Set width of the image
        height={400}               // Set height of the image
      />
          <h1 className="text-white text-2xl font-bold mb-4">Database</h1>
          <p className="text-gray-600 mb-4">
            The backend will use MongoDB as the primary database, ensuring
            flexibility with its NoSQL structure. The data will be organized
            into collections.
          </p>
          <a href="#" className="text-orange-500 text-lg hover:text-purple-500">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Expertise;