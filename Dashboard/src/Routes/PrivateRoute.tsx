import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiClient } from "../lib/api-Client";
import Loading from "../Component/Loading";

const PrivateRoute = ({ Element }: { Element: React.ComponentType }) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiClient.get("/auth/check", { withCredentials: true });
        setAuth(res.data.authenticated === true);
        sessionStorage.setItem("Authorized", "true");
      } catch {
        setAuth(false);
        sessionStorage.setItem("Authorized", "false");
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return <Loading />;

  return auth ? <Element /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
