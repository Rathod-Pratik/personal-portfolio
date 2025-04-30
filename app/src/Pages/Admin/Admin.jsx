import React from "react";
const Admin = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
    <div className="max-w-5xl text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-lg mb-4">
        This is your central hub for managing the system efficiently and effectively.
      </p>
      <p className="text-md mb-3">
        From here, you can oversee user activity, manage content, review reports, and configure system settings. It's designed to help you keep everything running smoothly and securely.
      </p>
      <p className="text-md mb-3">
        Use the navigation menu to quickly access different modules, track performance, and handle administrative tasks with ease.
      </p>
      <p className="text-md">
        If you ever need assistance or want to add new features, your tools are just a click away. Let's keep the system productive and organized!
      </p>
    </div>
  </div>
  );
};

export default Admin;
