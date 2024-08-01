import CourseCard from "./components/CourseCard";
import { motion } from "framer-motion";
import { CourseSession } from "@/types";
import { useState, useEffect } from "react";
import Axios from "@/utils";
import Filter from "@/components/Filter";

const CoursesPage = () => {
  const [data, setData] = useState<CourseSession[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  const [page, setPage] = useState<number>(1);

  const [limit, setLimit] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await Axios.get(
        `/course/all/?page=${page}&limit=${limit}&categoryId=${categoryId}`
      );
      setTotal(response.data.totalCourseCount);
      setData(response.data.data);
    };
    fetchCourses();
  }, [categoryId, page, limit]);

  return (
    <section>
      <div>
        <div className="flex justify-end  items-center mb-[2rem]">
          <Filter setState={setCategoryId} />
        </div>

        <h1>All Courses</h1>
        {/* this will remove and do increase the limit when i want to increase or decrese now 10 is fine */}
        <div onClick={() => setLimit((prev) => prev + 1)}></div>
        <div className="grid-container mt-5">
          {data.map((course, index) => (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.1 * index,
                damping: 30,
                type: "spring",
                stiffness: 300,
              }}
              className="md:flex-1"
            >
              <CourseCard
                key={index}
                thumbnail={course.thumbnail}
                title={course.title}
                description={course.description}
                price={course.price}
                totalEnrollment={course.totalEnrollment}
                rating={course.rating}
                duration={course.duration}
                course={course}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center flex-wrap md:pl-[280px] pl-[80px] items-center mt-5 absolute bottom-20 left-1/2 transform -translate-x-1/2">
        {...Array(Math.ceil(total / limit))
          .fill(0)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className="mx-1 px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              {index + 1}
            </button>
          ))}
      </div>
    </section>
  );
};

export default CoursesPage;
