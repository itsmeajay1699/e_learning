import { Outlet } from "react-router-dom";
import StudentSideBar from "./components/StudentSideBar";

const StudentHome = () => {
  return (
    <main className="flex gap-4 p-[1rem]">
      <div className="">
        <StudentSideBar />
      </div>
      <section className="md:ml-[280px] ml-[120px] flex-1">
        <Outlet />
      </section>
    </main>
  );
};

export default StudentHome;
