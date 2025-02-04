import React, { useEffect } from "react";

const Expertise = () => {
  return (
    <div className="p-4">
      <h1
        data-aos="fade-down"
        className="text-center text-purple-500 text-xl font-semibold mt-3"
      >
        My Expertise
      </h1>
      <h2 className="text-center text-3xl font-bold mt-5" data-aos="fade-down">
        Provide Wide Range of <br />
        Digital Services
      </h2>
      <div
        className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3"
        data-aos="fade-down"
      >
        {/* Card 1 */}
        <div className="bg-[#1f2937] shadow-md text-center mx-auto w-full md:w-[250px] lg:w-[350px] relative z-0 flex flex-col items-center p-8 border rounded-md">
          <img
            className="w-24 mx-auto mb-4"
            src="https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/service-icon1.png"
            alt="Frontend Development"
            width={400}
            height={400}
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

        {/* Card 2 */}
        <div className="bg-[#1f2937] shadow-md text-center mx-auto w-full md:w-[250px] lg:w-[350px] relative z-0 flex flex-col items-center p-8 border rounded-md">
          <img
            className="w-24 mx-auto mb-4"
            src="https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/service-icon2.png"
            alt="Debugging"
            width={400}
            height={400}
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

        {/* Card 3 */}
        <div className="bg-[#1f2937] shadow-md text-center mx-auto w-full md:w-[250px] lg:w-[350px] relative z-0 flex flex-col items-center p-8 border rounded-md">
          <img
            className="w-24 mx-auto mb-4"
            src="https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/service-icon3.png"
            alt="Database"
            width={400}
            height={400}
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
