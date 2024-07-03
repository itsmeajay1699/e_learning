import { Suspense } from "react";
import NamedLoading from "./components/Loading";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <Suspense fallback={<NamedLoading />}>
      {/* <ToastContainer theme="colored" /> */}
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
