import { Box, useToast } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useEffect } from "react";
import Api from "../Api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUsers,
  filterUsers,
  resetFilter,
  usersFastSearch,
} from "../features/usersSlice";
import { LoadingSpinner } from "../routes";
import { useNavigate } from "react-router-dom";

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

export default function UsersMain() {
  const dispatch = useAppDispatch();
  const { userArr, loading, error } = useAppSelector((state) => state.users);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = async ({ _id, Email }: Partial<User>) => {
    try {
      await Api.delete(`/user/${_id}`);
      dispatch(fetchUsers());
      toast({
        status: "success",
        title: "Successful Deletion",
        description: `You have successfully deleted ${Email} from Users.`,
      });
    } catch (err: any) {
      toast({
        status: "error",
        title: "Failure Deletion",
        description: err.message as string,
      });
    }
  };

  const handlePrimarySearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      dispatch(resetFilter());
    } else {
      dispatch(usersFastSearch(searchTerm));
    }
  };

  const handleSecondarySearch = (secondarySearchTerm: string) => {
    console.log(secondarySearchTerm);
    if (secondarySearchTerm.trim() === "") {
      dispatch(resetFilter());
    } else {
      dispatch(filterUsers(secondarySearchTerm));
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
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
            <span className="mx-1">delete</span>
          </div>
        );
      },
    },
    {
      name: "History",
      cell: (row: User) => {
        return (
          <div
            className="cursor-pointer bg-green-500 text-[#fff] p-1 rounded-lg px-2"
            onClick={() => navigate(`/crd/user-history/${row._id}`)}
          >
            <span className="mx-1">show</span>
          </div>
        );
      },
    },
  ];

  const ExpandedComponent = ({ data }: ExpanderComponentProps<User>) => (
    <div className="collapse-container flex flex-col md:flex-row justify-between pl-4">
      <div className="current-plan mb-4 md:mb-0 md:w-1/3">
        <h2 className="plan-title font-bold text-green-400">Current Plan</h2>
        <p>
          <span className="label text-blue-600">ID: </span>
          {data?.PlanId?._id}
        </p>
        <p>
          <span className="label text-blue-600">Credits: </span>
          {data?.PlanId?.Credits}
        </p>
        <p>
          <span className="label text-blue-600">Months: </span>
          {data?.PlanId?.Months}
        </p>
        <p>
          <span className="label text-blue-600">Type: </span>
          {data?.PlanId?.Type}
        </p>
      </div>
      <div className="update-plan mb-4 md:mb-0 md:w-1/3 flex flex-col">
        <h2 className="plan-title font-bold text-green-400">Update Plan</h2>
        <button className="bg-blue-400 hover:bg-blue-500 text-white rounded w-40">
          Click to Choose Plan
        </button>
      </div>
      <div className="plan-history md:w-1/3">
        <h2 className="font-bold text-green-400">Plan History</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black">Plan Id</th>
              <th className="border border-black">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.PlanHistory.map((term: any, idx) => (
              <tr key={idx + 1}>
                <td className="border border-black text-center font-bold text-blue-500">
                  {term?.PlanId}
                </td>
                <td className="border border-black text-center font-bold text-blue-500">
                  {new Date(term?.Date)
                    .toISOString()
                    .replace("T", " / ")
                    .replace("Z", "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <Box>
      <PageHeader
        pageName="users"
        onPrimarySearch={handlePrimarySearch}
        onSecondarySearch={handleSecondarySearch}
        button={false}
        modalType={"user"}
      />
      <DataTable
        className={"mt-5"}
        pagination
        paginationServer
        columns={columns}
        data={userArr}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </Box>
  );
}
