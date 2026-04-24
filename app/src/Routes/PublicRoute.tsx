import { Navigate } from "react-router-dom";
import { useAppStore } from "../store";

const PublicRoute = ({ Element }: { Element: React.ComponentType }) => {
  const { userInfo } = useAppStore();
  return userInfo ? <Navigate to="/admin" /> : <Element />;
};

export default PublicRoute;