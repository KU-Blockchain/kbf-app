"use client";
import React, { useEffect, useState } from 'react';
import { Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Text } from '@chakra-ui/react';
import QuickLoginJWT from '../../api/QuickLoginJWT';
import QRCode from 'qrcode.react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthProvider';

const Login = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [response, setResponse] = useState(null);

    const responseData = async() => {
        const this_response = await QuickLoginJWT();
        setResponse(this_response);
        return this_response;
    }

    useEffect(() => {
        if (isOpen) {
            responseData();
            const socket = io();

            socket.on('connect', () => {
                console.log('Connected to the Socket.io server');
            });

            const apiKey = process.env.REACT_APP_HEIRLOOM_API_KEY;
            const lockId = process.env.REACT_APP_HEIRLOOM_LOCK_ID;
            const jwtChallenge = response?.jwtChallenge;
            const topic = `tokens:${apiKey}:${lockId}:${jwtChallenge}`;

            socket.emit('start', { apiKey, lockId, jwtChallenge });

            socket.on(topic, (message) => {
                console.log('Received message from WebSocket:', message);
                // Handle the message from the WebSocket
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from the Socket.io server');
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [isOpen]);

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
                    <QRCode size={256} value={response?.loginChallengeUrl || ""} />
                </Center>
            </ModalBody>
        </ModalContent>
    </Modal>
);
}

export default Login;
