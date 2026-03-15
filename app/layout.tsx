import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import type { LayoutProps } from "@/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Lorenzo Giuri | TypeScript Developer",
  description:
    "Portfolio di Lorenzo Giuri, sviluppatore TypeScript. Progetti web, app di budgeting e soluzioni frontend e backend con React, Next.js e Node.js.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Lorenzo Giuri | TypeScript Developer",
    description:
      "Portfolio di Lorenzo Giuri, sviluppatore TypeScript. Progetti web, app di budgeting e soluzioni con React, Next.js e Node.js.",
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorenzo Giuri | TypeScript Developer",
    description:
      "Portfolio di Lorenzo Giuri, sviluppatore TypeScript. Progetti web e app con React, Next.js e Node.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="it" className={inter.variable}>
      <body>
        {/* Sfondo: video in loop */}
        <div className="bgAnimationLayer" aria-hidden="true">
          <video
            className="bgAnimationVideo"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          >
            <source src="/VideoAnimazione.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="mainContentLayer">{children}</div>
      </body>
    </html>
  );
}
