"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Link, Button, Flex, Text, FormControl, FormLabel, Heading, Input, VStack, Card, CardHeader, CardBody, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter, Fade } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useMetaMask } from "../contexts/MetaMaskContext";
import ProtectedRoute from "../components/ProtectedRoute";
import TypingEffect from "../components/TypingEffect";
import MintKBF from "../components/MintKBF";
import AddNFT from "../components/AddNFT";
import NeedTokens from "../components/NeedTokens";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WarningIcon } from "@chakra-ui/icons";
import DelayedComponent from "../components/Delay";


const Portal = () => {
    const { firstName, lastName, email } = useAuth();
    const [ metaMaskChecked, setMetaMaskChecked ] = useState(false);
    const { isMetaMaskInstalled, isWalletConnected, connectWallet, currentWalletAddress, checkIsOnChain, checkKBFNFTOwnership, addNFTToMetaMask } = useMetaMask();

    useEffect(() => {
        checkMetaMask();
    }, [isMetaMaskInstalled]);

    const checkMetaMask = () => {
        if (isMetaMaskInstalled) {
            setMetaMaskChecked(true);
        }
    };

    const handleConnectWallet = async () => {
        await connectWallet();
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <Box textAlign="center" m={6} mx={10}>
                <Text textAlign="center" fontSize="xxxl" fontWeight="bold" mb={10}>
                    Hey, {firstName}!
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                    Welcome to the Kansas Blockchain Fellowship Portal! We&apos;ve updated our quizzes page and moved the NFT assignment over to <Link href="/nft_walkthrough">KBF NFT</Link>.
                </Text>
                {metaMaskChecked && (
                <Box p={4} transition="0.3s">
                    {!isWalletConnected ? (
                        <Button
                            onClick={handleConnectWallet}
                            colorScheme={'blue'}
                            variant={'outline'}
                            as={Link}
                            // _hover={{
                            // bg: 'blue.300',
                            // }}
                            mx="auto"
                            
                            >
                            Connect Wallet
                        </Button>
                    ) : (
                        <Box>
                            <Box mx={12} bg="blue.200" borderRadius='lg'>
                                <Text textAlign="center" fontSize="md">Success! Your wallet (with an address of {currentWalletAddress}) is connected.</Text>
                            </Box>
                        </Box>
                    )}
                </Box>
                )}
                <Text fontSize="lg" fontWeight="bold" mb={10}>
                    Check to see if you have your quiz graded <Link href="/quizzes">here</Link>.
                </Text>
            </Box>
            <Footer />
        </ProtectedRoute>
    );
}

export default Portal;
