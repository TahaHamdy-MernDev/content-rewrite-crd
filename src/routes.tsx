import { useRoutes, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import React, { Suspense } from "react";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

const Login = React.lazy(() => import("./pages/Login"));
const Main = React.lazy(() => import("./pages/Main"));
const Users = React.lazy(() => import("./pages/Users"));
const UserHistory = React.lazy(() => import("./pages/UserHistory"));
const Plans = React.lazy(() => import("./pages/Plans"));

export const LoadingSpinner = () => {
  return (
    <Center
      position={"absolute"}
      top={"0"}
      left={"0"}
      h="100svh"
      w={"100svw"}
      bg={"white"}
    >
      <VStack spacing={4}>
        <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
        <Text fontSize="lg" fontWeight="bold">
          Loading...
        </Text>
      </VStack>
    </Center>
  );
};

const Routes = () => {
  const routes = [
    { path: "/login", element: <Login /> },
    {
      path: "/crd",
      element: <MainLayout />,
      children: [
        { index: true, element: <Main /> },
        { path: "users", element: <Users /> },
        { path: "user-history/:id", element: <UserHistory /> },
        { path: "plans", element: <Plans /> },
        { path: "*", element: <Navigate to="/login" /> },
      ],
    },
    { path: "*", element: <Navigate to="/login" /> },
  ];
  const routing = useRoutes(routes);

  return <Suspense fallback={<LoadingSpinner />}>{routing}</Suspense>;
};
export default Routes;
