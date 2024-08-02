import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";
import Axios from "@/utils";
import { useSocket } from "@/context/socketContext";
import ChatEventEnum from "@/constant";
import { SessionDetail } from "@/types";

const CourseDetails = () => {
  const { courseId } = useParams();
  console.log(courseId);
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const enrolledCourse = async (courseId: string, educatorId: string) => {
    try {
      const response = await Axios.post(`/course/enrolled-course/${courseId}`, {
        educatorId,
      });

      toast.success(response.data.message, {
        position: "top-right",
        className: "bg-green-500 p-4 rounded-lg text-white",
      });
    } catch (err) {
      toast.error((err as Error).message, {
        position: "top-right",
        className: "bg-red-500 p-4 rounded-lg text-white",
      });
    }
  };

  const { socket } = useSocket();

  useEffect(() => {
    socket?.on(ChatEventEnum.NEW_CHAT_ROOM_EVENT, (data) => {
      console.log(data);
    });
    return () => {
      socket?.off(ChatEventEnum.NEW_CHAT_ROOM_EVENT);
    };
  }, [socket]);

  console.log(location.state.course);

  return (
    <section>
      <div>
        <div className="relative">
          <motion.img
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: "100%",
              transition: {
                duration: 0.5,
                type: "tween",
              },
            }}
            src={location.state.course.thumbnail}
            alt={location.state.course.title}
            className="w-full h-96 object-cover rounded-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 rounded-3xl"
          />
          <div className="md:absolute mt-6 md:top-[50%] max-w-full md:bottom-10  md:max-w-lg md:left-20 md:right-7 flex items-center md:justify-center">
            <div className="flex flex-col md:px-4 md:py-4 justify-between bg-white shadow-lg rounded-lg">
              <div>
                <h1 className="text-2xl font-semibold">
                  {location.state.course.title}
                </h1>
                <p className="text-gray-500">
                  {location.state.course.description
                    .toString()
                    .substring(0, 150)}
                  {location.state.course.description.length > 150 && "..."}
                </p>
              </div>

              {path === "student" && (
                <button
                  onClick={() =>
                    enrolledCourse(
                      location.state.course._id,
                      location.state.course.educatorId
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mt-4">Course Details</h1>
          educatorDetails
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Educator Details</h2>

            <div className="flex gap-3 items-center my-2">
              <img
                className="h-12 w-12 rounded-full border-2 border-gray-400"
                src={location.state.course.educatorDetails.profilePicture}
                alt=""
              />
              <p>{location.state.course.educatorDetails.email}</p>
              <p>{location.state.course.educatorDetails.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-4">Contact</h3>
              <p>{location.state.course.educatorDetails.contact}</p>
            </div>

            <h2 className="text-xl font-semibold mt-4">Course Details</h2>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Sessions</h3>
              {location.state.course.sessionDetails.map(
                (session: SessionDetail) => (
                  <div key={session.sessionNumber} className="mt-2">
                    <div>
                      <span className="text-sm text-gray-500">
                        Session {session.sessionNumber}
                      </span>
                      <h3 className="text-lg font-semibold">{session.title}</h3>
                    </div>
                    <p>{session.description}</p>
                  </div>
                )
              )}

              <h3 className="text-lg font-semibold mt-4">Course Information</h3>

              <div className="mt-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-500">
                    Price: ${location.state.course.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Enrolled: {location.state.course.totalEnrollment}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-between mt-1">
                  <span className="text-sm text-gray-500">
                    Rating: {location.state.course.rating} ⭐
                  </span>
                  <span className="text-sm text-gray-500">
                    Duration: {location.state.course.duration} weeks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
