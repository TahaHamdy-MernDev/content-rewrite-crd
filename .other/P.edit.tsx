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
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

interface PageHeaderProps {
    pageName: string;
    onPrimarySearch: (searchTerm: string) => Promise<void>;
    onSecondarySearch: (secondarySearchTerm: string) => Promise<void>;
    onOpenModal: () => void;
    button: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({
    pageName,
    onPrimarySearch,
    onSecondarySearch,
    onOpenModal,
    button = true
}) => {
    const [primarySearchTerm, setPrimarySearchTerm] = useState("");
    const [secondarySearchTerm, setSecondarySearchTerm] = useState("");
    const theme = useTheme();

    const handlePrimarySearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPrimarySearchTerm(event.target.value);
        },
        []
    );

    const handleSecondarySearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSecondarySearchTerm(event.target.value);
            if (secondarySearchTerm.trim()) {
                onSecondarySearch(secondarySearchTerm.trim());
            }
        },
        [onSecondarySearch, secondarySearchTerm]
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
                        size="md"
                        borderRadius="lg"
                        border="3px solid"
                        borderColor="brand.primary"
                    >
                        <Input
                            outline="none"
                            boxShadow="none"
                            pr="2.8rem"
                            placeholder="Search..."
                            value={primarySearchTerm}
                            pl={1}
                            type="search"
                            onChange={handlePrimarySearchChange}
                            onKeyDown={handleKeyPress}
                            borderRadius="md"
                            border="none"
                            _focusVisible={{ boxShadow: "none" }}
                            _hover={{ border: "none" }}
                        />
                        <InputRightElement width="2.5rem">
                            <IconButton
                                h="100%"
                                size="md"
                                w="100%"
                                onClick={handlePrimarySearch}
                                aria-label="Search"
                                icon={<IoIosSearch size={22} />}
                                bg="brand.primary"
                                color="white"
                                _hover={{ bg: "brand.primary", opacity: 0.8 }}
                                borderRightRadius="sm"
                                borderLeftRadius="none"
                            />
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Flex>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                bg="brand.primary"
                p={3}
                borderRadius="md"
                mt={4}
            >
                <Box width="260px">
                    <InputGroup size="md">
                        <Input
                            type="search"
                            placeholder="Secondary Search..."
                            value={secondarySearchTerm}
                            onChange={handleSecondarySearchChange}
                            bg="white"
                            borderRadius="md"

                        />

                    </InputGroup>
                </Box>
                {button && (
                    <Button

                        onClick={onOpenModal}
                        colorScheme="whiteAlpha"
                        variant="solid"
                    >
                        add
                    </Button>
                )

                }

            </Flex>
        </Box>
    );
};

export default PageHeader;