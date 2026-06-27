"use client";

import Image from "next/image";

import { dark } from "@clerk/ui/themes";  
import { PricingTable } from "@clerk/nextjs";
import UseCurrentTheme from "@/hooks/use-current-theme";

const Page = () => {
  const currentTheme = UseCurrentTheme();
  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Vibe"
            width={50}
            height={50}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-center"> </h1>
        <p className="text-muted-foreground text-center text-sm md:text-base">
          Choose the plan that fits your needs
        </p>
        <PricingTable
          appearance={{
            theme: currentTheme === "dark" ? dark : undefined,  // changed baseTheme → theme
          }}
        />
      </section>
    </div>
  );
};

export default Page;