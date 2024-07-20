import { ColumnDef } from "@tanstack/react-table";
import CourseTable from "./components/CourseTable";
import { EnrolledCourse } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios, { handleEnrollCourse } from "@/utils";
import ThreeDots from "@/components/ThreeDots";
import { cn } from "@/lib/utils";

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
// ];

const columns: ColumnDef<EnrolledCourse>[] = [
  {
    accessorKey: "courseId",
    header: ({ table }) => {
      return (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.toggleAllPageRowsSelected(event.target.checked)
          }
          aria-label="Select all"
        />
      );
    },
    cell: (cell) => {
      return (
        <input
          type="checkbox"
          checked={cell.row.getIsSelected()}
          onChange={(event) => cell.row.toggleSelected(event.target.checked)}
        />
      );
    },
  },

  {
    accessorKey: "educatorDetails.email",
    header: "Educator",
    cell: (cell) => {
      return (
        <div className="flex gap-2 items-center justify-center">
          <img
            src={cell.row.original.educatorDetails.profilePicture}
            alt={cell.row.original.educatorDetails.email}
            className="w-10 h-10 rounded-full"
          />
          <span>{cell.getValue() as ReactNode}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Completion Status",
    cell: (cell) => {
      return cell.getValue() === "1" ? (
        <span className="text-white border-2 border-red-500 p-2 rounded-md bg-red-400">
          In Progress
        </span>
      ) : (
        <span className="text-white border-2 border-green-500 p-2 rounded-md bg-green-400">
          Completed
        </span>
      );
    },
  },
  {
    accessorKey: "courseDetails.title",
    header: "Course",
  },
  {
    accessorKey: "courseDetails.price",
    header: "Price",
  },
  {
    accessorKey: "courseDetails.totalSession",
    header: "Total Sessions",
  },
  {
    accessorKey: "courseDetails.rating",
    header: "Rating",
  },
  // {
  //   accessorKey: "courseDetails.status",
  //   header: "Status",
  //   cell: (cell) => {
  //     return cell.getValue() === "1" ? "Active" : "Inactive";
  //   },
  // },
  {
    accessorKey: "cour",
    header: "Action",
    cell: (cell) => {
      return (
        <div>
          <ThreeDots
            viewCourse={
              <Link
                state={{
                  course: cell.row.original.courseDetails,
                }}
                to={`/student/courses/${cell.row.original.courseId}`}
                className={cn(
                  `flex items-center w-full  py-2 text-sm font-medium text-left
                   focus:ring-4 focus:outline-none dark:text-white
                   focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700
                    dark:focus:ring-gray-600 bg-yellow-500 text-white p-2 px-6 hover:bg-yellow-600   rounded-md`
                )}
              >
                View Course
              </Link>
            }
            onClick1={() => handleEnrollCourse(cell.row.original._id, "2")}
            title1="Complete Course"
            // onClick2={() => handleEnrollCourse(cell.row.original._id, "3")} // this will work after
            title2="Download Certificate"
            onclick3={() => handleEnrollCourse(cell.row.original._id, "3")}
            title3="Unenroll"
            className1={`${
              cell.row.original.status === "2"
                ? "bg-green-500 pointer-events-none"
                : "bg-gray-500"
            } text-white p-2  px-6  rounded-md`}
            className3={`${
              cell.row.original.status === "2"
                ? "bg-red-500 pointer-events-none"
                : "bg-gray-500"
            } text-white p-2  px-6  rounded-md`}
            className2={`${
              cell.row.original.status === "2"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 pointer-events-none"
            } text-white p-2  px-6  rounded-md`}
          />
        </div>
      );
    },
  },
];

const StudentDashBoard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[] | []>(
    []
  );

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await Axios.get("/course/student-enrolled-courses");
        setEnrolledCourses(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnrolledCourses();
  }, []);

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-lg shadow-md">
      <div
        className="bg-gray-200 p-4 flex items-start gap-4 rounded-lg shadow-md"
        style={{ height: "100px" }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVn20gDEs5CG_H0rBnJvuJWAVuK3B_wnC-tg&s"
          alt="profile pic"
          className="rounded-full h-20 w-20 object-cover"
        />
        <h1>Student Name</h1>
      </div>
      {/* <div className="w-full">
        <h1 className="text-xl font-bold">New Courses</h1>
        <div className="scroll-container">
          {data.slice(0, 3).map((course) => (
            <div className="w-full">
              <CourseCard
                key={course._id}
                title={course.title}
                description={course.description}
                thumbnail={course.thumbnail}
                price={course.price}
                totalEnrollment={course.totalEnrollment}
                rating={course.rating}
                duration={course.duration}
                course={course}
              />
            </div>
          ))}
        </div>
      </div> */}
      <div className="mt-5">
        <h1 className="text-xl font-bold">My Courses</h1>
        <CourseTable
          data={enrolledCourses}
          columns={columns as ColumnDef<object>[]}
        />
      </div>
    </section>
  );
};

export default StudentDashBoard;
