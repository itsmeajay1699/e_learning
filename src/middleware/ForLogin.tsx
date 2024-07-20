import { Navigate, Outlet } from "react-router-dom";

const ForLogin = () => {
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;

  if (user && user.role === "1") {
    return <Navigate to="/student" replace />;
  } else if (user && user.role === "2") {
    return <Navigate to="/educator" replace />;
  }
  return <Outlet />;
};

export default ForLogin;
