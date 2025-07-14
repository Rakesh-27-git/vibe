import React from "react";

import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";

import Hint from "@/components/hint";
import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";

interface Props {
  data: Fragment;
}

const FragmentWeb = ({ data }: Props) => {
  const [copied, setCopied] = React.useState(false);
  const [fragmentKey, setFragmentKey] = React.useState(0);

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandboxUrl || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
        <Hint text="Refresh">
          <Button size="sm" variant="outline" onClick={onRefresh}>
            <RefreshCcwIcon />
          </Button>
        </Hint>

        <Hint text="Click to copy" slide="bottom">
          <Button
            size="sm"
            variant="outline"
            disabled={!data.sandboxUrl || copied}
            onClick={handleCopy}
            className="flex-1 justify-start text-start font-normal"
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>

        <Hint text="Open in new tab" slide="bottom" align="start">
          <Button
            size="sm"
            variant="outline"
            disabled={!data.sandboxUrl}
            onClick={() => {
              if (data.sandboxUrl) {
                window.open(data.sandboxUrl, "_blank");
              }
            }}
          >
            <ExternalLinkIcon />
          </Button>
        </Hint>
      </div>

      <iframe
        key={fragmentKey}
        className="w-full h-full"
        sandbox="allow-scripts allow-forms allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
      ></iframe>
    </div>
  );
};

export default FragmentWeb;
