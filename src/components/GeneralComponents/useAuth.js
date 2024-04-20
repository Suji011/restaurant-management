import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      if (!isExpired && role) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return isAuthenticated;
};
