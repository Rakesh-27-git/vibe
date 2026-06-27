'use client';

import { dark } from "@clerk/ui/themes";
import {SignUp } from "@clerk/nextjs";
import UseCurrentTheme from "@/hooks/use-current-theme";

export default function Page() {
  const currentTheme = UseCurrentTheme();
  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
          <SignUp
            appearance={{
              theme: currentTheme === "dark" ? dark : undefined,
              elements: {
                cardBox: "border! shadow-lg rounded-lg!",
              },
            }}
          />
        </div>
      </section>
    </div>
  );
}
