import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt,
  });

  return Response.json({ text });
}
