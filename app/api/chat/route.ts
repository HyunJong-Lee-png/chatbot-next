import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { messages, model } = await req.json();
  console.log('model:', model);
  console.log('messages:', messages);
  const result = streamText({
    model: openai(model || 'gpt-4'),
    messages,
  });


  return result.toDataStreamResponse();
}

