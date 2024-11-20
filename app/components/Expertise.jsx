import React, { useEffect } from "react";
import Aos from "aos";

import "aos/dist/aos.css";
import Image from "next/image";

const Expertise = () => {
  useEffect(() => {
    Aos.init();
  });

  return (
    <div className="p-4 overflow-hidden">
      <h1
        className="text-center text-purple-500 text-xl font-semibold mt-3"
        data-aos="fade-down"
      >
        My Expertise
      </h1>
      <h2 className="text-center text-3xl font-bold mt-5" data-aos="fade-down">
        Provide Wide Range of <br />
        Digital Services
      </h2>

      <div
        className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-3 mt-4"
        data-aos="fade-down"
      >
        <div className="bg-[#1f2937] shadow-md  text-center  max-w-xs mx-auto w-[400px] relative z-0 flex flex-col items-center p-8 border rounded-md">
          <img
            className="w-24 mx-auto mb-4"
            src="https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/service-icon1.png" // Path to the image in the public folder
            alt="Description of the image"
            width={400} // Set width of the image
            height={400} // Set height of the image
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

        <div className="bg-[#1f2937] shadow-md  text-center max-w-xs mx-auto w-[400px] relative z-0 flex flex-col items-center p-8 border rounded-md">
          <img
            className="w-24 mx-auto mb-4"
            src="https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/service-icon2.png" // Path to the image in the public folder
            alt="Description of the image"
            width={400} // Set width of the image
            height={400} // Set height of the image
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

        <div className="bg-[#1f2937] shadow-md  text-center max-w-xs mx-auto w-[400px] relative z-0 flex flex-col items-center p-8 border rounded-md">
          <img
            className="w-24 mx-auto mb-4"
            src="https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/service-icon3.png" // Path to the image in the public folder
            alt="Description of the image"
            width={400} // Set width of the image
            height={400} // Set height of the image
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

<section>
  <div className="container mx-auto p-4 sm:p-10">
    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-3">
      <div className="relative z-0 flex flex-col items-center p-8 border rounded-md">
        <span className="absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg dark:text-gray-50 dark:bg-fuchsia-600">
          Personal
        </span>
        <p className="my-6 text-4xl font-bold dark:text-fuchsia-600">FREE</p>
        <ul className="flex-1 space-y-2">
          <li className="flex items-center space-x-2">
           
            <span>Lumet consectetur adipisicing</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>Lumet consectetur adipisicing</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>Lumet consectetur adipisicing</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>Lumet consectetur adipisicing</span>
          </li>
        </ul>
        <button className="px-4 py-2 mt-4 font-semibold uppercase border rounded-lg md:mt-12 sm:py-3 sm:px-8 dark:border-fuchsia-600">
          Subscribe
        </button>
      </div>
      <div className="relative flex flex-col items-center p-8 border-2 rounded-md dark:bg-gray-100 dark:border-fuchsia-600">
        <span className="absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg dark:text-gray-50 dark:bg-fuchsia-600">
          Professional
        </span>
        <p className="flex items-center justify-center my-6 space-x-2 font-bold">
          <span className="text-lg line-through dark:text-gray-700">
            &nbsp;32€&nbsp;
          </span>
          <span className="pb-2 text-4xl">19€</span>
          <span className="text-lg">/mo</span>
        </p>
        <ul className="flex-1 space-y-2">
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-fuchsia-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <span>Consectetur</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-fuchsia-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <span>Adipisicing</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-fuchsia-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <span>Aliquam</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-fuchsia-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <span>Lumet consectetur facilis</span>
          </li>
        </ul>
        <button className="px-8 py-3 mt-12 text-lg font-semibold uppercase rounded dark:text-gray-50 dark:bg-fuchsia-600">
          Subscribe
        </button>
      </div>
      <div className="relative z-0 flex flex-col items-center p-8 border rounded-md dark:bg-gray-100">
        <span className="absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg dark:text-gray-50 dark:bg-fuchsia-600">
          Enterprise
        </span>
        <p className="flex items-center justify-center my-6 space-x-2 font-bold">
          <span className="text-lg line-through dark:text-gray-700">
            &nbsp;49€&nbsp;
          </span>
          <span className="pb-2 text-4xl">37€</span>
          <span className="text-lg">/mo</span>
        </p>
        <ul className="flex-1 space-y-2">
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-fuchsia-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <span>Lumet consectetur adipisicing</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-fuchsia-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <span>Lumet consectetur adipisicing</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-fuchsia-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <span>Lumet consectetur adipisicing</span>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-fuchsia-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
            <span>Lumet consectetur adipisicing</span>
          </li>
        </ul>
        <button className="px-8 py-3 mt-12 text-lg font-semibold uppercase border rounded dark:border-fuchsia-600">
          Subscribe
        </button>
      </div>
    </div>
  </div>
</section>;
