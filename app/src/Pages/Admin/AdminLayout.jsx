import { Outlet } from "react-router-dom";
import Sidebar from "../../Component/Admin/SideBar";
const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <div className="p-4 xl:ml-[250px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout