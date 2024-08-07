import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Api from "../../Api";
import { useToast } from "@chakra-ui/react";
import { Plan } from "../../interfaces/Plan";

interface PlansProps {
  refreshFlag: boolean;
}

export default function Plans({ refreshFlag }: PlansProps) {
  const [planArr, setPlanArr] = useState<Plan[]>([]);
  const toast = useToast();

  const fetchPlans = async () => {
    const res: any = await Api.get("/plan");
    return res.data.data;
  };

  useEffect(() => {
    fetchPlans().then((arr: Plan[]) => {
      setPlanArr(arr);
    });
  }, [refreshFlag]);

  const handleDeletePlan = async ({ _id, Type }: Partial<Plan>) => {
    try {
      const res = await Api.delete(`/plan/${_id}`);
      console.log("Delete Plan", res.data);

      setPlanArr((a) => a.filter((ele) => ele._id !== _id));
      toast({
        status: "success",
        title: "Successful Deletion",
        description: `You have successfully deleted the ${Type} plan.`,
      });
    } catch (err: any) {
      toast({
        status: "error",
        title: "Failure Deletion",
        description: err.message,
      });
    }
  };

  const ExpandableRow = ({ data }: { data: Plan }) => (
    <div>
      <p>Users: {data.Users.join(", ")}</p>
      <p>Created At: {data.createdAt}</p>
      <p>Updated At: {data.updatedAt}</p>
    </div>
  );

  const columns = [
    {
      name: "ID",
      selector: (row: Plan) => row._id,
      sortable: true,
    },
    {
      name: "Credits",
      selector: (row: Plan) => `${row.Credits} words`,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: Plan) => row.Type,
      sortable: true,
    },
    {
      name: "Months",
      selector: (row: Plan) => row.Months,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Plan) => {
        return (
          <div>
            <div
              className="cursor-pointer bg-red-500 text-[#fff] p-1 rounded-lg px-2"
              onClick={() => handleDeletePlan(row)}
            >
              <i className="fas fa-trash "></i>
              <span className="mx-1">delete</span>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        className={"mt-5"}
        pagination
        paginationServer
        columns={columns}
        data={planArr}
        expandableRows
        expandableRowsComponent={ExpandableRow}
      />
    </div>
  );
}
