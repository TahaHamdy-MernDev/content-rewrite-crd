import {
    Flex,
    VStack,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useColorModeValue, useToast
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { login } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
interface FormValues {
    email: string;
    password: string;
}
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const toast = useToast()
    const dispatch = useAppDispatch();
    const formBgColor = useColorModeValue('white', 'gray.700');
    const authStatus = useAppSelector((state) => state.auth.status);
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log(data)
        console.log(authStatus)
        await dispatch(login(data)).unwrap().then((res) => {
            console.log(res)
        });
        toast({
            status: 'success',
            title: 'Login Successful',
            description: 'You have successfully logged in.',
        })
        console.log(data); // Log form data
    };

    return (
        <Flex minHeight="100vh" width="full">
            <Flex
                width={{ base: '100%', md: '50%' }}
                bg="gray.100"
                color="brand.primary"
                align="center"
                justify="center"
                display={{ base: 'none', md: 'flex' }}
            >
                <VStack spacing={8} maxWidth="400px" p={8}>
                    <Heading size="xl">Welcome Back!</Heading>
                </VStack>
            </Flex>

            <Flex
                width={{ base: '100%', md: '50%' }}
                bg={formBgColor}
                align="center"
                justify="center"
            >
                <VStack
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    spacing={8}
                    maxWidth="400px"
                    width="full"
                    rounded={'md'}
                    border={'1px'}
                    borderColor={'rgb(226 232 240)'}
                    p={8}
                    boxShadow="lg"
                >
                    <Flex width={'100%'} justifyContent={'start'}>
                        <Heading size="lg">Login</Heading>
                    </Flex>

                    <FormControl id="email" isInvalid={!!errors.email}>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="username"
                            size="lg"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.email?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="password" isInvalid={!!errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            size="lg"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            autoComplete="current-password"
                        />
                        <FormErrorMessage>
                            {errors?.password?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button colorScheme="blue" width="full" size="lg" isLoading={authStatus === "loading"} type="submit">
                        Sign In
                    </Button>
                </VStack>
            </Flex>
        </Flex>
    );
}
