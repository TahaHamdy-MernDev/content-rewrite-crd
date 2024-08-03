import React, { useState, useCallback } from 'react';
import {
    Box,
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    useTheme
} from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';

interface PageHeaderProps {
    pageName: string;
    onSearch: (searchTerm: string) => Promise<void>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageName, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const theme = useTheme();

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim());
        }
    }, [searchTerm, onSearch]);

    const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }, [handleSearch]);

    return (
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">
                Welcome to <span style={{ color: theme.colors.brand.primary }}>{pageName}</span> page
            </Text>
            <Box width="260px">
                <InputGroup size="md" borderRadius="lg" border="3px solid" borderColor="brand.primary">
                    <Input
                    outline={'none'}
                    boxShadow={'none'}
                        pr="2.8rem"
                        placeholder="Search..."
                        value={searchTerm}
                        pl={1}
                        type="search"
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress}
                        borderRadius="md"
                        border={'none'}
                        _focusVisible={{ boxShadow: `none` }}
                        _hover={{ border: 'none' }}
                    />
                    <InputRightElement width="2.5rem">
                        <IconButton
                            h="100%"
                            size="md"
                            w="100%"
                            onClick={handleSearch}
                            aria-label="Search"
                            icon={<IoIosSearch size={22} />}
                            bg="brand.primary"
                            color="white"
                            _hover={{ bg: 'brand.primary', opacity: 0.8 }}
                            borderRightRadius="sm"
                            borderLeftRadius="none"
                        />
                    </InputRightElement>
                </InputGroup>
            </Box>
        </Flex>
    );
};

export default PageHeader;
// import React, { useState } from 'react';
// import {
//     Box,
//     Flex,
//     Text,
//     Input,
//     InputGroup,
//     InputRightElement,
//     IconButton,
//     HStack,
//     InputLeftElement
// } from '@chakra-ui/react';
// import { IoIosClose, IoIosSearch } from 'react-icons/io';

// interface PageHeaderProps {
//     pageName: string;
//     onSearch: (searchTerm: string) => Promise<void>;
//     onResetSearch: () => void;
// }

// const PageHeader: React.FC<PageHeaderProps> = ({ pageName, onSearch }) => {
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleSearch = () => {
//         if (searchTerm) {
//             onSearch(searchTerm);
//         }
//     };

//     const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             handleSearch();
//         }
//     };

//     return (
//         <Flex justifyContent="space-between" alignItems="center" mb={4}>
//             <Text fontSize="lg" fontWeight="bold">
//                 Welcome to <span className='text-[#0077cc]'>{pageName}</span> page
//             </Text>
//             <Box width="250px">
//                 <InputGroup size="md" borderRadius={'md'} border={'3px'} borderColor={'brand.primary'} >
//                     <InputRightElement width="3rem">
//                         <IconButton
//                             h="2.5rem"
//                             size="sm"
//                             w={'100%'}
//                             onClick={handleSearch}
//                             aria-label="Search"
//                             icon={<IoIosSearch size={22} />}
//                             bg="brand.primary"
//                             color="white"
//                             _hover={{ bg: 'brand.primary', color: 'white' }}
//                             borderRightRadius="md"
//                             borderLeftRadius="none"
//                         />
//                     </InputRightElement>
//                     <Input
//                         pr="3rem"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         type='search'
//                         _focusVisible={{ border: '3px solid #0077cc' }}
//                         _hover={{ border: '3px solid #0077cc' }}
//                         border={'3px'}
//                         borderStyle={'solid'}
//                         borderColor={'#0077cc'}

//                         onChange={handleSearchChange}
//                         onKeyDown={handleKeyPress}
//                         borderRadius="md"
//                     />
//                 </InputGroup>
//             </Box>
//         </Flex>
//     );
// };

// export default PageHeader;