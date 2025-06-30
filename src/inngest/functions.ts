import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeWriterAgent = createAgent({
      name: "Code writer",
      system:
        "you are a code writer.you are expert in nextjs and react.js.You have to write the code snippets based on the user input. For styling use tailwind css.",
      model: gemini({ model: "gemini-2.0-flash" }),
    });
    const { output } = await codeWriterAgent.run(
      `write a simple nextjs snippet based on the input provided : ${event.data.value}`
    );
    console.log("Output from agent:", output);
    return { output };
  }
);
