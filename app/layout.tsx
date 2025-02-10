import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const montserrat = localFont({
  src: "./fonts/MontserratVF.ttf",
  variable: "--font-montserrat",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 600 700",
});

export const metadata: Metadata = {
  title: "FlashCode ⚡ - Built For Better",
  description:
    "A platform for students, faculty, and alumni to share knowledge, solve coding problems, and grow together.",
  icons: {
    icon: "/images/test.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
