import { Outlet } from "react-router-dom";
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
    src: "../../../../public/icons/chat.png",
    link: "/student/chat",
  },

  {
    name: "Profile",
    src: "../../../../public/icons/people.png",
    link: "/student/profile",
  },
];

const StudentHome = () => {
  return (
    <main className="flex gap-4 p-[1rem]">
      <div className="">
        <StudentSideBar item={sidebarItems} />
      </div>
      <section className="md:pl-[280px] pl-[80px] flex-1">
        <Outlet />
      </section>
    </main>
  );
};

export default StudentHome;
