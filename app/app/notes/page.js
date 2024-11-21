"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState, useEffect } from "react";
import { useLoadingBar } from "@/components/LoadingBarContext";
import NoteCard from "../_Component/NotesPage/NoteCard";
const host=process.env.NEXT_PUBLIC_BACKEND_URL;
 

const Page = () => {
  const { setProgress } = useLoadingBar();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCodeData = async () => {
      setProgress(10);
      try {
        const response = await fetch(`${host}/api/pdf`, {
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
      {/* <div className="flex flex-row flex-wrap gap-3 justify-center mt-5"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center 2xl:grid-cols-4 gap-6 w-full m-auto mt-5">
        {data.map((item, index) => (
          <div key={index}>
            <NoteCard item={item}  />
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;