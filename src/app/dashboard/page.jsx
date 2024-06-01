"use client";
import React from "react";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const Page = () => {
    const { isVerified, firstName, lastName, email } = useAuth();
    return (
        // <ProtectedRoute>
        <Flex>
            <Navbar />
            <VStack>
                <Heading>This is the entrance to the world...</Heading>
                <Heading>{`Is verified: ${isVerified}`}</Heading>
                <Heading>{`Welcome, ${firstName || 'firstName'} ${lastName || 'lastName'}!`}</Heading>
                <Heading>{`Email: ${email || 'email'}`}</Heading>
            </VStack>
        </Flex>
        // </ProtectedRoute>
    );
}

export default Page;