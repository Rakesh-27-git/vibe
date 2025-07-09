"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const trpc = useTRPC();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(`Error creating project: ${error.message}`);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
        toast.success("Project created successfully!");
      },
    })
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        disabled={createProject.isPending}
        onClick={() => createProject.mutate({ value: value })}
      >
        Start the Ingest
      </Button>
      <Input
        className="mt-4 max-w-xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Page;
