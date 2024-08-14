import {
    Flex,
    VStack,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { login } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse } from '../../interfaces/Errors';

interface FormValues {
    Email: string;
    Password: string;
}

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const toast = useToast();
    const dispatch = useAppDispatch();
    const formBgColor = useColorModeValue('white', 'gray.700');
    const authStatus = useAppSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            console.log(data);

            const response = await dispatch(login(data)).unwrap();
            console.log(response);

            toast({
                status: 'success',
                title: 'Login Successful',
                description: 'You have successfully logged in.',
            });

            console.log(data);
            navigate('/crd');
        } catch (err: unknown) {
            const error = err as ErrorResponse;
            console.error("[ERROR] onSubmit failed: ", error.message);
            toast({
                status: 'error',
                title: 'Login Failed',
                description: error.message || 'An unexpected error occurred.',
            });
        }
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
                    rounded="md"
                    border="1px"
                    borderColor="rgb(226 232 240)"
                    p={8}
                    boxShadow="lg"
                >
                    <Flex width="100%" justifyContent="start">
                        <Heading size="lg">Login</Heading>
                    </Flex>

                    <FormControl id="email" isInvalid={!!errors.Email}>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="username"
                            size="lg"
                            {...register('Email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.Email && errors.Email.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="password" isInvalid={!!errors.Password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            size="lg"
                            {...register('Password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                                },
                            })}
                            autoComplete="current-password"
                        />
                        <FormErrorMessage>
                            {errors.Password && errors.Password.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button
                        colorScheme="blue"
                        width="full"
                        size="lg"
                        isLoading={authStatus === "loading"}
                        type="submit"
                    >
                        Sign In
                    </Button>
                </VStack>
            </Flex>
        </Flex>
    );
}
