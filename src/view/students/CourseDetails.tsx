import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
// {
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

const CourseDetails = () => {
  const { courseId } = useParams();
  console.log(courseId);
  const location = useLocation();
  //   console.log(location.state.course);

  return (
    <section>
      <div>
        <div className="relative">
          <motion.img
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: "100%",
              transition: {
                duration: 0.5,
                type: "tween",
              },
            }}
            src={location.state.course.thumbnail}
            alt={location.state.course.title}
            className="w-full h-96 object-cover rounded-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 rounded-3xl"
          />
          <div className="md:absolute mt-6 md:top-[50%] max-w-full md:bottom-10  md:max-w-lg md:left-20 md:right-7 flex items-center md:justify-center">
            <div className="flex flex-col md:px-4 md:py-4 justify-between bg-white shadow-lg rounded-lg">
              <div>
                <h1 className="text-2xl font-semibold">
                  {location.state.course.title}
                </h1>
                <p className="text-gray-500">
                  {location.state.course.description}
                </p>
              </div>

              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mt-4">Course Details</h1>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Educator Details</h2>
            <p>{location.state.course.educatorDetails.name}</p>
            <p>{location.state.course.educatorDetails.bio}</p>

            <div>
              <h3 className="text-lg font-semibold mt-4">Contact</h3>
              <p>{location.state.course.educatorDetails.contact}</p>
            </div>

            <h2 className="text-xl font-semibold mt-4">Course Details</h2>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Sessions</h3>
              {location.state.course.sessionDetails.map((session: any) => (
                <div key={session.sessionNumber} className="mt-2">
                  <div>
                    <span className="text-sm text-gray-500">
                      Session {session.sessionNumber}
                    </span>
                    <h3 className="text-lg font-semibold">{session.title}</h3>
                  </div>
                  <p>{session.description}</p>
                </div>
              ))}

              <h3 className="text-lg font-semibold mt-4">Course Information</h3>

              <div className="mt-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-500">
                    Price: ${location.state.course.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Enrolled: {location.state.course.totalEnrollment}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-between mt-1">
                  <span className="text-sm text-gray-500">
                    Rating: {location.state.course.rating} ⭐
                  </span>
                  <span className="text-sm text-gray-500">
                    Duration: {location.state.course.duration} weeks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
