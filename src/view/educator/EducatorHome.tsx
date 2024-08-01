import StudentSideBar from "../students/components/StudentSideBar";
import { Outlet, useLocation } from "react-router-dom";

import Chart from "../../components/SidebarChat";
import { useEffect, useRef } from "react";
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
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePadding = () => {
      if (sidebarRef.current) {
        const sidebarDiv = document.querySelector(".sidebar-handle-width");
        4;
        console.log(sidebarDiv);
        const sidebarWidth = sidebarRef.current.offsetWidth;
        if (sidebarDiv) {
          (sidebarDiv as HTMLElement).style.paddingLeft = `${sidebarWidth}px`;
        }
      }
    };

    const observer = new ResizeObserver(updatePadding);

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    // Set initial padding
    updatePadding();

    return () => {
      if (sidebarRef.current) {
        observer.unobserve(sidebarRef.current);
      }
    };
  }, []);
  return (
    <main className="flex gap-4 p-[1rem]">
      <div className={`${path.split("/")[2] === "chat" ? "hidden" : ""}`}>
        <StudentSideBar
          sidebarRef={sidebarRef}
          item={item}
          ReactNode={<Chart />}
        />
      </div>
      <section className={`flex-1 w-full `}>
        <div className="sidebar-handle-width">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default EducatorHome;
