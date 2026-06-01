import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST() {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: "Hi Gemini, Hello from Developer.",
  });

  return Response.json({ text });
}
