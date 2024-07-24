import CourseCard from "./components/CourseCard";
import { motion } from "framer-motion";
import { EnrolledCourse } from "@/types";
import { useState, useEffect } from "react";
import Axios from "@/utils";
import Filter from "@/components/Filter";
// const data = [
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
//   {
//     _id: "668d79ba3bfd352ff3e3899d",
//     educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
//     educatorDetails: {
//       name: "Dr. John Doe",
//       bio:
//         "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
//       contact: "educator@gmail.com",
//     },
//     title: "Introduction to Artificial Intelligence",
//     description:
//       "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
//     thumbnail:
//       "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
//     price: 1999.99,
//     duration: 20,
//     totalEnrollment: 0,
//     totalSession: 5,
//     sessionDetails: [
//       {
//         sessionNumber: 1,
//         title: "Introduction to AI",
//         description: "Overview of AI, its history, and its applications.",
//       },
//       {
//         sessionNumber: 2,
//         title: "Machine Learning Basics",
//         description:
//           "Introduction to machine learning concepts and techniques.",
//       },
//       {
//         sessionNumber: 3,
//         title: "Deep Learning",
//         description: "Fundamentals of neural networks and deep learning.",
//       },
//       {
//         sessionNumber: 4,
//         title: "Natural Language Processing",
//         description:
//           "Techniques for processing and understanding human language.",
//       },
//       {
//         sessionNumber: 5,
//         title: "AI Ethics and Future",
//         description:
//           "Discussion on ethical considerations and the future of AI.",
//       },
//     ],
//     status: "1",
//     rating: 4.5,
//     createdAt: "2024-07-09T17:56:10.520Z",
//     updatedAt: "2024-07-09T17:56:10.520Z",
//     __v: 0,
//   },
// ];

const CoursesPage = () => {
  const [data, setData] = useState<EnrolledCourse[]>([]);
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
