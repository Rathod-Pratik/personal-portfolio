import React, { useEffect } from "react";
import Button from '../Button';
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";
import { RiEarthLine } from "react-icons/ri";
import Aos from 'aos';
import 'aos/dist/aos.css';

const Contect = () => {
  useEffect(() => {
    Aos.init();
  });

  return (
    <div className="bg-gray-100 p-4">
      <div className="text-center pt-5" data-aos="fade-down">
        <p className="text-purple-500 text-xl font-semibold">Get in Touch</p>
        <h1 className="mt-2 text-gray-800 text-4xl font-bold">Any Questions? Feel Free to Contact</h1>
      </div>

      <div className="flex flex-col md:flex-row w-4/5 mx-auto mt-6 space-y-6 md:space-y-0 md:space-x-8">
        {/* Contact Info */}
        <div className="flex-1" data-aos="fade-right">
          <div className="space-y-4">
            <p className="flex items-center text-lg">
              <FaLocationDot className="text-orange-500 text-2xl mr-4" />
              <span>200 Harshidhi city veraval, 362265</span>
            </p>
            <p className="flex items-center text-lg">
              <IoCall className="text-orange-500 text-2xl mr-4" />
              <span>+91 9016561625</span>
            </p>
            <p className="flex items-center text-lg">
              <SiMinutemailer className="text-orange-500 text-2xl mr-4" />
              <span>rathodpratik1928@gmail.com</span>
            </p>
            <p className="flex items-center text-lg">
              <RiEarthLine className="text-orange-500 text-2xl mr-4" />
              <span>pending</span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 flex flex-col items-center space-y-6" data-aos="fade-left">
          <input
            type="text"
            placeholder="Name"
            className="w-4/5 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-4/5 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="tel"
            placeholder="Mobile No."
            className="w-4/5 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            rows={8}
            placeholder="Message"
            className="w-4/5 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          ></textarea>
          <div className="w-4/5">
            <Button text={"Submit"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contect;
