import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ userRole }) => {
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;

  if (!user || user.role !== userRole.toString()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
