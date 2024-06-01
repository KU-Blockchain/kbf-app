"use client";
import React, { useState } from "react";
import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, VStack, Card, CardHeader, CardBody } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

let walletAddresses = {
    "Micah": "0xe6044748452024AC2BAa92A13d339754f80897C6",
};

const Portal = () => {
    const { firstName, lastName, email } = useAuth();
    const [walletAddress, setWalletAddress] = React.useState("");

    const handleWalletAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWalletAddress(event.target.value);
    };

    const handleSubmit = () => {
        if (firstName) {
            walletAddresses[firstName] = walletAddress;
        }
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <Flex m={6} mx={10}>
                <VStack>
                    <Heading>This is the entrance to the world...</Heading>
                    <Heading>{`Welcome, ${firstName || 'firstName'} ${lastName || 'lastName'}!`}</Heading>
                    <Heading>{`Email: ${email || 'email'}`}</Heading>
                    <Box bg="gray">
                        <FormControl isRequired>
                            <FormLabel>Input Your Wallet Address</FormLabel>
                            <Input placeholder='Wallet Address (0x23F1829267b4d3Ad4a8eEC275eBB940b47930F87)' onChange={handleWalletAddressChange} />
                            <Button colorScheme='blue' mt={4} onClick={handleSubmit}>Submit</Button>
                        </FormControl>
                    </Box>
                    <Box>
                        {Object.entries(walletAddresses).map(([name, address]) => (
                            <Card key={name}>
                                <CardBody>
                                    <CardHeader>{name}</CardHeader>
                                    <Box>
                                        <Text>{address}</Text>
                                    </Box>
                                </CardBody>
                            </Card>
                        ))}
                    </Box>
                </VStack>
            </Flex>
        </ProtectedRoute>
    );
}

export default Portal;
