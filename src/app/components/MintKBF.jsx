"use client";
import React, { useImperativeHandle, forwardRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useIPFS } from '../contexts/IpfsContext';
import { ethers } from 'ethers';
import KansasBlockchainABI from '../abi/KansasBlockchainABI.json';

const MintKBF = forwardRef((props, ref) => {
  const { firstName, lastName } = useAuth();
  const { uploadJSONToIPFS } = useIPFS();

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
        pinataContent: {
          name: `${firstName} ${lastName}'s KBF NFT`,
          description: "A unique NFT for the Kansas Blockchain Fellowship community",
          external_url: "https://kansasblockchain.org",
          image: "ipfs://QmRNiJHbsVKGpihD93rqfztHDTJqvXrkNUDV6YEAa5YuKd"
        },
        pinataMetadata: {
          name: "metadata.json"
        }
      }

      console.log('NFT Metadata:', metadata);

      //const jsonBlob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
      const ipfsHash = await uploadJSONToIPFS(metadata);
      console.log('IPFS Hash:', ipfsHash);

      //const fellowName = "Micah Borghese"
      //const logoUri = "ipfs://QmRNiJHbsVKGpihD93rqfztHDTJqvXrkNUDV6YEAa5YuKd/"

      const fellow_address = await signer.getAddress();
      const tx = await contract.safeMint(
        fellow_address,
        ipfsHash
      );

      await tx.wait();
      console.log('Transaction hash:', tx.hash);
      window.open(`https://amoy.polygonscan.com/tx/${tx.hash}`, '_blank').focus();
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  }

  return (
    <div></div>
  );
});

MintKBF.displayName = 'MintKBF';

export default MintKBF;
