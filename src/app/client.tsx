"use client";

import React from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
const Client = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.hello.queryOptions({ text: "Rakes" })
  );
  return (
    <div className="text-5xl text-green-500 flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{data?.greeting}</h1>
    </div>
  );
};

export default Client;
