"use client";
import React, { useState } from "react";
import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, VStack, Card, CardHeader, CardBody } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const Portal = () => {
    const { firstName, lastName, email } = useAuth();

    return (
        <ProtectedRoute>
            <Navbar />
            <Flex m={6} mx={10}>
                <VStack>
                    <Box bg="gray">
                        <Heading>{`Hello, ${firstName || 'firstName'} ${lastName || 'lastName'}!`}</Heading>
                        <Text>This is the entrance to the world...</Text>
                    </Box>
                    <Heading>{`Email: ${email || 'email'}`}</Heading>
                </VStack>
            </Flex>
        </ProtectedRoute>
    );
}

export default Portal;
