import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../view/auth/Login";
import ProtectedRoute from "../middleware/ProtectedRoute";
import StudentDashBoard from "../view/students/StudentDashBoard";
import StudentHome from "../view/students/StudentHome";
import CoursesPage from "../view/students/CoursesPage";
import CourseDetails from "../view/students/CourseDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<>NOT FOUND</>}>
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<ProtectedRoute userRole={1} />}>
        <Route path="" element={<StudentHome />}>
          <Route path="dashboard" element={<StudentDashBoard />} />
          <Route path="courses">
            <Route path="" element={<CoursesPage />} />
            <Route path=":courseId" element={<CourseDetails />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
