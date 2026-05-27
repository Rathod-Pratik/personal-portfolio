import { Sidebar } from "@component";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <div className="p-4 xl:ml-[250px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout