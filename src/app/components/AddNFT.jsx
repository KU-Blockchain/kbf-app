"use client";
import React, { useEffect, useState } from 'react';
import { FormHelperText, Heading, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Spinner, FormControl, FormLabel, Input, Button, FormErrorMessage} from '@chakra-ui/react';
import { useMetaMask } from '../contexts/MetaMaskContext';

const AddNFT = ({ isOpen, onClose }) => {
    const { addNFTToMetaMask } = useMetaMask();
    const [ tokenId, setTokenId ] = useState(0);
    const [ isError, setIsError ] = useState(false);

    const addToMetaMask = async () => {
        setIsError(false);
        if (await addNFTToMetaMask(tokenId)) {
            onClose();
        } else {
            setIsError(true);
        }
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
                        <FormControl isInvalid={isError}>
                            <FormLabel>Token ID</FormLabel>
                            <Input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
                            {!isError ? (
                                <FormHelperText>
                                    Make sure this is your own NFT token ID, or else you will not be able to add it.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>
                                    Make sure you own the token ID you are requesting. Check for a &apos;Safe Mint&apos; contract call in your MetaMask &apos;Activity&apos; tab. View the transaction details on the block explorer.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Button onClick={addToMetaMask}>Add to MetaMask</Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddNFT;
