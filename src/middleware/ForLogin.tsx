import { User } from "@/types";
import { Navigate, Outlet } from "react-router-dom";

const ForLogin = () => {
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  if (user && user.role === "1") {
    return <Navigate to="/student" replace />;
  } else if (user && user.role === "2") {
    return <Navigate to="/educator" replace />;
  }
  return <Outlet />;
};

export default ForLogin;
