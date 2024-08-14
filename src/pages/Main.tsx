import { Box } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import Admins from "../components/Admins/Admins";
import { useState } from "react";

export default function AdminsMain() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handlePrimarySearch = async (searchTerm: string) => {
    console.log("Primary search term:", searchTerm);
  };

  const handleSecondarySearch = async (secondarySearchTerm: string) => {
    console.log("Secondary search term:", secondarySearchTerm);
  };

  const handleAdminAdded = () => {
    setRefreshFlag((prev) => !prev);
  };
  
  const handleOpenModal = () => {
   	console.log("[Admin Modal Open]");
  };

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
      <Admins refreshFlag={refreshFlag} />
    </Box>
  );
}
