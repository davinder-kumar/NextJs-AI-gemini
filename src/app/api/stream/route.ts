import { google } from "@ai-sdk/google";
import { smoothStream, streamText } from "ai";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const text = streamText({
      model: google("gemini-2.5-flash"),
      prompt,
      experimental_transform: smoothStream({
        chunking: "word",
      }),
    });
    
    text.usage.then((usage) => {
      console.log({
        inputToken: usage.inputTokens,
        outputToken: usage.outputTokens,
        TotalTokens: usage.totalTokens,
      })
    })

    return text.toUIMessageStreamResponse();
  } catch (e) {
    return new Response("Failed", { status: 500 });
  }
}
