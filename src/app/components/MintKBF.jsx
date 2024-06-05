"use client";
import React, { useImperativeHandle, forwardRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useIPFS } from '../contexts/IpfsContext';
import { ethers } from 'ethers';
import KansasBlockchainABI from '../abi/KansasBlockchainABI.json';

const MintKBF = forwardRef((props, ref) => {
  const { firstName, lastName } = useAuth();
  const { uploadToIPFS } = useIPFS();

  useImperativeHandle(ref, () => ({
    handleSubmit: handleMint
  }));

  async function handleMint() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = `0x5cb013c15caf08ee1ef85d37e797b6f7000e6d32`; // NFT contract address
      const contract = new ethers.Contract(contractAddress, KansasBlockchainABI.abi, signer);

      const metadata = {
        title: "Asset Metadata",
        type: "object",
        properties: {
          name: {
            type: "string",
            value: `${firstName} ${lastName}'s KBF NFT`
          },
          description: {
            type: "string",
            value: "A unique NFT for the Kansas Blockchain Fellowship community"
          },
          image: {
            type: "string",
            value: "ipfs://QmRNiJHbsVKGpihD93rqfztHDTJqvXrkNUDV6YEAa5YuKd/"
          }
        }
      };

      console.log('NFT Metadata:', metadata);

      const jsonBlob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
      const ipfsHash = await uploadToIPFS(jsonBlob);

      const fellow_address = await signer.getAddress();
      const tx = await contract.safeMint(
        fellow_address,
        ipfsHash,
      );

      await tx.wait();
      console.log('Transaction hash:', tx.hash);
      window.open(`https://amoy.polygonscan.com/tx/${tx.hash}`, '_blank').focus();
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  }

  return (
    <div>
      <button onClick={handleMint}>Mint KBF NFT</button>
    </div>
  );
});

MintKBF.displayName = 'MintKBF';

export default MintKBF;
