"use client";
import React, { useEffect, useState } from 'react';
import { FormHelperText, Heading, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Spinner, FormControl, FormLabel, Input, Button} from '@chakra-ui/react';
import { useMetaMask } from '../contexts/MetaMaskContext';

const AddNFT = ({ isOpen, onClose }) => {
    const { addNFTToMetaMask } = useMetaMask();
    const [ tokenId, setTokenId ] = useState(0);

    const addToMetaMask = () => {
        addNFTToMetaMask(tokenId);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading as="h1" size="1xl">Add Your NFT</Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack w="100%">
                        <FormControl>
                            <FormLabel>Token ID</FormLabel>
                            <Input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
                            <FormHelperText>
                                Make sure this is your own NFT token ID, or else you will not be able to add it.
                            </FormHelperText>
                        </FormControl>
                        <Button onClick={addToMetaMask}>Add to MetaMask</Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddNFT;
