import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import axiosInstance from "../utils/Api";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { setUserProfileData } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          axiosInstance.defaults.headers.post["Content-Type"] =
            "application/json";
          const response = await axiosInstance.get("/api/v1/user-profile");

          setUserProfileData(response.data);
        } catch (err) {
          setRedirectToLogin(true);
        }
      } else {
        setRedirectToLogin(true);
      }
    };

    checkToken();
  }, []);

  if (redirectToLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
