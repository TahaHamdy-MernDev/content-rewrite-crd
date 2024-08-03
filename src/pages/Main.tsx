import { Box } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";

export default function Main() {
  const handleSearch = async (searchTerm: string) => {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
    // You might want to call an API or update some state based on the search term
  };

  return (
    <Box>
      <PageHeader
        pageName="Users" onSearch={handleSearch}
      // fetchAction={fetchUsers}
      // resetAction={resetUsers}
      />
      {status === 'loading' && <div>Loading...</div>}
      {/* {status === 'failed' && <div>Error: {error}</div>} */}
      {/* {status === 'succeeded' && (
        // React Table component would go here
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )} */}
    </Box>
  )
}
