"use server";
import { NextResponse } from 'next/server';
import { io as Client } from 'socket.io-client';

export async function POST(req) {
  const { jwtChallenge } = await req.json();
  const apiKey = process.env.REACT_APP_HEIRLOOM_API_KEY;
  const lockId = process.env.REACT_APP_HEIRLOOM_LOCK_ID;
  const apiBaseUrl = 'wss://api.heirloom.io';

  if (!apiKey || !lockId || !jwtChallenge) {
    return NextResponse.json({ error: 'API key, Lock ID, and JWT Challenge are required' }, { status: 400 });
  }

  try {
    const socket = Client(`${apiBaseUrl}?apiKey=${apiKey}&lockId=${lockId}&jwtChallenge=${jwtChallenge}`);

    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        console.log('Connected to the WebSocket server');
      });

      socket.on(`tokens:${apiKey}:${lockId}:${jwtChallenge}`, (message) => {
        console.log('Received message from WebSocket server:', message);
        const clientData = message.presentedCredentials[0].credentialSubject.recipient
        console.log('Nessage to send to client:', clientData)

        // Close the WebSocket connection
        socket.disconnect();

        // Resolve the promise with the message
        resolve(NextResponse.json(clientData, { status: 200 }));
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from the WebSocket server');
      });

      socket.on('error', (error) => {
        console.error('WebSocket error:', error);
        reject(NextResponse.json({ error: 'WebSocket error' }, { status: 500 }));
      });
    });
  } catch (error) {
    console.error('Error connecting to WebSocket:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
