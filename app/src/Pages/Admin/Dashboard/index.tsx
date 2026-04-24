import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import { GET_ADMIN_DETAIL } from "@api";
import { Loading } from "@component";
import { DashboardStatsResponse, DataStat } from "@Type";
import { Experience, Expertise, Hero } from "./Component";

const Dashboard = () => {
  const { data: dataStats = [], isLoading } = useQuery<DataStat[]>({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await apiClient.get<DashboardStatsResponse>(GET_ADMIN_DETAIL, {
        withCredentials: true,
      });
      if (response.status === 200) {
        return [
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
            label: "Contacts",
            value: response.data.ContactLength,
            color: "from-orange-400 to-red-500",
          },
          {
            label: "Skills",
            value: response.data.SkillLength,
            color: "from-purple-500 to-indigo-600",
          },
          {
            label: "Website Visits",
            value: response.data.AdminView,
            color: "from-blue-400 to-blue-800",
          },
        ];
      }
      return [];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen text-white p-6 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div
        data-aos="zoom-in"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-10"
      >
        {dataStats.map(({ label, value, color }) => (
          <div
            key={label}
            className={`rounded-3xl p-6 flex flex-col items-center justify-center transition duration-200 shadow-xl border border-slate-800 bg-gradient-to-br ${color} hover:scale-105 hover:shadow-2xl`}
          >
            <h2 className="text-md font-medium mb-2 text-slate-100 tracking-wide opacity-80 whitespace-nowrap">
              {label}
            </h2>
            <p className="text-4xl font-black text-white drop-shadow-md">
              {value}
            </p>
          </div>
        ))}
      </div>
      <Hero />
      <Expertise />
      <div className="mt-6">
        <Experience />
      </div>
    </div>
  );
};

export default Dashboard;
