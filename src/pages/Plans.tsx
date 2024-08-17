import { Box, useToast } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Plan } from "../interfaces/Plan";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deletePlan,
  fetchPlans,
  filterPlans,
  resetFilter,
  searchPlans,
} from "../features/planSlice";
import Api from "../Api";
import { anCustomStyle } from "./Users";


export default function PlansMain() {
  const dispatch = useAppDispatch();
  const { plans, loading } = useAppSelector((state) => state.plans);
  const toast = useToast();
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handlePrimarySearch = async (searchTerm: string) => {
    dispatch(searchPlans(searchTerm));
  };

  const handleSecondarySearch = async (secondarySearchTerm: string) => {
    if (secondarySearchTerm.trim() === "") {
      dispatch(resetFilter());
    } else {
      dispatch(filterPlans(secondarySearchTerm));
    }
  };

  const handleOpenModal = () => {
    console.log("[Plan Modal Open]");
  };

  const handlePlanAdded = () => {
    setRefreshFlag((prev) => !prev);
    dispatch(fetchPlans());
  };

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch, refreshFlag]);

  const handleDeletePlan = async ({ _id, Type }: Partial<Plan>) => {
    try {
      dispatch(deletePlan(_id));
	  await Api.delete(`/plan/${_id}`);
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
    <Box>
      <PageHeader
        pageName="plans"
        onPrimarySearch={handlePrimarySearch}
        onSecondarySearch={handleSecondarySearch}
        button={true}
        onPlanAdded={handlePlanAdded}
        modalType="plan"
        onOpenModal={handleOpenModal}
      />
      <DataTable
        className={"mt-5"}
        pagination
        paginationServer
        columns={columns}
        data={plans}
        expandableRows
        expandableRowsComponent={ExpandableRow}
        progressPending={loading}
		customStyles={anCustomStyle}
      />
    </Box>
  );
}
