import { Suspense, useEffect } from "react";
import NamedLoading from "./components/Loading";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { toast, Toaster } from "sonner";
import { useSocket } from "./context/socketContext";
import ChatEventEnum from "./constant";
import Axios from "./utils";
function App() {
  const { socket } = useSocket();

  // for session

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await Axios.get("/auth/session");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // localStorage.setItem("token", res.data.token);
      } catch (err) {
        localStorage.removeItem("user");
        // localStorage.removeItem("token");
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    socket?.on(ChatEventEnum.MESSAGE_RECEIVED_EVENT, (message) => {
      console.log(message);
      toast.success("New message received", {
        duration: 2000,
        position: "top-right",
        className: "bg-green-500 p-4",
      });
    });
    return () => {
      socket?.off(ChatEventEnum.MESSAGE_RECEIVED_EVENT);
    };
  }, [socket]);

  return (
    <Suspense fallback={<NamedLoading />}>
      {/* <ToastContainer theme="colored" /> */}
      <Toaster richColors={true} />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
