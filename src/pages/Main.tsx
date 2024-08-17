import { Box, useToast } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteAdmin, fastSearch, fetchAdmins } from "../features/adminSlice";
import { anCustomStyle } from "./Users";

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

export default function AdminsMain() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);

  const handlePrimarySearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const filterAdmins = (admins: Admin[], searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    return admins.filter((admin) =>
      admin.Name.toLowerCase().includes(term) ||
      admin.Email.toLowerCase().includes(term)
    );
  };

  const handleAdminAdded = () => {
    setRefreshFlag((prev) => !prev);
  };

  const handleOpenModal = () => {
    console.log("[Admin Modal Open]");
  };

  const dispatch = useAppDispatch();
  const { adminArr } = useAppSelector((state) => state.admin);
  const { _id: currStoreAdminId } = useAppSelector((state) => state.auth.data);
  const toast = useToast();

  useEffect(() => {
    if (searchTerm) {
      dispatch(fastSearch(searchTerm));
    } else {
      dispatch(fetchAdmins());
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [refreshFlag, dispatch]);

  useEffect(() => {
    setFilteredAdmins(adminArr);
  }, [adminArr]);

  const handleSecondarySearch = (secondarySearchTerm: string) => {
    if (secondarySearchTerm) {
      const filtered = filterAdmins(adminArr, secondarySearchTerm);
      setFilteredAdmins(filtered);
    } else {
      setFilteredAdmins(adminArr);
    }
  };

  const handleDeleteAdmin = async ({ _id, Name }: Partial<Admin>) => {
    try {
      await dispatch(deleteAdmin(_id as string)).unwrap();
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
      cell: (row: Admin) => (
        <div>
          {row._id === currStoreAdminId ? (
            <div className="ml-3 bg-blue-500 text-white rounded-xl py-1 px-2">You</div>
          ) : (
            <div
              className="cursor-pointer bg-red-500 text-[#fff] p-1 rounded-lg px-2"
              onClick={() => handleDeleteAdmin(row)}
            >
              <i className="fas fa-trash"></i>
              <span className="mx-1">delete</span>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        pageName="admins"
        onPrimarySearch={handlePrimarySearch}
        onSecondarySearch={handleSecondarySearch}
        button={true}
        onAdminAdded={handleAdminAdded}
        modalType="admin"
        onOpenModal={handleOpenModal}
         />
      <DataTable
        className={"mt-5"}
        pagination
        paginationServer
        columns={columns}
        data={filteredAdmins}
		customStyles={anCustomStyle}
      />
    </Box>
  );
}