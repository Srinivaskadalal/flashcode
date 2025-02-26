import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Image from "next/image";
import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark">
      <section className="light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold">
              <span className="!text-[#DAA520] dark:text-[#FF8C00]">Flash</span>
              <span className="!text-[#1E3A8A] dark:text-[#00C8FF]">Code</span>
            </h1>
            <p className="paragraph-regular text-dark500_light400">
              Fast Answers, Smarter Coding
            </p>
          </div>
          <Image
            src="images/test.svg"
            alt="FlashCode Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        <SocialAuthForm />

        <div className="relative my-6 flex items-center">
          <div className="grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400">OR</span>
          <div className="grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        {children}
      </section>
    </main>
  );
}
