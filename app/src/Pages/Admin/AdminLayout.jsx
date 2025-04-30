import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../Component/Admin/SideBar";
import { useAppStore } from "../../store";
import { useEffect } from "react";

const AdminLayout = () => {
  const {userInfo}=useAppStore();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!userInfo) return navigate('/login')
  },[])
    return (
      <div>
        <div className="grid grid-cols-12">
          <div  className="xl:col-span-2 hidden xl:block h-[90vh]">
            <Sidebar />
          </div>
          <div   className="xl:col-span-10 col-span-12 p-4">
            <div className="xl:hidden">
            <Sidebar />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      );
    };

export default AdminLayout