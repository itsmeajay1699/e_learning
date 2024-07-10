import React from "react";
import logoImg from "../../../../public/icons/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

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
    link: "/student/enrolled-courses",
  },
];

const StudentSideBar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar__logo">
          <img src={logoImg} alt="logo" />
          <span className="company-name hide">Treadue Courses</span>
        </div>

        <ul className="sidebar__nav">
          {sidebarItems.map((item, index) => (
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
                  <span className="hide">{item.name}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default StudentSideBar;
