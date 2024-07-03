import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../view/auth/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<>NOT FOUND</>}>
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export default router;
