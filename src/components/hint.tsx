import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  children?: React.ReactNode;
  text: string;
  slide?: "top" | "bottom" | "left" | "right";
  aligh?: "start" | "center" | "end";
}

const hint = ({ children, text, slide, aligh }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={slide} align={aligh}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default hint;
