import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiClient } from "../lib/api-Client";

const PrivateRoute = ({ element: Element }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const response = apiClient
      .get("/auth/check", { withCredentials: true })
      .then((res) => setAuth(res.data.authenticated))
      .catch(() => setAuth(false));
      console.log(response);
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? <Element /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
