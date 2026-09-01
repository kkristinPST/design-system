import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

// NJORD type stack: Inter for UI, JetBrains Mono for every number, tag and duration.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NJORD Design System",
  description: "Component and style documentation — desktop and mobile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      {/*
        suppressHydrationWarning: browser extensions inject attributes onto
        <body> before React hydrates (ColorZilla adds cz-shortcut-listen,
        Grammarly and Dark Reader do the same), which React reports as a
        hydration mismatch. It applies to this element only — one level deep —
        so a real mismatch inside the app is still reported.
      */}
      <body className="flex h-full bg-slate-50 text-ink" suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 min-h-screen overflow-y-auto px-10 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
