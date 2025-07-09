// src/Routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAppStore } from "../store";

const PrivateRoute = ({ element: Element }) => {
  const { userInfo } = useAppStore();
  return userInfo ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
