import StudentSideBar from "../students/components/StudentSideBar";
import { Outlet, useLocation } from "react-router-dom";

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
    name: "Chat",
    src: "../../../../public/icons/speech-bubble.png",
    link: "/educator/chat",
  },
  {
    name: "Upload Course",
    src: "../../../../public/icons/enrolled-courses.png",
    link: "/educator/upload-course",
  },
];

const EducatorHome = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <main className="flex gap-4 p-[1rem]">
      <div className={`${path.split("/")[2] === "chat" ? "hidden" : ""}`}>
        <StudentSideBar item={item} ReactNode={<Chart />} />
      </div>
      <section className="w-full flex-1">
        <div className="md:ml-[280px] ml-[80px]">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default EducatorHome;
