"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, VStack, Card, CardHeader, CardBody, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useMetaMask } from "../contexts/MetaMaskContext";
import ProtectedRoute from "../components/ProtectedRoute";
import TypingEffect from "../components/TypingEffect";
import MintKBF from "../components/MintKBF";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WarningIcon } from "@chakra-ui/icons";


const Portal = () => {
    const { firstName, lastName, email } = useAuth();
    const { isMetaMaskInstalled, isWalletConnected, connectWallet, currentWalletAddress, addPolygonAmoy, checkIsOnChain } = useMetaMask();
    const [ metaMaskChecked, setMetaMaskChecked ] = useState(false);
    
    const checkMetaMask = () => {
        if (isMetaMaskInstalled) {
            setMetaMaskChecked(true);
        }
    };

    const mintKbfRef = useRef(null);

    const handleMint = () => {
        if (mintKbfRef.current) {
        mintKbfRef.current.handleSubmit();
        }
    };

    const handleConnectWallet = () => {
        connectWallet();
        if (!checkIsOnChain()) {
            console.log("Not on Polygon chain");
            addPolygonAmoy();
        }
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <Flex m={6} mx={10}>
                <Box w="40%">
                    <Heading py={4}>{`Hello, ${firstName || 'firstName'}!`}</Heading>
                    <Text fontSize="md">Welcome to the Kansas Blockchain Institute Experimental Decentralized Application (dApp). This application is designed to immerse you into the web3 world through short interactive activities.</Text>
                    <Text py={4} fontSize="md">
                        <TypingEffect text="Firstly, let&apos;s check if you have MetaMask:" />
                    </Text>
                    {!metaMaskChecked && (
                        <Popover>
                        <PopoverTrigger>
                            <Button
                            onClick={checkMetaMask}
                            colorScheme={'blue'}
                            variant={'solid'}
                            _hover={{
                            bg: 'blue.300',
                            }}
                            mx="auto"
                            display="block"
                            transition="0.3s"
                            >
                                Check MetaMask
                            </Button>
                        </PopoverTrigger>
                        {!metaMaskChecked && (
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader fontSize="md"><WarningIcon /> MetaMask Required</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Text fontSize="md">It appears that you don&apos;t have MetaMask wallet installed on your browser. Please download it to continue.</Text>
                                <Button as="a" href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
                                    Download MetaMask
                                </Button>
                            </PopoverBody>
                          </PopoverContent>
                        )}
                      </Popover>
                    )}
                    {metaMaskChecked && (
                        <Box mx={12} bg="blue.200" borderRadius='lg'>
                            <Text textAlign="center" fontSize="md">Success! MetaMask is installed.</Text>
                        </Box>
                    )}
                </Box>

                {metaMaskChecked && (
                <Box p={4} w="60%" transition="0.3s">
                    <Text py={4} fontSize="md">
                        <TypingEffect text="Perfect! Wallets are critical to your digital identity in the web3 world. Now that we know you have a wallet, you can go ahead and connect it here:" />
                    </Text>
                    {!isWalletConnected && (
                    <Button
                        onClick={handleConnectWallet}
                        colorScheme={'blue'}
                        variant={'solid'}
                        _hover={{
                        bg: 'blue.300',
                        }}
                        mx="auto"
                        display="block"
                        >
                        Connect Wallet
                    </Button>
                    )}
                    {isWalletConnected && (
                        <Box>
                            <Box mx={12} bg="blue.200" borderRadius='lg'>
                                <Text textAlign="center" fontSize="md">Success! Your wallet (with an address of {currentWalletAddress}) is connected.</Text>
                            </Box>
                            <Text py={4} fontSize="md" textAlign="left">
                                <TypingEffect text="For this demo, we are using the Polygon Amoy Testnet. Switching networks (or 'chains') is an automated process and you just need to accept the switch in the MetaMask UI." />
                            </Text>
                        </Box>
                    )}
                </Box>
                )}
            </Flex>
            <Box bg="blue.200" mx={10} p={4}>
                <Text textAlign="center" fontSize="md">
                    Hi.
                </Text>
                <MintKBF ref={mintKbfRef} />
                <Button
                    onClick={handleMint}
                    colorScheme={'blue'}
                    variant={'solid'}
                    _hover={{
                    bg: 'blue.300',
                    }}
                    mx="auto"
                    display="block"
                    >
                    Mint KBF NFT
                </Button>
            </Box>
            <Footer />
        </ProtectedRoute>
    );
}

export default Portal;
