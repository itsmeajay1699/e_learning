import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Category } from "@/types";
import Axios from "@/utils";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const FilterCourseByCategory = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [allCategories, setAllCategories] = React.useState([]);
  const [categoryNameForFilter, setCategoryNameForFilter] = React.useState<
    string
  >("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await Axios.get("/category");
      setAllCategories(data.data);
    };

    fetchCategories();
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-2 rounded-lg bg-blue-500  h-12  text-white w-[300px]"
      >
        {categoryNameForFilter === ""
          ? "All Categories"
          : categoryNameForFilter}
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg
            className="w-4 h-4 fill-current text-white"
            width="15"
            height="15"
            viewBox="0 0 20 20"
          >
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        className="absolute bg-white w-[300px] shadow mt-[2px] rounded-lg"
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.1,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        {/* <motion.li 
        className="bg-blue-500 text-white w-[300px]"
        variants={itemVariants}>Item 1 </motion.li> */}

        {allCategories.map((category: Category) => (
          <motion.li
            key={category._id}
            className="bg-blue-500 text-white w-[300px] p-2 border-b cursor-pointer hover:bg-blue-400"
            variants={itemVariants}
            onClick={() => {
              setState(category._id);
              setCategoryNameForFilter(category.categoryName);
              setIsOpen(false);
            }}
          >
            {category.categoryName}
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default FilterCourseByCategory;
