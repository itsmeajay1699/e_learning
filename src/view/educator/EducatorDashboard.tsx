import { useEffect, useState } from "react";
import CourseTable from "../students/components/CourseTable";
import { ColumnDef } from "@tanstack/react-table";
import { CourseSession } from "@/types";
import Axios, { handleAction } from "@/utils";

const EducatorDashboard = () => {
  const [myCourses, setMyCourses] = useState<CourseSession[] | []>([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data } = await Axios.get(
          "http://localhost:5000/api/course/my-courses"
        );
        setMyCourses(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCourses();
  }, [refresh]);
  const colummn: ColumnDef<CourseSession>[] = [
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
      header: "Name",
      accessorKey: "educatorDetails.name",
      cell: (cell) => {
        return <span>{cell.row.original.educatorDetails.email}</span>;
      },
    },

    {
      header: "Course",
      accessorKey: "title",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: (cell) => {
        return (
          <span>{new Date(cell.row.original.createdAt).toDateString()}</span>
        );
      },
    },
    {
      header: "Total Enrolled",
      accessorKey: "totalEnrollment",
    },
    {
      header: "Total Completed",
      accessorKey: "totalComplete",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (cell) => {
        switch (cell.row.original.status) {
          case "2":
            return <span className="text-yellow-500">Course Pending</span>;
          case "1":
            return <span className="text-green-500">Course Live</span>;
          case "3":
            return <span className="text-red-500">Course Not Live</span>;
          default:
            return <span>{cell.row.original.status}</span>;
        }
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell) => {
        return (
          <button
            className="bg-blue-500 text-white p-2  px-6  rounded-md"
            onClick={async () => {
              await handleAction(
                cell.row.original.status,
                cell.row.original._id
              );
              setRefresh(!refresh);
            }}
          >
            {cell.row.original.status === "1" ? "Stop" : "Start"}
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <div
        className="bg-gray-200 p-4 flex items-start gap-4 rounded-lg shadow-md"
        style={{ height: "100px" }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVn20gDEs5CG_H0rBnJvuJWAVuK3B_wnC-tg&s"
          alt="profile pic"
          className="rounded-full h-20 w-20 object-cover"
        />
        <h1>Educator Name</h1>
      </div>

      <div className="mt-5">
        <h1 className="text-xl font-bold">My Courses</h1>
        <CourseTable
          columns={colummn as ColumnDef<object>[]}
          data={myCourses}
        />
      </div>
    </div>
  );
};

export default EducatorDashboard;
