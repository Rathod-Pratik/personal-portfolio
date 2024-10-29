"use client";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import React, { useState, useEffect } from "react";

const host = "http://localhost:5000/api/pdf";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCodeData = async () => {
      try {
        const response = await fetch(`${host}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (error) {
        console.error("Error fetching code data:", error);
      }
    };

    getCodeData();
    AOS.init();
  }, []);

  return (
    <>
    <h2 className=" flex text-5xl mt-2 justify-center font-bold">Notes</h2>
    <div className="flex flex-row flex-wrap gap-3 justify-center mt-5"> 
      {data.map((item, index) => (
        <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-black" data-aos="zoom-in"> 
        <div key={index} className="w-[400px] h-[290px] flex flex-col items-center p-6" >
          <img
            src={`${host}${item.logo}`}
            className="mb-4 w-[7rem] h-[7rem]"
            />

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {item.file_name}
          </h5>

          <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {item.description}
          </span>

          <div className="grid mt-4">
            <a
              className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
              href={`${host}${item.pdf}`}
              rel="noreferrer"
              >
              Download PDF
            </a>
          </div>
        </div></div>
      ))}
    </div>
      </>
  );
};

export default Page;