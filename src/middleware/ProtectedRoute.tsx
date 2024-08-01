import { Navigate, Outlet } from "react-router-dom";

import { User } from "@/types";
const ProtectedRoute = ({ userRole }: { userRole: number }) => {
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  if (!user || user.role !== userRole.toString()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
