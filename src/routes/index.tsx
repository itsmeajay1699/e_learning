import {
  Navigate,
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
import EducatorHome from "../view/educator/EducatorHome";
import EducatorDashboard from "../view/educator/EducatorDashboard";
import UploadCourses from "../view/educator/UploadCourses";
import MyCourses from "../view/educator/MyCourses";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<>NOT FOUND</>}>
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<ProtectedRoute userRole={1} />}>
        <Route path="" element={<StudentHome />}>
          <Route
            path=""
            element={<Navigate replace to="/student/dashboard" />}
          />
          <Route path="dashboard" element={<StudentDashBoard />} />
          <Route path="courses">
            <Route path="" element={<CoursesPage />} />
            <Route path=":courseId" element={<CourseDetails />} />
          </Route>
          <Route path="profile" element={<div>Profile</div>} />
        </Route>
      </Route>

      {/* Educator Routes */}
      <Route path="/educator" element={<ProtectedRoute userRole={2} />}>
        <Route path="" element={<EducatorHome />}>
          <Route
            path=""
            element={<Navigate replace to="/educator/dashboard" />}
          />
          <Route path="dashboard" element={<EducatorDashboard />} />
          <Route path="my-courses">
            <Route path="" element={<MyCourses />} />
            <Route path=":courseId" element={<CourseDetails />} />
          </Route>
          <Route path="upload-course" element={<UploadCourses />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
