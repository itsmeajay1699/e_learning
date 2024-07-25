import { Outlet, useLocation } from "react-router-dom";
import StudentSideBar from "./components/StudentSideBar";

const sidebarItems = [
  {
    name: "Dashboard",
    src: "../../../../public/icons/home.svg",
    link: "/student/dashboard",
  },
  {
    name: "Courses",
    src: "../../../../public/icons/courses.png",
    link: "/student/courses",
  },
  {
    name: "Enrolled Courses",
    src: "../../../../public/icons/enrolled-course.png",
    link: "/student/enrolled-courses",
  },
  {
    name: "Chat",
    src: "../../../../public/icons/speech-bubble.png",
    link: "/student/chat",
  },

  {
    name: "Profile",
    src: "../../../../public/icons/people.png",
    link: "/student/profile",
  },
];

const StudentHome = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <main className="flex gap-4 p-[1rem]">
      <div className={`${path.split("/")[2] === "chat" ? "hidden" : ""}`}>
        <StudentSideBar item={sidebarItems} />
      </div>
      <section className="flex-1 w-full">
        <div className="md:pl-[280px] pl-[80px]">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default StudentHome;
