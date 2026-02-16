import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import CinematicOverlay from "@/components/ui/CinematicOverlay";
import { UserProgressProvider } from "@/context/UserProgressContext";
import FocusHangar from "@/components/ui/FocusHangar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HuskyMind | Anti-Gravity Career OS",
  description: "The world's first Anti-Gravity Career Operating System.",
};

import { ApiKeyProvider } from "@/context/ApiKeyContext";
import ApiKeyModal from "@/components/ui/ApiKeyModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[#0a0b1e] text-white min-h-screen overflow-x-hidden overflow-y-auto`}
      >
        <ApiKeyProvider>
          <UserProgressProvider>
            <CinematicOverlay />
            <ApiKeyModal />
            <FocusHangar />
            {children}
          </UserProgressProvider>
        </ApiKeyProvider>
      </body>
    </html>
  );
}
