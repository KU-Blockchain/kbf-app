"use client";
import React, { useEffect, useState } from 'react';
import { Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Text } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthProvider';

const Login = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [messages, setMessages] = useState([]);
    const [jwtChallenge, setJwtChallenge] = useState(null);
    const [jwtChallengeUrl, setJwtChallengeUrl] = useState('jwtChallengeUrl');

    useEffect(() => {
        if (isOpen) {
            const getJWT = async() => {
                const response = await fetch('../api/QuickLoginJWT');
                const data = await response.json();
                setJwtChallenge(data.loginChallenge);
                setJwtChallengeUrl(data.loginChallengeUrl);
                return data;
            };

            getJWT();
        }
    }, [isOpen]);

    useEffect(() => {
        if (jwtChallenge) {
            const connectWebSocket = async () => {
                if (jwtChallenge) {
                    console.log('Connecting to WebSocket...');
                    console.log('jwtChallenge:', jwtChallenge)
                    const response = await fetch('../api/QuickLoginSocket', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ jwtChallenge: jwtChallenge }),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log(result.message);
                    } else {
                        console.error('Error connecting to WebSocket:', response.statusText);
                    }
                }
            };

            connectWebSocket();
        }
    }, [jwtChallenge]);


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading as="h1" size="1xl">QuickLogin</Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Center w="100%">
                        <QRCode size={256} value={jwtChallengeUrl} />
                        {/* {messages.map((message, index) => (
                            <Text key={index}>{message}</Text>
                        ))} */}
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
);
}

export default Login;
