"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({}));

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value: value })}
      >
        Start the Ingest
      </Button>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default Page;
