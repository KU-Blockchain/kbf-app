"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Flex, Text, FormControl, FormLabel, Heading, Input, VStack, Card, CardHeader, CardBody, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter, Fade } from "@chakra-ui/react";
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


const NFT_Walkthrough = () => {
    const { firstName, lastName, email } = useAuth();
    const { isMetaMaskInstalled, isWalletConnected, connectWallet, currentWalletAddress, checkIsOnChain, checkKBFNFTOwnership, addNFTToMetaMask } = useMetaMask();
    const [ metaMaskChecked, setMetaMaskChecked ] = useState(false);
    const [ isNFTModalOpen, setIsNFTModalOpen] = useState(false);
    const [ isFaucetModalOpen, setIsFaucetModalOpen] = useState(false);
    const [ hasNFT, setHasNFT ] = useState(false);

    const openNFTModal = () => {
        setIsNFTModalOpen(true);
    }

    const closeNFTModal = () => {
        setIsNFTModalOpen(false);
    }

    const closeFaucetModal = () => {
        setIsFaucetModalOpen(false);
    }

    useEffect(() => {
        if (isWalletConnected) {
            const checkNFT = async () => {
                const balance = await checkKBFNFTOwnership();
                if (balance > 0) {
                    console.log("User has NFT")
                    setHasNFT(true);
                }
            }
            checkNFT();
        }
    }, [isWalletConnected]);
    
    const checkMetaMask = () => {
        if (isMetaMaskInstalled) {
            setMetaMaskChecked(true);
        }
    };

    const mintKbfRef = useRef(null);

    const handleMint = () => {
        console.log("Has NFT:", hasNFT)
        if (hasNFT == false) {
            setIsFaucetModalOpen(true);
            if (mintKbfRef.current) {
                mintKbfRef.current.handleSubmit();
            }
        }
    };

    const handleConnectWallet = async () => {
        await connectWallet();
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <Flex h="auto" m={6} mx={10}>
                <Box w="40%">
                    <Heading py={4}>{`Hello, ${firstName || 'firstName'}!`}</Heading>
                    <Text fontSize="md">Welcome to the Kansas Blockchain Institute Experimental Decentralized Application (dApp). This application is designed to immerse you into the web3 world through short interactive activities.</Text>
                    <Text py={4} fontSize="md">
                        <TypingEffect text="Firstly, let&apos;s check if you have MetaMask:" />
                    </Text>
                    {!metaMaskChecked && (
                        <DelayedComponent delay={2000}>
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
                      </DelayedComponent>
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
                        <DelayedComponent delay={8000}>
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
                        </DelayedComponent>
                    )}
                    {currentWalletAddress && (
                        <Box>
                            <Box mx={12} bg="blue.200" borderRadius='lg'>
                                <Text textAlign="center" fontSize="md">Success! Your wallet (with an address of {currentWalletAddress}) is connected.</Text>
                            </Box>
                            <Text py={4} fontSize="md" textAlign="left">
                                <TypingEffect text="For this demo, we are using the Polygon Amoy Testnet. Switching networks (or &apos;chains&apos;) is an automated process and you just need to accept the switch in the MetaMask UI." />
                            </Text>
                        </Box>
                    )}
                </Box>
                )}
            </Flex>
            {isWalletConnected && (
                <DelayedComponent delay={9000}>
                <Box bg="blue.200" mx={10} p={4}>
                    <Text textAlign="center" fontSize="md">
                        Next: We&apos;re going to mint a unique NFT for you. This NFT will be stored on the Polygon Amoy Testnet and will be used to track your membership in the KBF dApp.
                    </Text>
                    <MintKBF ref={mintKbfRef} />
                    <Popover>
                    <PopoverTrigger>
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
                            1. Click Me to Mint Your KBF NFT
                        </Button>
                    </PopoverTrigger>
                    <NeedTokens isOpen={isFaucetModalOpen} onClose={closeFaucetModal} />
                    {hasNFT && (
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader fontSize="md"><WarningIcon /> NFT Owned</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Text fontSize="md">It appears that you already own a unique KBF NFT. Please click the button below to add it to your MetaMask wallet.</Text>
                        </PopoverBody>
                      </PopoverContent>
                    )}
                    </Popover>
                    <Text textAlign="center" fontSize="md">
                        2. Find and record the Token ID of your NFT. You&apos;ll need this for step 3.
                    </Text>
                    <Button
                        onClick={openNFTModal}
                        colorScheme={'blue'}
                        variant={'solid'}
                        _hover={{
                        bg: 'blue.300',
                        }}
                        mx="auto"
                        display="block"
                        >
                        3. Click Me to Add Your KBF NFT to Your Wallet
                    </Button>
                    <AddNFT isOpen={isNFTModalOpen} onClose={closeNFTModal} />
                </Box>
                </DelayedComponent>
            )}
            <Footer />
        </ProtectedRoute>
    );
}

export default NFT_Walkthrough;
