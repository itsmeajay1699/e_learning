import { Link } from "react-router-dom";
import logoImg from "/public/icons/logo.png";
import { motion } from "framer-motion";
type SidebarItem = {
  name: string;
  src: string;
  link: string;
};

const MobileNavbar = ({
  item,
  toggle,
  // setToggle,
}: {
  item: SidebarItem[];
  toggle: boolean;
  // setToggle: (toggle: boolean) => void;
}) => {
  return (
    <div className={`${toggle ? "mob-sidebar" : "hidden"}`}>
      <div className="sidebar-wrapper">
        <div className="sidebar__logo">
          <img src={logoImg} alt="logo" />
          <span className="company-name hide">Treadue Courses</span>
        </div>

        <ul className="sidebar__nav">
          {item.map((item, index) => (
            <li
              key={index}
              className={`sidebar__nav-item  ${
                location.pathname === item.link ? "active" : ""
              }`}
            >
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  // delay: 0.1 * index,
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
      </div>
    </div>
  );
};

export default MobileNavbar;
