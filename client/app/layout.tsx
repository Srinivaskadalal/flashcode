import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";

const montserrat = localFont({
  src: "./fonts/MontserratVF.ttf",
  variable: "--font-montserrat",
  weight: "100 200 300 400 500 600 700 800 900",
});
export const pacifico = localFont({
  src: "./fonts/Pacifico-Regular.ttf",
  variable: "--font-pacifico",
  weight: "400",
  style: "normal",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 600 700",
});
const playfairDisplay = localFont({
  src: "./fonts/Fairplay.ttf",
  variable: "--font-playfair-display",
  weight: "400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "FlashCode ⚡ - Built For Better",
  description:
    "A platform for students, faculty, and alumni to share knowledge, solve coding problems, and grow together.",
  icons: {
    icon: "/images/test.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>

      <SessionProvider session={session}>
        <body
          className={`${montserrat.className} ${spaceGrotesk.variable} ${pacifico.variable} ${playfairDisplay.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
