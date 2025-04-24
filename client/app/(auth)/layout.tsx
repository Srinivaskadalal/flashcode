"use client";

import Image from "next/image";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isSignIn = pathname.includes("sign-in");

  return (
    <main className="flex min-h-screen">
      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-center px-8 py-12 space-y-6">
        <div className="flex flex-col items-center space-y-1 mb-4">
          <div className="flex items-center space-x-2">
            <Image src="/flash_logo.png" alt="Logo" width={28} height={28} />
            <span className="text-lg font-semibold">FlashCode</span>
          </div>
          <span className="text-xs text-gray-400">
            Smart minds. Fast answers. Zero judgment.
          </span>
        </div>

        <div className="w-full max-w-sm space-y-2">
          <h2 className="text-2xl font-bold">
            {isSignIn ? "Sign in to your account" : "Sign up for an account"}
          </h2>
        </div>

        <div className="w-full max-w-sm space-y-6">
          {children}

          <div className="text-sm text-muted-foreground text-center">
            {isSignIn ? (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/sign-in" className="underline">
                  Sign in
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center w-full space-x-4">
            <div className="h-px bg-gray-600 w-full" />
            <span className="whitespace-nowrap text-xs text-gray-400">
              Or continue with
            </span>
            <div className="h-px bg-gray-600 w-full" />
          </div>

          <SocialAuthForm />

          <p className="text-xs text-muted-foreground text-center">
            All rights reserved and{" "}
            <Link href="/" className="underline">
              Flashcode{" "}
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-neutral-950 text-white items-center justify-center p-10">
        <div className="text-center space-y-4 max-w-sm">
          <div className="flex justify-center -space-x-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Image
                key={idx}
                src={`/images/user-${idx + 1}.jpg`} // Make sure these are placed in public/images/
                width={40}
                height={40}
                alt={`user-${idx + 1}`}
                className="rounded-full border-2 border-neutral-800"
              />
            ))}
          </div>
          <h3 className="text-lg font-semibold">Flashes love us</h3>

          <div className="flex flex-col items-center space-y-5 pt-5 border-t border-neutral-800">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-300 italic max-w-xs text-center">
                “FlashCode changed how I tackle problems. It’s fast, friendly,
                and actually fun.”
              </p>
              <p className="text-xs text-gray-500">— Nithin</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-300 italic max-w-xs text-center">
                “Feels like a campus hackathon every day—collaborative, fast,
                and full of energy!”
              </p>
              <p className="text-xs text-gray-500">— Rohith</p>
            </div>

            <p className="text-sm text-gray-400">
              loved by thousands of developers across the <br />
              <span className="text-sm font-semibold italic">
                kent State univeristy
              </span>
              <br />
              Be part of the community and join us.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}