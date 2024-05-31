"use client";
import React from "react";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";

const Page = () => {
    const { isVerified, firstName, lastName, email } = useAuth();
    return (
        <Flex>
            <VStack>
                <Heading>This is the entrance to the world...</Heading>
                <Heading>{`Is verified: ${isVerified}`}</Heading>
                <Heading>{`Welcome, ${firstName} ${lastName}!`}</Heading>
                <Heading>{`Email: ${email}`}</Heading>
            </VStack>
        </Flex>
    );
}

export default Page;