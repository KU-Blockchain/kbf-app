"use client";
import React, { useState } from 'react';
import { Heading, Box, Flex, Center, Text, HStack, Button } from '@chakra-ui/react';
import Login from './components/Login.jsx';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <Flex h="100vh" bgGradient="linear(to-r, orange.500, pink.500)">
      <Center w="100%">
        <Box>
          <Heading as="h1" size="2xl">Welcome to KBF Portal</Heading>
          <Text fontSize="xl" mt="4">Get started by logging in with Heirloom</Text>
          <HStack mt="8">
            <Button onClick={openModal} colorScheme="blue">Heirloom Quicklogin</Button>
          </HStack>
        </Box>
      </Center>
      <Login isOpen={isModalOpen} onClose={closeModal} />
    </Flex>
  );
}
