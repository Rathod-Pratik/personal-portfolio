// src/Routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAppStore } from "../store";

const PublicRoute = ({ element: Element }) => {
  const { userInfo } = useAppStore();
  return userInfo ? <Navigate to="/admin" /> : <Element />;
};

export default PublicRoute;