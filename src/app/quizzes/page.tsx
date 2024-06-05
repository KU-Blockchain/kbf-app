"use client";
import React, { useState } from "react";
import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, VStack, Card, CardHeader, CardBody, Center } from "@chakra-ui/react";

import { useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Portal = () => {
    //const { firstName, lastName, email } = useAuth();

    return (
        <ProtectedRoute>
            <Navbar />
            <Flex h="70vh" m={6} mx={10}>
                <Center>
                    This page will show all of your quiz responses and feedback from them. Your quiz and the feedback will be minted to your wallet in the form of an encrypted non-fungible token (NFT). 
                </Center>
            </Flex>
            <Footer />
        </ProtectedRoute>
    );
}

export default Portal;
