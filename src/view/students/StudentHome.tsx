import { Outlet, useLocation } from "react-router-dom";
import StudentSideBar from "./components/StudentSideBar";
import { useEffect, useRef } from "react";

const sidebarItems = [
  {
    name: "Dashboard",
    src: "/icons/home.svg",
    link: "/student/dashboard",
  },
  {
    name: "Courses",
    src: "/icons/courses.png",
    link: "/student/courses",
  },
  {
    name: "Enrolled Courses",
    src: "/icons/enrolled-course.png",
    link: "/student/enrolled-courses",
  },
  {
    name: "Chat",
    src: "/icons/speech-bubble.png",
    link: "/student/chat",
  },
  {
    name: "Profile",
    src: "/icons/people.png",
    link: "/student/profile",
  },
];

const StudentHome = () => {
  const location = useLocation();
  const path = location.pathname;
  const sidebarRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePadding = () => {
      if (sidebarRef.current) {
        const sidebarWidth = sidebarRef.current.offsetWidth;
        const padding = sidebarWidth - 25;

        if (divRef.current) {
          console.log(padding);
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
        <StudentSideBar sidebarRef={sidebarRef} item={sidebarItems} />
      </div>
      <section className={`flex-1 w-full`}>
        <div ref={divRef} className="w-full h-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default StudentHome;
