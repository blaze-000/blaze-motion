import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

const SITE = "https://motion.asmitsah.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "blaze-motion — Motion, tuned once",
    template: "%s · blaze-motion",
  },
  description:
    "A subtle, RSC-safe shadcn registry of motion primitives for Next.js. Install one command, wrap your div, and tune the whole feel from a single file.",
  keywords: ["motion", "framer motion", "shadcn", "registry", "Next.js", "React", "animation", "RSC"],
  authors: [{ name: "Asmit" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "blaze-motion",
    title: "blaze-motion — Motion, tuned once",
    description:
      "Subtle, RSC-safe motion primitives for Next.js + shadcn. Own-and-tweak, tuned from one file.",
  },
  twitter: {
    card: "summary_large_image",
    title: "blaze-motion — Motion, tuned once",
    description: "Subtle, RSC-safe motion primitives for Next.js + shadcn.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
