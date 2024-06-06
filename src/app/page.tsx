"use client";
import React, { useState, useEffect } from 'react';
import { Heading, Box, Flex, Center, Text, HStack, Button, useBreakpoint } from '@chakra-ui/react';
import Login from './components/Login.jsx';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <Flex h="100vh" bgGradient="linear(to-r, orange.500, pink.500)">
      {!isMobile && (
      <Center w="100%">
        <Box>
          <Heading as="h1" size="2xl">Welcome to KBF Portal</Heading>
          <Text fontSize="xl" mt="4">Get started by logging in with Heirloom</Text>
          <HStack mt="8">
            <Button onClick={openModal} colorScheme="blue">Heirloom Quicklogin</Button>
          </HStack>
        </Box>
        <Login isOpen={isModalOpen} onClose={closeModal} />
      </Center>
      )}
      {isMobile && (
      <Center p={6} w="100%">
        <Box>
          <Heading as="h1" size="xl">Welcome to KBF Portal</Heading>
          <Text fontSize="lg" mt="4">Sorry, this application is not meant to be served on mobile devices. Try logging in on a laptop.</Text>
        </Box>
      </Center>
      )}
    </Flex>
  );
}
