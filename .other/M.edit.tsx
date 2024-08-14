import { Box } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";

export default function Main() {
  const handlePrimarySearch = async (searchTerm: string) => {
    console.log('Primary search term:', searchTerm);
  };

  const handleSecondarySearch = async (secondarySearchTerm: string) => {
    console.log('Secondary search term:', secondarySearchTerm);
  };

  const handleOpenModal = () => {
    console.log('Modal opened');
  };

  return (
    <Box>
      <PageHeader
        pageName="Users"
        onPrimarySearch={handlePrimarySearch}
        onSecondarySearch={handleSecondarySearch}
        onOpenModal={handleOpenModal} button={true} />
    </Box>
  );
}