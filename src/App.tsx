import { Suspense } from "react";
import NamedLoading from "./components/Loading";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "sonner";
function App() {
  return (
    <Suspense fallback={<NamedLoading />}>
      {/* <ToastContainer theme="colored" /> */}
      <Toaster />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
