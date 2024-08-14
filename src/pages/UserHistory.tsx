import PageHeader from "../components/PageHeader";
import { Box, Collapse, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../routes";
import { getUserHistory, UserHistoryItem } from "../features/usersSlice";

const ExpandedComponent = ({
  data,
}: ExpanderComponentProps<UserHistoryItem>) => (
  <Box p={4}>
    <p>
      <strong>Original Post:</strong> {data.OriginalPost}
    </p>
    <p>
      <strong>Generated Post:</strong> {data.GeneratedPost}
    </p>
  </Box>
);

export default function UserHistory() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useAppDispatch();
  const { userHistory, loading } = useAppSelector((state) => state.users);
  const [filteredData, setFilteredData] = useState<UserHistoryItem[]>([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserHistory(id));
  }, [dispatch, id]);
  useEffect(() => {
    setFilteredData(userHistory);
  }, [userHistory]);

  const handleSecondarySearch = (secondarySearchTerm: string) => {
    if (secondarySearchTerm.trim() === "") {
      setFilteredData(userHistory);
    } else {
      const lowerCasedTerm = secondarySearchTerm.toLowerCase();
      const filteredResults = userHistory.filter(
        (item) =>
          item.OriginalPost.toLowerCase().includes(lowerCasedTerm) ||
          item.GeneratedPost.toLowerCase().includes(lowerCasedTerm)
      );
      setFilteredData(filteredResults);
    }
  };

  

  const columns = [
    {
      name: "ID",
      selector: (row: UserHistoryItem) => row._id,
      sortable: true,
    },
    {
      name: "Original Post:",
      selector: (row: UserHistoryItem) =>
        row.OriginalPost.split(" ").slice(0, 5).join(" "),
      sortable: false,
    },
    {
      name: "Generated Post:",
      selector: (row: UserHistoryItem) =>
        row.GeneratedPost.split(" ").slice(0, 5).join(" "),
      sortable: false,
    },
    {
      name: "Created At",
      selector: (row: UserHistoryItem) =>
        new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row: UserHistoryItem) =>
        new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ];
  if (loading) return <LoadingSpinner />;
  return (
    <Box>
      <PageHeader
        pageName="User History"
        onPrimarySearch={() => false}
        onSecondarySearch={handleSecondarySearch}
        button={false}
        modalType="user"
      />

      <DataTable
        className={"mt-5"}
        pagination
        paginationServer
        columns={columns}
        data={filteredData}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </Box>
  );
}
