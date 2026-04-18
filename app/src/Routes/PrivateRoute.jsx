import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiClient } from "../lib/api-Client";
import Loading from "../Component/Loading/Loading";
import { useAppStore } from "../store";

const PrivateRoute = ({ element: Element }) => {
  const [auth, setAuth] = useState(null);
  const { isLoading, setIsLoading } = useAppStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient.get("/auth/check", { withCredentials: true });
        setAuth(res.data.authenticated);
      } catch {
        setAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setIsLoading]);

  if (isLoading || auth === null) return <Loading />;

  return auth ? <Element /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
