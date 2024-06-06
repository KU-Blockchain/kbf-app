"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import KansasBlockchainABI from '../abi/KansasBlockchainABI.json';
import { ethers } from 'ethers';

const MetaMaskContext = createContext(null);

export const MetaMaskProvider = ({ children }) => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [isWalletConnected, setWalletConnected] = useState(false);
    const [currentChainId, setCurrentChainId] = useState(null);
    const [currentWalletAddress, setCurrentWalletAddress] = useState(null);
    
    const connectWallet = async () => {
        if (!isMetaMaskInstalled) {
            console.log('In order to use this dApp, you need to install MetaMask')
        } else {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                const walletAddress = accounts[0];
                if (!isWalletConnected) {
                    setWalletConnected(true);
                    sessionStorage.setItem('isWalletConnected', 'true');
                    console.log('Wallet connected with address:', walletAddress);
                }
                setCurrentWalletAddress(walletAddress);
                setCurrentChainId(chainId);
                sessionStorage.setItem('currentWalletAddress', walletAddress);
                sessionStorage.setItem('currentChainId', chainId);
            } 
        }
    };

    useEffect(() => {
        checkMetaMask();
        if (isMetaMaskInstalled) {
            const accounts = window.ethereum.request({ method: 'eth_accounts' });
            window.ethereum.on("chainChanged", (chainId) => {
                console.log('Chain changed to:', chainId);
                const walletAddress = accounts[0];
                connectWallet({ address: walletAddress, chainId: chainId });
                //window.location.reload();
            });
            window.ethereum.on("accountsChanged", (accounts) => {
                console.log('Accounts changed to:', accounts);
                setWalletConnected(accounts.length > 0);
                if (isWalletConnected) {
                    const walletAddress = accounts[0];
                    setCurrentWalletAddress(walletAddress);
                    sessionStorage.setItem('currentWalletAddress', walletAddress);
                }
                sessionStorage.setItem('iswalletConnected', accounts.length > 0);
                //window.location.reload();
            });
        }

        // load the verification status and user details from session storage when the component mounts
        const storedIsWalletConnected = sessionStorage.getItem('isWalletConnected') === 'true';
        //setWalletConnected(storedIsWalletConnected);
        const storedCurrentChainId = sessionStorage.getItem('currentChainId');
        const storedCurrentWalletAddress = sessionStorage.getItem('currentWalletAddress');

        if (storedIsWalletConnected) {
        //if (isWalletConnected) {
            setCurrentChainId(storedCurrentChainId);
            setCurrentWalletAddress(storedCurrentWalletAddress);
        }
    }, [isMetaMaskInstalled, isWalletConnected, currentChainId, currentWalletAddress]);

    const checkMetaMask = () => {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            console.log('MetaMask is installed');
            setIsMetaMaskInstalled(true);
            sessionStorage.setItem('isMetaMaskInstalled', 'true');
            return true;
        } else {
            console.log('MetaMask is not installed');
            return false;
        }
    };

    const addPolygonAmoy = async () => {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainName: "Polygon Amoy Testnet", 
                    chainId: "0x13882",
                    nativeCurrency: {
                        name: "MATIC", 
                        symbol: "MATIC",
                        decimals: 18,
                    },
                    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
                    blockExplorerUrls: ["https://amoy.polygonscan.com/"]
                }],
            });
        
            const chainId = await window.ethereum.request({ method: "eth_chainId" });
            setCurrentChainId(chainId);
            sessionStorage.setItem('currentChainId', chainId);
            console.log('Connected to Polygon Amoy Testnet');
        } catch (error) {
            console.error("Failed to add the Polygon Amoy Testnet:", error);
        }
    };

    const checkKBFNFTOwnership = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = `0x3ab588b04a50a39b192f095fef1eeef39311d98f`; // NFT contract address
        const contract = new ethers.Contract(contractAddress, KansasBlockchainABI.abi, signer);
        
        let balance = 0;
        try {
            balance = await contract.balanceOf(currentWalletAddress);
            console.log('Current Balance:', balance.toString());
        } catch (error) {
            console.error('Error checking NFT ownership:', error);
        }
        return balance;
    };

    const addNFTToMetaMask = async (tokenId) => {
        console.log('Adding NFT to MetaMask...');
        console.log('Token ID:', tokenId);
        try {
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC721',
                    options: {
                        address: `0x3ab588b04a50a39b192f095fef1eeef39311d98f`,
                        tokenId: tokenId.toString(),
                    },
                },
            });
            if (wasAdded) {
                console.log('NFT added to MetaMask');
            } else {
                console.log('NFT not added to MetaMask');
            }
        }
        catch (error) {
            console.error('Error adding NFT to MetaMask:', error);
        }
    };

    const checkIsOnChain = () => {
        return currentChainId === "0x13882";
    };
    
    return (
        <MetaMaskContext.Provider value={{ 
            isMetaMaskInstalled, 
            isWalletConnected, 
            currentChainId, 
            currentWalletAddress, 
            connectWallet,
            addPolygonAmoy,
            checkKBFNFTOwnership,
            addNFTToMetaMask,
            checkIsOnChain
         }}>
        {children}
        </MetaMaskContext.Provider>
    );
    }

export const useMetaMask = () => useContext(MetaMaskContext);