import React, { useEffect } from "react";
import logoImg from "../../../../public/icons/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Axios from "@/utils";

type SidebarItem = {
  name: string;
  src: string;
  link: string;
};

const StudentSideBar = ({
  item,
  ReactNode,
}: {
  item: SidebarItem[];
  ReactNode?: JSX.Element;
}) => {
  const location = useLocation();

  const logOut = async () => {
    try {
      localStorage.removeItem("user");

      const response = await Axios.post("/auth/logout");

      console.log(response.data.message);

      toast.success(response.data.message, {
        position: "top-right",
        className: "bg-green-500 p-4 rounded-lg text-white",
      });

      window.location.href = "/login";
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        className: "bg-red-500 p-4 rounded-lg text-white",
      });
    }
  };

  useEffect(() => {
    const ul = document.querySelector(".sidebar__nav");

    const logoutButton = document.createElement("li");
    logoutButton.className = "sidebar__nav-item logout";
    logoutButton.innerHTML = `
      <div class="md:flex-1">
        <button class="sidebar__nav-link">
          <img class="sidebar__nav-icon-svg" src="../../../../public/icons/user-logout.png" alt="" />
          <span class="hide min-w-fit logout-span">Logout</span>
        </button>
      </div>
    `;

    logoutButton.addEventListener("click", logOut);

    ul?.appendChild(logoutButton);

    return () => {
      ul?.removeChild(logoutButton);
    };
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar__logo">
          <img src={logoImg} alt="logo" />
          <span className="company-name hide">Treadue Courses</span>
        </div>

        <ul className="sidebar__nav">
          {item.map((item, index) => (
            <li
              key={index}
              className={`sidebar__nav-item ${
                location.pathname === item.link ? "active" : ""
              }`}
            >
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 * index,
                  damping: 30,
                }}
                className="md:flex-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to={item.link} className={`sidebar__nav-link`}>
                  <img
                    className="sidebar__nav-icon-svg"
                    src={item.src}
                    alt=""
                  />
                  <span className="hide min-w-fit">{item.name}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-green-200">
          {ReactNode && ReactNode}
        </div>
      </div>
    </aside>
  );
};

export default StudentSideBar;
