import type { Metadata } from "next";
import { Inter, Rajdhani, Space_Mono } from "next/font/google";
import { StarfieldBackground } from "@/components/StarfieldBackground";
import "@/styles/globals.css";
import type { LayoutProps } from "@/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lorenzo Giuri | TypeScript Developer",
  description:
    "Portfolio di Lorenzo Giuri, sviluppatore TypeScript. Progetti web, app di budgeting e soluzioni frontend e backend con React, Next.js e Node.js.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
    <html
      lang="it"
      className={`${inter.variable} ${rajdhani.variable} ${spaceMono.variable}`}
    >
      <body>
        <StarfieldBackground />
        <div className="siteShell">{children}</div>
      </body>
    </html>
  );
}
