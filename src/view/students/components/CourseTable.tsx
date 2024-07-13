import { ReactNode } from "react";
import Table from "../../../components/DataTable";
import { EnrolledCourse } from "../../../types";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const data: EnrolledCourse[] = [
  {
    studentId: "123e4567-e89b-12d3-a456-426614174000",
    courseId: "668d79ba3bfd352ff3e3899d",
    status: "1",
    studentDetails: {
      _id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Jane Smith",
      email: "jane@gmail.com",
      profilePic:
        "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
      createdAt: "2024-07-01T12:00:00.000Z",
      updatedAt: "2024-07-01T12:00:00.000Z",
    },
    educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
    educatorDetails: {
      _id: "61035436-4e1d-4e7b-b102-31e0304d13ea",
      name: "Dr. John Doe",
      email: "john@gmail.com",
      profilePic: "https://example.com/images/dr-john-doe.jpg",
      createdAt: "2024-06-15T09:30:00.000Z",
      updatedAt: "2024-06-15T09:30:00.000Z",
    },

    courseDetails: {
      educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
      educatorDetails: {
        _id: "61035436-4e1d-4e7b-b102-31e0304d13ea",
        name: "Dr. John Doe",
        email: "john@gmail.com",
        profilePic: "https://example.com/images/dr-john-doe.jpg",
        createdAt: "2024-06-15T09:30:00.000Z",
        updatedAt: "2024-06-15T09:30:00.000Z",
      },
      title: "Introduction to Artificial Intelligence",
      description:
        "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
      thumbnail:
        "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
      price: 1999.99,
      duration: 20,
      totalEnrollment: 0,
      totalSession: 2,
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
      ],
      status: "1",
      rating: 4.5,
      createdAt: "2024-07-09T17:56:10.520Z",
      updatedAt: "2024-07-09T17:56:10.520Z",
    },
  },
  {
    studentId: "123e4567-e89b-12d3-a456-426614174000",
    courseId: "668d79ba3bfd352ff3e3899d",
    status: "1",
    studentDetails: {
      _id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Jane Smith",
      email: "jane@gmail.com",
      profilePic:
        "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
      createdAt: "2024-07-01T12:00:00.000Z",
      updatedAt: "2024-07-01T12:00:00.000Z",
    },
    educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
    educatorDetails: {
      _id: "61035436-4e1d-4e7b-b102-31e0304d13ea",
      name: "Dr. John Doe",
      email: "john@gmail.com",
      profilePic: "https://example.com/images/dr-john-doe.jpg",
      createdAt: "2024-06-15T09:30:00.000Z",
      updatedAt: "2024-06-15T09:30:00.000Z",
    },

    courseDetails: {
      educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
      educatorDetails: {
        _id: "61035436-4e1d-4e7b-b102-31e0304d13ea",
        name: "Dr. John Doe",
        email: "john@gmail.com",
        profilePic: "https://example.com/images/dr-john-doe.jpg",
        createdAt: "2024-06-15T09:30:00.000Z",
        updatedAt: "2024-06-15T09:30:00.000Z",
      },
      title: "Introduction to Artificial Intelligence",
      description:
        "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
      thumbnail:
        "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
      price: 1999.99,
      duration: 20,
      totalEnrollment: 0,
      totalSession: 2,
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
      ],
      status: "1",
      rating: 4.5,
      createdAt: "2024-07-09T17:56:10.520Z",
      updatedAt: "2024-07-09T17:56:10.520Z",
    },
  },
  {
    studentId: "123e4567-e89b-12d3-a456-426614174000",
    courseId: "668d79ba3bfd352ff3e3899d",
    status: "1",
    studentDetails: {
      _id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Jane Smith",
      email: "jane@gmail.com",
      profilePic:
        "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
      createdAt: "2024-07-01T12:00:00.000Z",
      updatedAt: "2024-07-01T12:00:00.000Z",
    },
    educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
    educatorDetails: {
      _id: "61035436-4e1d-4e7b-b102-31e0304d13ea",
      name: "Dr. John Doe",
      email: "john@gmail.com",
      profilePic: "https://example.com/images/dr-john-doe.jpg",
      createdAt: "2024-06-15T09:30:00.000Z",
      updatedAt: "2024-06-15T09:30:00.000Z",
    },

    courseDetails: {
      educatorId: "61035436-4e1d-4e7b-b102-31e0304d13ea",
      educatorDetails: {
        _id: "61035436-4e1d-4e7b-b102-31e0304d13ea",
        name: "Dr. John Doe",
        email: "john@gmail.com",
        profilePic: "https://example.com/images/dr-john-doe.jpg",
        createdAt: "2024-06-15T09:30:00.000Z",
        updatedAt: "2024-06-15T09:30:00.000Z",
      },
      title: "Introduction to Artificial Intelligence",
      description:
        "This course provides a comprehensive introduction to the field of Artificial Intelligence, including topics such as machine learning, neural networks, and natural language processing.",
      thumbnail:
        "https://nearlearn.com/public/images/ai-training-in-bangalore.jpeg",
      price: 1999.99,
      duration: 20,
      totalEnrollment: 0,
      totalSession: 2,
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
      ],
      status: "1",
      rating: 4.5,
      createdAt: "2024-07-09T17:56:10.520Z",
      updatedAt: "2024-07-09T17:56:10.520Z",
    },
  },
];

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
    accessorKey: "educatorDetails.name",
    header: "Educator",
    cell: (cell) => {
      return (
        <div className="flex gap-2">
          <img
            src={cell.row.original.studentDetails.profilePic}
            alt={cell.row.original.studentDetails.name}
            className="w-10 h-10 rounded-full"
          />
          <span>{cell.getValue() as ReactNode}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
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
  {
    accessorKey: "courseDetails.status",
    header: "Status",
    cell: (cell) => {
      return cell.getValue() === "1" ? "Active" : "Inactive";
    },
  },
  {
    accessorKey: "cour",
    header: "Action",
    cell: (cell) => {
      return (
        <div>
          <Link
            state={{
              course: cell.row.original.courseDetails,
            }}
            to={`/student/courses/${cell.row.original.courseId}`}
            className="text-blue-500"
          >
            View Course
          </Link>
        </div>
      );
    },
  },
];

const CourseTable = () => {
  // const [courseId, setCourseId] = useState<string | null>(null);

  return (
    <div>
      <div className="table-wrapper">
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};

export default CourseTable;
