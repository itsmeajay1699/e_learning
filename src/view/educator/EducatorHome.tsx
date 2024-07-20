import StudentSideBar from "../students/components/StudentSideBar";
import { Outlet } from "react-router-dom";

import Chart from "../../components/SidebarChat";
const item = [
  {
    name: "Dashboard",
    src: "../../../../public/icons/home.svg",
    link: "/educator/dashboard",
  },
  {
    name: "My Courses",
    src: "../../../../public/icons/courses.png",
    link: "/educator/my-courses",
  },
  {
    name: "Upload Course",
    src: "../../../../public/icons/enrolled-courses.png",
    link: "/educator/upload-course",
  },
];

const EducatorHome = () => {
  return (
    <main className="flex gap-4 p-[1rem]">
      <div className="">
        <StudentSideBar item={item} ReactNode={<Chart />} />
      </div>
      <section className="md:ml-[280px] ml-[80px] flex-1">
        <Outlet />
      </section>
    </main>
  );
};

export default EducatorHome;
