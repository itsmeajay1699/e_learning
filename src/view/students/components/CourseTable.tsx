import { ColumnDef } from "@tanstack/react-table";
import Table from "../../../components/DataTable";

const CourseTable = <T extends object[], T1 extends ColumnDef<object>[]>({
  data,
  columns,
}: {
  data: T;
  columns: T1;
}) => {
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
