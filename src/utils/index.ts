import Axios from "axios";
import { toast } from "sonner";

Axios.defaults.baseURL = "http://localhost:5000/api";

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers;
  }
  return config;
});

Axios.defaults.withCredentials = true;

export default Axios;

export const handleAction = async (status: string, courseId: string) => {
  try {
    if (status === "1") {
      status = "3";
    } else if (status === "3") {
      status = "1";
    } else {
      toast.error("Invalid status", {
        position: "top-right",
        className: "text-red-500 p-4",
      });
    }

    const response = await Axios.post(`/course/update-status/${courseId}`, {
      status,
    });

    console.log(response.data.data.status);

    if (response.data.data.status === "1") {
      toast.success("Course is now live", {
        position: "top-right",
        className: "text-green-500 p-4",
      });
    } else {
      toast.error("Course Deactivate", {
        position: "top-right",
        className: "text-red-500 p-4",
      });
    }
  } catch (err) {
    toast.error("Failed to update course status", {
      position: "top-right",
      className: "text-red-500 p-4",
    });
  }
};

export const handleEnrollCourse = async (enrollId: string, status: string) => {
  try {
    // 1 means in progress
    // 2 means is completed
    // 3 means is unenrolled basically delete the course

    const reponse = await Axios.post(`/course/change-status/${enrollId}`, {
      status,
    });

    if (status === "1") {
      toast.success("Course is now in progress", {
        position: "top-right",
        className: "text-green-500 p-4",
      });
    } else if (status === "2") {
      toast.success("Course is now completed", {
        position: "top-right",
        className: "text-green-500 p-4",
      });
    } else {
      toast.error("Course is unenrolled", {
        position: "top-right",
        className: "text-red-500 p-4",
      });
    }

    console.log(reponse.data.data.status);
  } catch (err) {
    toast.error("Failed to enroll course", {
      position: "top-right",
      className: "text-red-500 p-4",
    });
  }
};
