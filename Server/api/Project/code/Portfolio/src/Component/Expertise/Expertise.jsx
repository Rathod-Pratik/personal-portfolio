import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

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
        className="text-center text-gray-800 text-3xl font-bold mt-5"
        data-aos="fade-down"
      >
        Provide Wide Range of <br />
        Digital Services
      </h2>

      <div
        className="flex flex-col md:flex-row justify-evenly mt-8 space-y-6 md:space-y-0"
        data-aos="fade-down"
      >
        <div className="bg-white shadow-md rounded-lg text-center p-6 max-w-xs mx-auto">
          <img
            src="Images/service-icon1.png"
            alt="service icon-1"
            className="w-24 mx-auto mb-4"
          />
          <h1 className="text-gray-800 text-2xl font-bold mb-4">Frontend</h1>
          <p className="text-gray-600 mb-4">
            The frontend of the website will be built using React for dynamic
            user interfaces and CSS for styling. The components will be reusable
            and modular.
          </p>
          <a href="#" className="text-orange-500 text-lg hover:text-purple-500">
            Read more
          </a>
        </div>

        <div className="bg-white shadow-md rounded-lg text-center p-6 max-w-xs mx-auto">
          <img
            src="Images/service-icon2.png"
            alt="service icon-2"
            className="w-24 mx-auto mb-4"
          />
          <h1 className="text-gray-800 text-2xl font-bold mb-4">Debugging</h1>
          <p className="text-gray-600 mb-4">
            To ensure smooth functionality, debugging will involve tools like
            Chrome DevTools for real-time inspection of elements.
          </p>
          <a href="#" className="text-orange-500 text-lg hover:text-purple-500">
            Read more
          </a>
        </div>

        <div className="bg-white shadow-md rounded-lg text-center p-6 max-w-xs mx-auto">
          <img
            src="Images/service-icon3.png"
            alt="service icon-3"
            className="w-24 mx-auto mb-4"
          />
          <h1 className="text-gray-800 text-2xl font-bold mb-4">Database</h1>
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
