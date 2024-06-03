"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from "ethers";

const MetaMaskContext = createContext(null);

export const MetaMaskProvider = ({ children }) => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [currentChainId, setCurrentChainId] = useState(null);
    const [currentWalletAddress, setCurrentWalletAddress] = useState(null);
    
    // TO DO: make sure wallet is on correct network
    const connectWallet = (message) => {
        if (!walletConnected) {
            setWalletConnected(true);
            console.log('Wallet connected with address:', message.address);
        }
        setCurrentWalletAddress(message.address);
        setCurrentChainId(message.chainId);
    };

    useEffect(() => {
        const checkMetaMask = async () => {
            if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
                console.log('MetaMask is installed');
                setIsMetaMaskInstalled(true);
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                    const walletAddress = accounts[0];
                    connectWallet({ address: walletAddress, chainId: chainId });
                }
                window.ethereum.on("chainChanged", (chainId) => {
                    const walletAddress = accounts[0];
                    connectWallet({ address: walletAddress, chainId: chainId });
                    window.location.reload();
                });
                    window.ethereum.on("accountsChanged", (accounts) => {
                    setWalletConnected(accounts.length > 0);
                });
            }
        };
        checkMetaMask();
    }, []);
    
    return (
        <MetaMaskContext.Provider value={{ 
            isMetaMaskInstalled, 
            walletConnected, 
            currentChainId, 
            currentWalletAddress, 
            connectWallet
         }}>
        {children}
        </MetaMaskContext.Provider>
    );
    }

export const useMetaMask = () => useContext(MetaMaskContext);