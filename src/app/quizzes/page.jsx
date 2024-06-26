"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Box, Button, Flex, Text, Spinner, SimpleGrid, FormControl, FormLabel, Heading, Input, Stack, VStack, Card, CardHeader, CardBody, Center } from "@chakra-ui/react";
import Quiz from "../components/Quiz";
import { useAuth } from "../contexts/AuthContext";
import { useMetaMask } from "../contexts/MetaMaskContext";
import ProtectedRoute from "../components/ProtectedRoute";
import KansasBlockchainQuizzesABI from "../abi/KansasBlockchainQuizzesABI.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import '../../../polyfills.mjs';

const Quizzes = () => {
    const { firstName, lastName, email } = useAuth();
    const { isWalletConnected, connectWallet, currentWalletAddress, checkKBFNFTOwnership } = useMetaMask();
    const [quizTokenIDs, setQuizTokenIDs] = useState([]);
    const [ isLoading , setIsLoading ] = useState(true);
    
    useEffect(() => {
        const QuizContractAddress = "0x5f4c10b5da409df81e7b8084092d49a29313165b";

        const fetchQuizTokens = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const quizContract = new ethers.Contract(QuizContractAddress, KansasBlockchainQuizzesABI.abi, signer);
                const userAddress = await signer.getAddress();
                const amount = await quizContract.balanceOf(userAddress);
                let tokens = [];
                for (let i = 0; i < amount; i++) {
                    const tokenID = await quizContract.tokenOfOwnerByIndex(userAddress, i);
                    tokens.push(Number(tokenID));
                }
                setQuizTokenIDs(tokens)
            }
            catch (error) {
                console.error("Error fetching tokens:", error);
            }
        }

        fetchQuizTokens().then(() => setIsLoading(false));

    }, []);


    return (
        <ProtectedRoute>
            <Navbar />
            <Box textAlign="center" m={6} mx={10}>
                <Text fontSize="xxxl" fontWeight="bold" mb={10}>
                    My Quizzes
                </Text>
                {!isLoading ? (
                    quizTokenIDs.length > 0 ? (
                        <SimpleGrid columns={3} spacing={10}>
                            {quizTokenIDs.map((tokenID) => (
                                <Quiz key={tokenID} tokenID={tokenID} />
                            ))}
                        </SimpleGrid>
                        ) : (
                        <Text fontSize="lg" fontWeight="bold" mb={10}>
                            You have no quizzes yet!
                        </Text>
                        )
                ) : (
                    <Spinner
                        my={6}
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                )}
            </Box>
            <Footer />
        </ProtectedRoute>
    );
}

export default Quizzes;
