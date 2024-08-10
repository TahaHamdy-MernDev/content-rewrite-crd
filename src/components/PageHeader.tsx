import React, { useState, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useTheme,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import AddAdminModal from "../components/Modals/AddAdminModel";
import AddPlanModal from "../components/Modals/AddPlanModal";

interface PageHeaderProps {
  pageName: string;
  onPrimarySearch: (searchTerm: string) => void;
  onSecondarySearch: (searchTerm: string) => void;
  onOpenModal?: () => void;
  button: boolean;
  onAdminAdded?: () => void;
  onPlanAdded?: () => void;
  modalType: "admin" | "plan" | "user";
}

const PageHeader: React.FC<PageHeaderProps> = ({
  pageName,
  onPrimarySearch,
  onSecondarySearch,
  onOpenModal,
  button = true,
  onAdminAdded,
  onPlanAdded,
  modalType,
}) => {
  const [primarySearchTerm, setPrimarySearchTerm] = useState("");
  const [secondarySearchTerm, setSecondarySearchTerm] = useState("");
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePrimarySearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrimarySearchTerm(event.target.value);
    },
    []
  );
  const handleSecondarySearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSecondarySearchTerm(value);
      if (value.trim()) {
        onSecondarySearch(value.trim());
      } else {
        onSecondarySearch("");
      }
    },
    [onSecondarySearch]
  );

  const handlePrimarySearch = useCallback(() => {
    if (primarySearchTerm.trim()) {
      onPrimarySearch(primarySearchTerm.trim());
    }
  }, [primarySearchTerm, onPrimarySearch]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handlePrimarySearch();
      }
    },
    [handlePrimarySearch]
  );

  const handleClearPrimarySearch = () => {
    setPrimarySearchTerm("");
    onPrimarySearch("");
  };

  const handleAdminAdded = () => {
    onAdminAdded && onAdminAdded();
    onClose();
  };

  const handlePlanAdded = () => {
    onPlanAdded && onPlanAdded();
    onClose();
  };

  const handleOpenModal = () => {
    onOpenModal && onOpenModal();
    onOpen();
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Welcome to{" "}
          <span style={{ color: theme.colors.brand.primary }}>{pageName}</span>{" "}
          page
        </Text>
        <Box width="260px">
          <InputGroup
            display={pageName === "plans" ? "none" : "block"}
            size="md"
            borderRadius="lg"
            border="3px solid"
            borderColor="brand.primary"
            overflow={"hidden"}
          >
            <Input
              outline="none"
              boxShadow="none"
              pr="2.8rem"
              placeholder="Fast Search "
              value={primarySearchTerm}
              pl={1}
              type="text"
              onChange={handlePrimarySearchChange}
              onKeyDown={handleKeyPress}
              borderRadius="md"
              border="none"
              _focusVisible={{ boxShadow: "none" }}
              _hover={{ border: "none" }}
            />
            <InputRightElement width="5rem">
              <Flex
                h={"100%"}
                w={"100%"}
                alignItems={"flex-end"}
                justifyItems={"flex-start"}
              >
                <Box h={"100%"} w={"50%"}>
                  <IconButton
                    h="100%"
                    size="md"
                    w="100%"
                    opacity={primarySearchTerm ? "1" : "0"}
                    display={primarySearchTerm ? "flex" : "none"}
                    onClick={handleClearPrimarySearch}
                    aria-label="Clear"
                    icon={<IoMdClose size={22} />}
                    bg="transparent"
                    color="brand.primary"
                    // _hover={{ bg: "transparent", opacity: primarySearchTerm ? '0.8' : '0' }}
                    borderRightRadius="sm"
                    borderLeftRadius="none"
                  />
                </Box>

                <IconButton
                  h="100%"
                  size="md"
                  w={"50%"}
                  onClick={handlePrimarySearch}
                  aria-label="Search"
                  icon={<IoIosSearch size={22} />}
                  bg="brand.primary"
                  color="white"
                  _hover={{ bg: "brand.primary", opacity: 0.8 }}
                  borderRightRadius="sm"
                  borderLeftRadius="none"
                />
              </Flex>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="brand.primary"
        p={1.5}
        borderRadius="md"
        mt={4}
      >
        <Box width="270px">
          <InputGroup size="md">
            <Input
              type="text"
              placeholder="Search..."
              onChange={handleSecondarySearchChange}
              value={secondarySearchTerm}
              bg="white"
              borderRadius="md"
            />
          </InputGroup>
        </Box>
        {button && (
          <Button
            onClick={handleOpenModal}
            colorScheme="whiteAlpha"
            variant="solid"
          >
            Add
          </Button>
        )}
      </Flex>
      {modalType === "admin" && (
        <AddAdminModal isOpen={isOpen} onClose={handleAdminAdded} />
      )}
      {modalType === "plan" && (
        <AddPlanModal isOpen={isOpen} onClose={handlePlanAdded} />
      )}
    </Box>
  );
};

export default PageHeader;
