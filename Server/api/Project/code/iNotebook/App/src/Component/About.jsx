import React, { useState } from "react";

const About = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null); // Close if already open
    } else {
      setOpenSection(section); // Open the clicked section
    }
  };

  return (
    <div className="sm:w-[95vw] w-[80vw] mx-auto my-[42px]">
      <div id="accordion-collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-white border border-b-0 border-gray-200 rounded-t-xl   gap-3"
            onClick={() => toggleSection(1)}
            aria-expanded={openSection === 1}
            aria-controls="accordion-collapse-body-1"
          >
            <span>User Experience</span>
            <svg
              className={`w-3 h-3 shrink-0 ${
                openSection === 1 ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openSection === 1 && (
          <div
            id="accordion-collapse-body-1"
            className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="mb-2 text-white">
              Designed with a responsive layout, ensuring compatibility across
              various devices (desktop, tablet, mobile).
            </p>
            <p className="mb-2 text-white">
              Offers a clean and intuitive interface for easy navigation and
              efficient note management.
            </p>
          </div>
        )}

        <h2 id="accordion-collapse-heading-2">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-white border border-b-0 border-gray-200   gap-3"
            onClick={() => toggleSection(2)}
            aria-expanded={openSection === 2}
            aria-controls="accordion-collapse-body-2"
          >
            <span>Security Features</span>
            <svg
              className={`w-3 h-3 shrink-0 ${
                openSection === 2 ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openSection === 2 && (
          <div
            id="accordion-collapse-body-2"
            className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="mb-2 text-white">
              Implements JWT (JSON Web Tokens) for secure user authentication
              and session management
            </p>
            <p className="mb-2 text-white">
              Password hashing ensures that user passwords are stored securely,
              mitigating the risk of data breaches.
            </p>
            <p className="mb-2 text-white">
            Input data is subjected to validation and sanitization to protect against common vulnerabilities, such as SQL injection and XSS attacks.
            </p>
          </div>
        )}

        <h2 id="accordion-collapse-heading-3">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-white border border-gray-200 gap-3"
            onClick={() => toggleSection(3)}
            aria-expanded={openSection === 3}
            aria-controls="accordion-collapse-body-3"
          >
            <span>Core Functionality</span>
            <svg
              className={`w-3 h-3 shrink-0 ${
                openSection === 3 ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        {openSection === 3 && (
          <div
            id="accordion-collapse-body-3"
            className="p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="mb-2 text-white">
              Enables users to create, read, update, and delete (CRUD) their
              notes seamlessly.
            </p>
            <p className="mb-2 text-white">
              Features user authentication to ensure secure access to personal
              notes.
            </p>
            <p className="mb-2 text-white">
              Allows for tagging and categorization of notes for easier
              organization and retrieval.
            </p>
          </div>
        )}
       <h2 id="accordion-collapse-heading-4">
  <button
    type="button"
    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-white border border-gray-200   gap-3"
    onClick={() => toggleSection(4)} 
    aria-expanded={openSection === 4} 
    aria-controls="accordion-collapse-body-4"
  >
    <span>Technology Stack</span>
    <svg
      className={`w-3 h-3 shrink-0 ${
        openSection === 4 ? "rotate-180" : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5 5 1 1 5"
      />
    </svg>
  </button>
</h2>
{openSection === 4 && (
  <div
    id="accordion-collapse-body-4" 
    className="p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
  >
    <p className="mb-2 text-white">
      Built using React for the frontend, providing a dynamic and responsive user interface.
    </p>
    <p className="mb-2 text-white">
      Powered by Express and Node.js on the backend for efficient server-side logic and API handling.
    </p>
    <p className="mb-2 text-white">
      Uses MongoDB as the database to store and manage notes effectively.
    </p>
  </div>
)}

      </div>
    </div>
  );
};

export default About;
