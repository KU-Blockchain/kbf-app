"use client";
import React, { createContext, useContext } from 'react';
const IPFSContext = createContext();

export const IPFSProvider = ({children}) =>{

  async function uploadFileToIPFS(file) {
    const formData = new FormData();
    formData.append('file', file); 
    console.log('Uploading file to IPFS...');
    try {
        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
            },
            body: formData
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const resData = await res.json();
        const fileUri = `ipfs://${resData.IpfsHash}`;
        console.log("Files uploaded to IPFS:", fileUri);
        return fileUri;
    } catch (error) {
        console.error("Error uploading files to IPFS:", error);
        return null;
    }
  }

  async function uploadJSONToIPFS(json) {
    const jsonString = JSON.stringify(json);
    // const jsonData = new FormData();
    // jsonData.append('file', new Blob([jsonString], { type: 'application/json' })); 

    console.log('Uploading JSON to IPFS...');
    try {
        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
            },
            body: jsonString
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const resData = await res.json();
        const jsonUri = `ipfs://${resData.IpfsHash}`;
        console.log("JSON uploaded to IPFS:", jsonUri);
        return jsonUri;
    } catch (error) {
        console.error("Error uploading JSON to IPFS:", error);
        return null;
    }
  }


  async function fetchFromIpfs(ipfsHash) {
      let stringData = '';
      for await (const chunk of ipfs.cat(ipfsHash)) {
          stringData += new TextDecoder().decode(chunk);
      }
      try {
          return JSON.parse(stringData);
      } catch (error) {
          console.error("Error parsing JSON from IPFS:", error, "stringData:", stringData);
          throw error;
      }
    }

    return(
        <IPFSContext.Provider
            value ={{
                uploadFileToIPFS,
                uploadJSONToIPFS,
                fetchFromIpfs,
            }}>
            {children}
        </IPFSContext.Provider>

    )
};

export function useIPFS() {
    return useContext(IPFSContext);
}