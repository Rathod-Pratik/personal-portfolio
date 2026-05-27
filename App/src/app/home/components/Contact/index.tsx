"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@apiClient";
import {
  CREATE_CONTACT,
  GET_BUDGET_OPTIONS,
  GET_PROJECTTYPE_OPTIONS,
} from "@api";
import { toast } from "react-toastify";

type ContactOption = {
  _id: string;
  value: string;
};

const Contact = () => {
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [budgets, setBudgets] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    email: "",
    mobile: "",
    projectType: "",
    budget: "",
  });

  useEffect(() => {
    const fetchContactOptions = async () => {
      try {
        const [projectTypesResponse, budgetsResponse] = await Promise.all([
          apiClient.get(GET_PROJECTTYPE_OPTIONS),
          apiClient.get(GET_BUDGET_OPTIONS),
        ]);

        if (projectTypesResponse.status === 200) {
          const projectTypeOptions = (projectTypesResponse.data.data ?? []) as ContactOption[];
          const projectTypeValues = projectTypeOptions.map((item) => item.value);
          setProjectTypes(projectTypeValues);
          setFormData((current) => ({
            ...current,
            projectType: projectTypeValues[0] || "",
          }));
        }

        if (budgetsResponse.status === 200) {
          const budgetOptions = (budgetsResponse.data.data ?? []) as ContactOption[];
          const budgetValues = budgetOptions.map((item) => item.value);
          setBudgets(budgetValues);
          setFormData((current) => ({
            ...current,
            budget: budgetValues[0] || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching contact options:", error);
      }
    };

    fetchContactOptions();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      message: "",
      email: "",
      mobile: "",
      projectType: projectTypes[0] || "",
      budget: budgets[0] || "",
    });
  };

  const submitFormData = async () => {
    try {
     const response=await apiClient.post(CREATE_CONTACT,{
      name:formData.name,
      email : formData.email,
      mobile :formData.mobile,
      projectType: formData.projectType,
      budget: formData.budget,
      message: formData.message
     });
      if (response.status === 200) {
       toast.success("Form submitted successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form data:", error);
      toast.error("Failed to submit form.");
    } finally {
    }
  };
  return (
      <div className="p-4 mx-auto w-[90%] lg:w-[60%]" id="contact-us-section">
        {/* Heading Section */}
        <div className="text-center pt-3" data-aos="fade-down" >
          <p className="text-purple-500 text-xl font-semibold">Get in Touch</p>
          <h1 className="mt-2 text-4xl font-bold">
            Any Questions? Feel Free to Contact
          </h1>
        </div>

        {/* Form Section */}
        <div className="flex flex-col md:flex-row w-full mx-auto mt-5 space-y-8 md:space-y-0 md:space-x-8">
          <section className="w-full p-6">
            <div
              data-aos="fade-left"
              className="flex flex-col space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:p-6 rounded-md shadow-sm">
                {/* Name Field */}
                <input
                  required
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Name"
                />

                {/* Email Field */}
                <input
                  required
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Email"
                />

                {/* Phone Field */}
                <input
                  required
                  type="tel"
                  id="mobile"
                  placeholder="Mobile No."
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Mobile Number"
                />

                {/* Project Type Field */}
                <select
                  required
                  id="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300  px-4 py-3  outline-none transition hover:border-purple-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  aria-label="Project Type"
                >
                  <option value="" disabled>
                    Select Project Type
                  </option>
                  {projectTypes.map((projectType,key) => (
                    <option key={key} value={projectType}>
                      {projectType}
                    </option>
                  ))}
                </select>

                {/* Budget Field */}
                <select
                  required
                  id="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-3  outline-none transition hover:border-purple-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  aria-label="Budget"
                >
                  <option value="" disabled>
                    Select Budget
                  </option>
                  {budgets.map((budget,key) => (
                    <option key={key} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>

                {/* Message Field */}
                <textarea
                  required
                  rows={6}
                  id="message"
                  placeholder="Describe your project requirements and any specific details you'd like to share..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded bg-transparent outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  aria-label="Message"
                ></textarea>

                {/* Submit Button */}
                <div className="flex justify-start">
                  <button
                    onClick={submitFormData}
                    className="bg-[#fca61f] text-white p-3 px-6 text-xl rounded-full border-0 cursor-pointer hover:bg-purple-700 transition-all duration-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
};

export default Contact;
