import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const CourseCard = ({
  thumbnail,
  title,
  description,
  price,
  totalEnrollment,
  rating,
  duration,
  course,
  toGO = "/student/courses",
}: {
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  totalEnrollment: number;
  rating: number;
  duration: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
  toGO?: string;
}) => {
  return (
    <Link key={course._id} state={{ course }} to={`${toGO}/${course._id}`}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-white shadow-lg rounded-md p-4 cursor-pointer"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-44 object-cover rounded-md"
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="text-sm text-gray-500 truncate">{description}</p>
          <div className="flex flex-col justify-between mt-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500">Price: ${price}</span>
              <span className="text-sm text-gray-500">
                Enrolled: {totalEnrollment}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-between mt-1">
              <span className="text-sm text-gray-500">Rating: {rating} ⭐</span>
              <span className="text-sm text-gray-500">
                Duration: {duration} weeks
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;
