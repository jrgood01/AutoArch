import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const fastApiEndpoint = `http://127.0.0.1:8000/get_arch_suggestion`;
    const res = await req.json()

    const inputText = res.input_text;
    console.log(res)
    
    // Send a POST request to the FastAPI endpoint
    const fastApiResponse = await fetch(fastApiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_text: inputText }),
    });

    const archSuggestion = await fastApiResponse.json();

    return new NextResponse(JSON.stringify(archSuggestion), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate',
      },
      status: 200,
      statusText: 'OK',
    });
    
  } catch (error) {
    console.error('Error fetching architecture suggestion:', error);
    return new Response("error fetching architecture suggestion", {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate',
      },
      status: 200,
      statusText: 'OK',
    });
  }
}