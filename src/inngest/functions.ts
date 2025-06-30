import { Sandbox } from "@e2b/code-interpreter";

import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-project");
      return sandbox.sandboxId;
    });

    const codeWriterAgent = createAgent({
      name: "Code writer",
      system:
        "you are a code writer.you are expert in nextjs and react.js.You have to write the code snippets based on the user input. For styling use tailwind css.",
      model: gemini({ model: "gemini-2.0-flash" }),
    });
    const { output } = await codeWriterAgent.run(
      `write a simple nextjs snippet based on the input provided : ${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    return { output, sandboxUrl };
  }
);
