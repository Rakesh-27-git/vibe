"use client";

import React, { Suspense } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Fragment } from "@/generated/prisma";

import MessagesContainer from "../components/messages-container";
import ProjectHeader from "../components/project-header";

interface props {
  projectId: string;
}

const ProjectView = ({ projectId }: props) => {
  const [activeFragment, setActiveFragment] = React.useState<Fragment | null>(
    null
  );

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<p>Loading project...</p>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>

          <Suspense fallback={<p>Loading messages...</p>}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={65} minSize={50}>
          TODO: preview
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProjectView;
