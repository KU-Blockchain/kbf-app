"use server";
import { NextResponse } from 'next/server';
import WebSocket from 'ws';
import { io } from 'socket.io-client';

export async function POST(req) {
  const { jwtChallenge } = await req.json();
  const apiKey = process.env.REACT_APP_HEIRLOOM_API_KEY;
  const lockId = process.env.REACT_APP_HEIRLOOM_LOCK_ID;
  const apiBaseUrl = 'wss://api.heirloom.io';

  if (!apiKey || !lockId || !jwtChallenge) {
    return NextResponse.json({ error: 'API key, Lock ID, and JWT Challenge are required' }, { status: 400 });
  }

  try {
    // const wsUrl = `${apiBaseUrl}?apiKey=${apiKey}&lockId=${lockId}&jwtChallenge=${jwtChallenge}`;
    // const ws = new WebSocket(wsUrl);

    // ws.on('open', () => {
    //   console.log('Connected to WebSocket server');
    //   const topic = `tokens:${apiKey}:${lockId}:${jwtChallenge}`;
    //   ws.send(JSON.stringify({ action: 'subscribe', topic }));

    //   ws.on('message', (message) => {
    //     const parsedMessage = JSON.parse(message);
    //     console.log('Received message:', parsedMessage);

    //     // Emit acknowledgment back to the server
    //     ws.send(JSON.stringify({ action: `acknowledgement-${topic}` }));
    //   });
    // });

    // ws.on('error', (error) => {
    //   console.error('WebSocket error:', error);
    // });

    // ws.on('close', () => {
    //   console.log('WebSocket connection closed');
    // });
    const socket = io(apiBaseUrl, {
      query: { apiKey, lockId, jwtChallenge },
    });
    
    const topic = `tokens:${apiKey}:${lockId}:${jwtChallenge}`;
    
    socket.on('connect', () => {
      console.log(socket);
      console.log('Connected to the server');
    });
    
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
    
    socket.on('error', (errorMessage) => {
      console.error('Error from server:', errorMessage);
    });
    
    socket.on(topic, (message) => {
      console.log('Received message:', message);
    
      // Emit acknowledgement of receipt back to the server
      socket.emit(`acknowledgement-${topic}`);
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return NextResponse.json({ message: 'WebSocket connection established' }, { status: 200 });
  } catch (error) {
    console.error('Error connecting to WebSocket:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
