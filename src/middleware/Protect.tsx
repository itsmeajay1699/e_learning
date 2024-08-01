import { User } from "@/types";
import { Navigate } from "react-router-dom";

const Protect = () => {
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

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
