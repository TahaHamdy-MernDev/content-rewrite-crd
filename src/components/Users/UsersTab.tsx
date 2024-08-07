import { useEffect, useState } from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import Api from "../../Api";
import { useToast } from "@chakra-ui/react";

export interface User {
  _id: string;
  Email: string;
  Password: string;
  Usage: number;
  OAuthId: string;
  PlanHistory: Array<{
    PlanId: string;
    Date: string;
  }>;
  ExpiryDate: string;
  Confirmed: boolean;
  PlanId: {
    _id: string;
    Credits: number;
    Users: string[];
    Type: string;
    Months: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ExpandedComponent = ({ data }: ExpanderComponentProps<User>) => (
  <div className="p-4">
    <h4 className="font-bold mb-2">Details:</h4>
    <p><strong>Email:</strong> {data.Email}</p>
    <p><strong>Usage:</strong> {data.Usage}</p>
    <p><strong>OAuth ID:</strong> {data.OAuthId}</p>
    <p><strong>Confirmed:</strong> {data.Confirmed ? "Yes" : "No"}</p>
    <p><strong>Plan ID:</strong> {data.PlanId._id}</p>
    <p><strong>Plan Type:</strong> {data.PlanId.Type}</p>
    <p><strong>Credits:</strong> {data.PlanId.Credits}</p>
    <p><strong>Expiry Date:</strong> {new Date(data.ExpiryDate).toLocaleDateString()}</p>
    <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleDateString()}</p>
    <p><strong>Updated At:</strong> {new Date(data.updatedAt).toLocaleDateString()}</p>
    <p><strong>Plan History:</strong></p>
    <ul>
      {data.PlanHistory.map((plan) => (
        <li key={plan.PlanId}>{plan.PlanId} (Date: {new Date(plan.Date).toLocaleDateString()})</li>
      ))}
    </ul>
  </div>
);

export default function UsersTab() {
  const [userArr, setUserArr] = useState<User[]>([]);
  const toast = useToast();

  const handleDeleteUser = async ({ _id, Email }: Partial<User>) => {
    try {
      const res = await Api.delete(`/user/${_id}`);
      console.log("Delete User", res.data);

      setUserArr((u) => u.filter((ele) => ele._id !== _id));
      toast({
        status: "success",
        title: "Successful Deletion",
        description: `You have successfully deleted ${Email} from Users.`,
      });
    } catch (err: any) {
      toast({
        status: "error",
        title: "Failure Deletion",
        description: err.message,
      });
    }
  };

  const fetchUsers = async () => {
    const res: any = await Api.get("/user/all");
    return res.data.data;
  };

  useEffect(() => {
    fetchUsers().then((arr: User[]) => {
      setUserArr(arr);
    });
  });

  const columns = [
    {
      name: "ID",
      selector: (row: User) => row._id,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: User) => row.Email,
      sortable: true,
    },
    {
      name: "Available Credits",
      selector: (row: User) => row.PlanId.Credits,
      sortable: true,
    },
    {
      name: "Expiry",
      selector: (row: User) => new Date(row.ExpiryDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Joined In",
      selector: (row: User) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: User) => {
        return (
          <div
            className="cursor-pointer bg-red-500 text-[#fff] p-1 rounded-lg px-2"
            onClick={() => handleDeleteUser(row)}
          >
            <i className="fas fa-trash "></i>
            <span className="mx-1">delete</span>
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
        data={userArr}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
}
