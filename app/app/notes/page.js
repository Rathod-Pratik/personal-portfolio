"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useLoadingBar } from "@/components/LoadingBarContext";
const host =
  "https://76zsstq72k.execute-api.ap-south-1.amazonaws.com/dev/api/pdf";

const Page = () => {
  const { setProgress } = useLoadingBar();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCodeData = async () => {
      setProgress(10);
      try {
        const response = await fetch(`${host}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProgress(70);
        const result = await response.json();
        setData(result);
        setProgress(100);
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
          <div
            key={index}
            className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-black"
            data-aos="zoom-in"
          >
            <div className="w-[400px] h-[290px] flex flex-col items-center p-6">
              <img src={`${item.logo}`} className="mb-4 w-[7rem] h-[7rem]" />

              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {item.file_name}
              </h5>

              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {item.description}
              </span>

              <div className="grid mt-4">
                <a
                  target="_blank"
                  className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
                  href={`${item.pdf}`} // Assuming item.pdf contains the URL to the PDF
                  download={true} // This triggers the download
                  rel="noreferrer"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
