import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Api from "../../Api";
import { useAppSelector } from "../../store/hooks";
import { useToast } from "@chakra-ui/react";

export interface Admin {
  _id: string;
  Name: string;
  Email: string;
  Role: "super_admin" | "admin";
  Password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AdminsProps {
  refreshFlag: boolean;
}

export default function Admins({ refreshFlag }: AdminsProps) {
  const [adminArr, setAdminArr] = useState<Admin[]>([]);
  const toast = useToast();
  const { _id: currStoreAdminId } = useAppSelector((state) => state.auth.data);

  const handleDeleteAdmin = async ({ _id, Name }: Partial<Admin>) => {
    try {
      const res = await Api.delete(`/admin/${_id}`);
      console.log("Delete Admin", res.data);

      setAdminArr((a) => a.filter((ele) => ele._id !== _id));
      toast({
        status: "success",
        title: "Successful Deletion",
        description: `You have successfully deleted ${Name} from Admins.`,
      });
    } catch (err: any) {
      toast({
        status: "error",
        title: "Failure Deletion",
        description: err.message,
      });
    }
  };

  const fetchAdmins = async () => {
    const res: any = await Api.get("/admin");
    return res.data.data;
  };

  useEffect(() => {
    fetchAdmins().then((arr: Admin[]) => {
      setAdminArr(arr);
    });
  }, [refreshFlag]);

  const columns = [
    {
      name: "ID",
      selector: (row: Admin) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Admin) => row.Name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Admin) => row.Email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: Admin) => row.Role,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Admin) => {
        return (
          <div>
            {row?._id === currStoreAdminId ? (
              <div className="ml-3 bg-blue-500 text-white rounded-xl py-1 px-2">
                You
              </div>
            ) : (
              <div
                className="cursor-pointer bg-red-500 text-[#fff] p-1 rounded-lg px-2"
                onClick={() => handleDeleteAdmin(row)}
              >
                <i className="fas fa-trash "></i>
                <span className="mx-1">delete</span>
              </div>
            )}
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
        data={adminArr}
      />
    </div>
  );
}
