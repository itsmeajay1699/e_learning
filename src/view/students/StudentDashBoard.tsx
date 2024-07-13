import CourseCard from "./components/CourseCard";
import CourseTable from "./components/CourseTable";

const data = [
  {
    _id: "668d79ba3bfd352ff3e3899d",
    educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
    educatorDetails: {
      name: "Dr. John Doe",
      bio:
        "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
      contact: "educator@gmail.com",
    },
    title: "Introduction to Artificial Intelligence",
    description:
      "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
    thumbnail:
      "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
    price: 1999.99,
    duration: 20,
    totalEnrollment: 0,
    totalSession: 5,
    sessionDetails: [
      {
        sessionNumber: 1,
        title: "Introduction to AI",
        description: "Overview of AI, its history, and its applications.",
      },
      {
        sessionNumber: 2,
        title: "Machine Learning Basics",
        description:
          "Introduction to machine learning concepts and techniques.",
      },
      {
        sessionNumber: 3,
        title: "Deep Learning",
        description: "Fundamentals of neural networks and deep learning.",
      },
      {
        sessionNumber: 4,
        title: "Natural Language Processing",
        description:
          "Techniques for processing and understanding human language.",
      },
      {
        sessionNumber: 5,
        title: "AI Ethics and Future",
        description:
          "Discussion on ethical considerations and the future of AI.",
      },
    ],
    status: "1",
    rating: 4.5,
    createdAt: "2024-07-09T17:56:10.520Z",
    updatedAt: "2024-07-09T17:56:10.520Z",
    __v: 0,
  },
  {
    _id: "668d79ba3bfd352ff3e3899d",
    educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
    educatorDetails: {
      name: "Dr. John Doe",
      bio:
        "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
      contact: "educator@gmail.com",
    },
    title: "Introduction to Artificial Intelligence",
    description:
      "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
    thumbnail:
      "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
    price: 1999.99,
    duration: 20,
    totalEnrollment: 0,
    totalSession: 5,
    sessionDetails: [
      {
        sessionNumber: 1,
        title: "Introduction to AI",
        description: "Overview of AI, its history, and its applications.",
      },
      {
        sessionNumber: 2,
        title: "Machine Learning Basics",
        description:
          "Introduction to machine learning concepts and techniques.",
      },
      {
        sessionNumber: 3,
        title: "Deep Learning",
        description: "Fundamentals of neural networks and deep learning.",
      },
      {
        sessionNumber: 4,
        title: "Natural Language Processing",
        description:
          "Techniques for processing and understanding human language.",
      },
      {
        sessionNumber: 5,
        title: "AI Ethics and Future",
        description:
          "Discussion on ethical considerations and the future of AI.",
      },
    ],
    status: "1",
    rating: 4.5,
    createdAt: "2024-07-09T17:56:10.520Z",
    updatedAt: "2024-07-09T17:56:10.520Z",
    __v: 0,
  },
  {
    _id: "668d79ba3bfd352ff3e3899d",
    educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
    educatorDetails: {
      name: "Dr. John Doe",
      bio:
        "Dr. John Doe has a Ph.D. in Artificial Intelligence and has been teaching AI and ML for over 10 years.",
      contact: "educator@gmail.com",
    },
    title: "Introduction to Artificial Intelligence",
    description:
      "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
    thumbnail:
      "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
    price: 1999.99,
    duration: 20,
    totalEnrollment: 0,
    totalSession: 5,
    sessionDetails: [
      {
        sessionNumber: 1,
        title: "Introduction to AI",
        description: "Overview of AI, its history, and its applications.",
      },
      {
        sessionNumber: 2,
        title: "Machine Learning Basics",
        description:
          "Introduction to machine learning concepts and techniques.",
      },
      {
        sessionNumber: 3,
        title: "Deep Learning",
        description: "Fundamentals of neural networks and deep learning.",
      },
      {
        sessionNumber: 4,
        title: "Natural Language Processing",
        description:
          "Techniques for processing and understanding human language.",
      },
      {
        sessionNumber: 5,
        title: "AI Ethics and Future",
        description:
          "Discussion on ethical considerations and the future of AI.",
      },
    ],
    status: "1",
    rating: 4.5,
    createdAt: "2024-07-09T17:56:10.520Z",
    updatedAt: "2024-07-09T17:56:10.520Z",
    __v: 0,
  },
];

const StudentDashBoard = () => {
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
      <div>
        <h1 className="text-xl font-bold">New Courses</h1>
        <div className="scroll-container">
          {data.slice(0, 3).map((course) => (
            <div className="">
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
      </div>
      <div className="mt-5">
        <h1 className="text-xl font-bold">My Courses</h1>
        <CourseTable />
      </div>
    </section>
  );
};

export default StudentDashBoard;
