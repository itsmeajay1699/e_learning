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
    name: "Profile",
    src: "../../../../public/icons/enrolled-courses.png",
    link: "/student/profile",
  },
];

const StudentHome = () => {
  return (
    <main className="flex gap-4 p-[1rem]">
      <div className="">
        <StudentSideBar item={sidebarItems} />
      </div>
      <section className="md:ml-[280px] ml-[120px] flex-1">
        <Outlet />
      </section>
    </main>
  );
};

export default StudentHome;
