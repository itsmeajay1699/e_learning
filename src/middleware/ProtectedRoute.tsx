import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ userRole }: { userRole: number }) => {
  // 1 student and 2 educator

  if (userRole === 1) {
    return <Outlet />;
  } else if (userRole === 2) {
    return <h1>Educator Dashboard</h1>;
  } else {
    return <h1>Not Authorized</h1>;
  }
};

export default ProtectedRoute;