import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, UIMessage } from "ai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: [
        {
          "role": "system",
          "content": "Convert user question into coding example."
        },
         {
          "role": "user",
          "content": "How to open and close modal"
        },
         {
          "role": "assistant",
          "content": "const [isOpen , setIsOpen] = useState(false); \n setIsOpen((status) => setIsOpen(!status));"
        },  
        
        ...await convertToModelMessages(messages),
      ]
    });

    return result.toUIMessageStreamResponse();
  } catch (e) {
    return new Response("Some error occured", { status: 500 });
  }
}
