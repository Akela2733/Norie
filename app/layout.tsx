import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "./store-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Drawers from "@/components/Drawers";
import InitialLoader from "@/components/InitialLoader";
import CustomCursor from "@/components/CustomCursor";
import { TransitionProvider } from "@/components/TransitionContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NORIE | clothing brand",
  description: "where glam meets grunge. norie clothing brand premium collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col antialiased selection:bg-black selection:text-white"
        style={{ background: "#f0ece4", color: "#0a0a0a", cursor: "none" }}
      >
        <StoreProvider>
          <TransitionProvider>
            <InitialLoader />
            <CustomCursor />
            <Header />
            <main className="flex-grow flex flex-col pt-24">{children}</main>
            <Footer />
            <Drawers />
          </TransitionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
