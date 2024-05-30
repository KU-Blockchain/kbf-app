"use server";
import React from "react";
import QuickLoginSocket from "./QuickLoginSocket";

const QuickLogin = () => {
    const apiKey = process.env.REACT_APP_HEIRLOOM_API_KEY;
    const lockId = process.env.REACT_APP_HEIRLOOM_LOCK_ID;
    const apiBaseUrl = 'https://api.heirloom.io';

    const getChallenge = async () => {
        const response = await fetch(`${apiBaseUrl}/auth/sessions/challenges`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Heirloom-Api-Key': apiKey,
                'X-Heirloom-API-Version': 1,
                'X-Heirloom-Lock-ID': lockId,
            },
        }).then((response) => response.json()) 
        console.log('JWT URL:', response);
        return response;
    };

    return (
        getChallenge()
    );
};

export default QuickLogin;