"use client";
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ethers } from 'ethers';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Link } from '@chakra-ui/react';
import { Center, Box, Card, CardHeader, CardBody, CardFooter, Heading, Text, Stack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
import  KansasBlockchainQuizzesABI from '../abi/KansasBlockchainQuizzesABI.json';
import { useMetaMask } from '../contexts/MetaMaskContext';
import { type } from 'os';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
//   ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Quiz({ tokenID }) {
    const [ currentQuizEncrypted, setCurrentQuizEncrypted ] = useState(null);
    const [ currentQuizDecrypted, setCurrentQuizDecrypted ] = useState(null);
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        const QuizContractAddress = "0x5f4c10b5da409df81e7b8084092d49a29313165b";

        const fetchQuiz = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const quizContract = new ethers.Contract(QuizContractAddress, KansasBlockchainQuizzesABI.abi, signer);
                const userAddress = await signer.getAddress();
                console.log("Token ID:", tokenID)
                const tokenURI = await quizContract.tokenURI(tokenID);
                console.log("Token URI:", tokenURI);

                const ipfsURL = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
                const response = await fetch(ipfsURL);
                const json = await response.json();
                
                setCurrentQuizEncrypted({
                    name: json['name'],
                    quiz_number: json['quiz_number'],
                    quiz_uri: json['quiz_uri'],
                    feedback_1: json['1_feedback'],
                    feedback_2: json['2_feedback'],
                    feedback_3: json['3_feedback'],
                    additional_comments: json['additional_comments']
                });

            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        }

        fetchQuiz();

    }, []);
    
    useEffect(() => {
        console.log("Current Quiz Encrypted:", currentQuizEncrypted)

        const decryptQuiz = async () => {
            try {
                const response = await fetch(`https://${process.env.NEXT_PUBLIC_SERVER_IP}/api/decrypt`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentQuizEncrypted),
                });

                if (!response.ok) {
                    throw new Error('Bad request');
                }
                const data = await response.json();

                setCurrentQuizDecrypted({
                    name: data['name'],
                    quiz_number: data['quiz_number'],
                    quiz_uri: data['quiz_uri'].replace('ipfs://', 'https://ipfs.io/ipfs/'),
                    feedback_1: data['feedback_1'],
                    feedback_2: data['feedback_2'],
                    feedback_3: data['feedback_3'],
                    additional_comments: data['additional_comments']
                });
            } catch (error) {
                console.error("Error decrypting quiz:", error);
            }
        }

        decryptQuiz();

    }, [currentQuizEncrypted]);



    return (
        <Card>
            { currentQuizDecrypted && ( 
            <div>
            <CardHeader>
                <Heading as="h1" size="1xl">{currentQuizDecrypted.name} - Quiz {currentQuizDecrypted.quiz_number}</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing={4}>
                    {/* <Center>
                        <Document file={currentQuizDecrypted.quiz_uri}> 
                        <Page
                            pageNumber={1}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            width="300"
                            renderMode="canvas"
                        />
                        </Document>
                    </Center> */}
                    <Button 
                        color="black"
                        isExternal
                        as={Link}
                        href={currentQuizDecrypted.quiz_uri}
                        colorScheme="blue"
                        variant="outline"
                    >
                        Open Quiz on IPFS
                    </Button>
                    <Button 
                        color="black"
                        as={Link}
                        variant="outline"
                        colorScheme="blue" 
                        onClick={() => setIsOpen(true)}
                    >
                        View Feedback
                    </Button>
                    <Button 
                        color="black"
                        isExternal
                        as={Link}
                        href={`https://amoy.polygonscan.com/nft/0x5f4c10b5da409df81e7b8084092d49a29313165b/${tokenID}`}
                        variant="outline"
                        colorScheme="blue" 
                    >
                        View on Block Explorer
                    </Button>
                </Stack>
            </CardBody>
            <Modal size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Stack>
                        <Text>Feedback</Text>
                        <Text fontSize="lg">{currentQuizDecrypted.name} - Quiz {currentQuizDecrypted.quiz_number}</Text>
                        </Stack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left' fontSize="lg">
                                        <Text>Question 1</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} fontSize="sm">
                                    <Text>{currentQuizDecrypted.feedback_1}</Text>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left' fontSize="lg">
                                        <Text>Question 2</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} fontSize="sm">
                                    <Text>{currentQuizDecrypted.feedback_2}</Text>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left' fontSize="lg">
                                        <Text>Question 3</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} fontSize="sm">
                                    <Text>{currentQuizDecrypted.feedback_3}</Text>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left' fontSize="lg">
                                        <Text>Additional Comments</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} fontSize="sm">
                                    <Text>{currentQuizDecrypted.additional_comments}</Text>
                                </AccordionPanel>
                            </AccordionItem>

                            </Accordion>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} isExternal onClick={() => window.open(currentQuizDecrypted.quiz_uri)}>
                            Open Quiz
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
        )}
        </Card>
    );
}

export default Quiz;