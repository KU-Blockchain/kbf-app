"use client";
import React, { useEffect, useState } from 'react';
import { Text, Heading, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Spinner, FormControl, FormLabel, Input, Button, FormErrorMessage} from '@chakra-ui/react';

const NeedTokens = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading as="h1" size="1xl">Not Enough Tokens?</Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack w="100%">
                        <Text fontSize="md">If you don&apos;t have test Polygon MATIC tokens, please click the link below. You&apos;ll need to verify through Discord.</Text>
                        <Button as="a" href="https://faucet.polygon.technology/" target="_blank" rel="noopener noreferrer">Go to Faucet</Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default NeedTokens;
