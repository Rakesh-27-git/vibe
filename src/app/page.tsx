"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const { data } = useQuery(trpc.messages.getMany.queryOptions());

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message created successfully!");
      },
    })
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        disabled={createMessage.isPending}
        onClick={() => createMessage.mutate({ value: value })}
      >
        Start the Ingest
      </Button>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      {JSON.stringify(data,null, 2)}
    </div>
  );
};

export default Page;
