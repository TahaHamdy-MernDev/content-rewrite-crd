import { Box } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import Plans from "../components/Plans/PlansTab";
import { useState } from "react";

export default function PlansMain() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handlePrimarySearch = async (searchTerm: string) => {
    console.log("Primary search term:", searchTerm);
  };

  const handleSecondarySearch = async (secondarySearchTerm: string) => {
    console.log("Secondary search term:", secondarySearchTerm);
  };

  const handleOpenModal = () => {
	console.log("[Plan Modal Open]");
  };

  const handlePlanAdded = () => {
    setRefreshFlag((prev) => !prev);
  };

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
      <Plans refreshFlag={refreshFlag} />
    </Box>
  );
}
