import StudentSideBar from "../students/components/StudentSideBar";
import { Outlet, useLocation } from "react-router-dom";

import Chart from "../../components/SidebarChat";
import { useEffect, useRef } from "react";
const item = [
  {
    name: "Dashboard",
    src: "/icons/home.svg",
    link: "/educator/dashboard",
  },
  {
    name: "My Courses",
    src: "/icons/courses.png",
    link: "/educator/my-courses",
  },
  {
    name: "Chat",
    src: "/icons/speech-bubble.png",
    link: "/educator/chat",
  },
  {
    name: "Upload Course",
    src: "/icons/enrolled-courses.png",
    link: "/educator/upload-course",
  },
];

const EducatorHome = () => {
  const location = useLocation();
  const path = location.pathname;
  const sidebarRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePadding = () => {
      if (sidebarRef.current) {
        const sidebarWidth = sidebarRef.current.offsetWidth;
        const padding = sidebarWidth;

        if (divRef.current) {
          divRef.current.style.paddingLeft = `${padding}px`;
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
        <div ref={divRef} className="p-4 bg-white rounded-md shadow-md h-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default EducatorHome;
