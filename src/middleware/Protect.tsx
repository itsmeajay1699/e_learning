import { Navigate } from "react-router-dom";

const Protect = () => {
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user.role === "1") {
    return <Navigate to="/student" replace />;
  } else if (user.role === "2") {
    return <Navigate to="/educator" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Protect;
