import { Box } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import UsersTab from "../components/Users/UsersTab";

export default function UsersMain() {


  const handlePrimarySearch = async (searchTerm: string) => {
    console.log("Primary search term:", searchTerm);
  };

  const handleSecondarySearch = async (secondarySearchTerm: string) => {
    console.log("Secondary search term:", secondarySearchTerm);
  };


  return (
    <Box>
      <PageHeader
        pageName="users"
        onPrimarySearch={handlePrimarySearch}
        onSecondarySearch={handleSecondarySearch}
        button={false}
		modalType={"user"}
      />
      <UsersTab></UsersTab>
    </Box>
  );
}
