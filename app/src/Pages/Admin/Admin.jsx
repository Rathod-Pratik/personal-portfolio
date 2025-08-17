import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";
import { apiClient } from "../../lib/api-Client";
import { GET_ADMIN_DETAIL } from "../../Utils/Constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale
);

const Admin = () => {
  const [monthlyViews, setMonthlyViews] = useState([]);
  const [dataStats, setDataStats] = useState([]);
  const fetchData = async () => {
    try {
      const response = await apiClient.get(GET_ADMIN_DETAIL, {
        withCredentials: true,
      });
      if (response.status == 200) {
        setMonthlyViews(response.data.MonthlyViews);
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
            label: "Code Snippets",
            value: response.data.CodeLength,
            color: "from-yellow-400 to-amber-500",
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

  const monthlyViewsArray = Object.entries(monthlyViews);
  const barData = {
    labels: monthlyViewsArray.map(([month]) => month), 
    datasets: [
      {
        label: "Views",
        data: monthlyViewsArray.map(([month, value]) => value), // [10, 25, 40]
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barThickness: 25,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#cbd5e1" }, grid: { display: false } },
      y: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };
  return (
    <div className="min-h-screen  text-white p-6" >
      <div data-aos="zoom-in" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
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
      <div>
        {/* Sales/Views Overview */}
        <div className="col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-white text-lg font-semibold mb-2">
            Monthly Views Overview
          </h2>
          <p className="text-green-400 text-sm mb-4">Current Year Data</p>
          <Bar data={barData} options={barOptions} height={140} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
