"use client";

import React from "react";

import { dark } from "@clerk/ui/themes";
import { UserButton } from "@clerk/nextjs";
import UseCurrentTheme from "@/hooks/use-current-theme";

interface Props {
  showName?: boolean;
}

const UserControl = ({ showName }: Props) => {
  const currentTheme = UseCurrentTheme();
  return (
    <UserButton
      showName={showName}
      appearance={{
        elements: {
          userButtonBox: "rounded-full!",
          userButtonAvatarBox: "rounded-full! size-8",
          userButtonTrigger: "rounded-full! ",
        },
        theme: currentTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default UserControl;
