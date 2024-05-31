"use server";
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.REACT_APP_HEIRLOOM_API_KEY;
  const lockId = process.env.REACT_APP_HEIRLOOM_LOCK_ID;
  const apiBaseUrl = 'https://api.heirloom.io';

  if (!apiKey || !lockId) {
    return NextResponse.json({ error: 'API key and Lock ID are required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiBaseUrl}/auth/sessions/challenges`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Heirloom-Api-Key': apiKey,
        'X-Heirloom-API-Version': 1,
        'X-Heirloom-Lock-ID': lockId,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      return NextResponse.json({ error: errorDetails }, { status: response.status });
    }

    const data = await response.json();
    console.log('JWT URL:', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching challenge:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
