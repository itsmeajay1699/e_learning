import { CourseSession } from "../../types";
import { useEffect, useState } from "react";
import CourseCard from "../students/components/CourseCard";
import Axios from "@/utils";

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState<CourseSession[] | []>([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data } = await Axios.get("/course/my-courses");
        setMyCourses(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCourses();
  }, []);
  //api/course/my-courses
  console.log(myCourses);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
      <div className="mt-5">
        <div className="grid-container">
          {myCourses.map((course: CourseSession) => (
            <CourseCard
              key={course._id}
              title={course.title}
              description={course.description}
              thumbnail={course.thumbnail}
              price={course.price}
              duration={course.duration}
              totalEnrollment={course.totalEnrollment}
              rating={course.rating}
              course={course}
              toGO="/educator/my-courses"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
