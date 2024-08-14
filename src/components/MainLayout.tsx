import React, { useEffect } from 'react';
import { Box, Link, IconButton, useDisclosure, useColorModeValue, Drawer, DrawerContent, DrawerCloseButton, DrawerBody, VStack, HStack, Icon, Text, Spacer, Button, Flex } from '@chakra-ui/react';
import { IoMenu } from 'react-icons/io5';
import { FaClipboardList, FaSignOutAlt, FaUserCog, FaUsers } from 'react-icons/fa';
import { useLocation, Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import CookiesService from '../services/CookiesService';
import { useAppDispatch } from '../store/hooks';
import { logout, setData } from '../features/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Layout: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
	const token = CookiesService.get("authToken");
    const btnRef = React.useRef<HTMLButtonElement>(null);
 	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { data } = useSelector((state: RootState) => state.auth);

    const sidebarColor = useColorModeValue('white', 'gray.800');

    const linkItems = [
        { href: '/crd', label: 'Admins', icon: FaUserCog },
        { href: '/crd/users', label: 'Users', icon: FaUsers },
        { href: '/crd/plans', label: 'Plans', icon: FaClipboardList },
    ];

	useEffect(()=>{
		if (!token) {
			navigate('/login');
		}
	}, [token])

	useEffect(()=>{
		if (!Object.keys(data || {}).length) {
			dispatch(setData(token));
		}
	}, [data])

    const location = useLocation()

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	}

    return (
        <Box minH="100vh" position="relative">
            <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'} position="relative" p="4">
                <IconButton
                    ref={btnRef}
                    icon={<IoMenu size={22} />}
                    onClick={onOpen}
                    rounded={'full'}
                    size='sm'
                    zIndex="overlay"
                    aria-label="Open Menu"
                    variant="outline"
                    color={'white'}
                    bg={'brand.primary'}
                    _hover={{ color: 'brand.primary', bg: 'white', shadow: 'md' }}
                />
                <Flex wrap={'nowrap'} gap={1} justifyContent={'center'} alignItems={'center'}>
                    <Text fontSize={'md'}> Welcome </Text>
                    <Text fontSize={'lg'} fontWeight={'600'} color={'brand.primary'} textDecoration={'underline'} textDecorationColor={'brand.primary'}>{data.Name}</Text>
                </Flex>
            </Flex>

            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
                size={'xs'}

            >
                <DrawerContent bg={'brand.primary'} color={sidebarColor}>
                    <DrawerCloseButton />
                    <DrawerBody display="flex" flexDirection="column" pt="12">
                        <VStack spacing={4} align="stretch" flex={1}>
                            {linkItems.map((item) => (
                                <Link
                                    as={RouterLink}
                                    onClick={onClose}
                                    to={item.href}
                                    key={item.href}
                                    _hover={{ bg: 'white', color: 'brand.primary', transform: 'auto', scale: 1.05, shadow: 'md' }}
                                    p={2}
                                    borderRadius="md"
                                    boxShadow={location.pathname === item.href ? 'lg' : ''}
                                    bg={location.pathname === item.href ? 'white' : 'inherit'}
                                    color={location.pathname === item.href ? 'brand.primary' : 'inherit'}
                                >
                                    <HStack justify="space-between" textTransform={'uppercase'} fontWeight={'600'}>
                                        <Text>{item.label}</Text>
                                        <Icon as={item.icon} />
                                    </HStack>
                                </Link>
                            ))}
                        </VStack>
                        <Spacer />
                        <Button
                            leftIcon={<FaSignOutAlt />}
                            variant="outline"
                            bg={'white'}
                            _hover={{ bg: 'blue.600', color: 'white', transform: 'auto', scale: 1.05, shadow: 'md' }}
                            mb={4}
							onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Main Content */}
            <Box as="main" px={{ base: 4, md: 10 }} pt="2">
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
