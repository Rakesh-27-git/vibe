import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";
import ProjectView from "@/modules/projects/ui/views/project-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface props {
  params: Promise<{ projectId: string }>;
}

const Page = async ({ params }: props) => {
  const { projectId } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    })
  );
  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectView projectId={projectId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default Page;
