import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import RecipeSchema from "./schema";

export async function POST(req: Request) {
  try {
    const {dish} = await req.json();
    const result =  streamObject({
      model: google("gemini-2.5-flash"),
      prompt: `Give me receipe for ${dish}`,
      schema: RecipeSchema,
    })
    return result.toTextStreamResponse();
  } catch (e) {
    console.error("Error: " , e);
    return new Response("Some error occured", {status: 500})
  }
}
