import React, { useEffect, useState } from "react";

import { apiClient } from "../../lib/api-Client";
import { GET_ADMIN_DETAIL } from "../../Utils/Constant";
import ExperienceCrud from "./ExperienceCrud";
import HeroCrud from "./HeroCrud";
import ExpertiseCrud from "./ExpertiseCrud";
import AboutCrud from "./AboutCrud";

const Admin = () => {
  const [dataStats, setDataStats] = useState([]);
  const fetchData = async () => {
    try {
      const response = await apiClient.get(GET_ADMIN_DETAIL, {
        withCredentials: true,
      });
      if (response.status == 200) {
        setDataStats([
          {
            label: "Blog Posts",
            value: response.data.BlogLength,
            color: "from-indigo-500 to-blue-500",
          },
          {
            label: "Projects",
            value: response.data.ProjectLength,
            color: "from-pink-500 to-fuchsia-500",
          },
          {
            label: "Notes",
            value: response.data.NoteLength,
            color: "from-green-400 to-emerald-600",
          },
          {
            label: "Website Visits",
            value: response.data.AdminView,
            color: "from-blue-400 to-blue-800",
          },
        ]);
      }
    } catch (error) {
      console.log("Error fetching admin details:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen text-white p-6">
      <div
        data-aos="zoom-in"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {dataStats.map(({ label, value, color }) => (
          <div
            key={label}
            className={`rounded-3xl p-6 flex flex-col items-center justify-center transition duration-200 shadow-xl border border-slate-800 bg-gradient-to-br ${color} hover:scale-105 hover:shadow-2xl`}
          >
            <h2 className="text-md font-medium mb-2 text-slate-100 tracking-wide opacity-80">
              {label}
            </h2>
            <p className="text-4xl font-black text-white drop-shadow-md">
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <HeroCrud />
      <AboutCrud />
      <ExpertiseCrud />
      <div className="mt-6">
        <ExperienceCrud />
      </div>
    </div>
  );
};

export default Admin;
