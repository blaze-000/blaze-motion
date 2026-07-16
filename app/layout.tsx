import type { Metadata } from "next";
import { Schibsted_Grotesk, Spline_Sans_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgressBar } from "@/components/motion/scroll-progress-bar";
import { ShaderBackground } from "@/components/site/shader-background";
import "./globals.css";

const sans = Schibsted_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = Spline_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE = "https://motion.asmitsah.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "blaze-motion — Motion, tuned once",
    template: "%s · blaze-motion",
  },
  description:
    "Subtle, RSC-safe motion primitives for Next.js + shadcn. One command installs the whole engine into your repo — you own the files, and retune the entire feel from a single object.",
  keywords: [
    "motion",
    "motion.dev",
    "framer motion",
    "shadcn",
    "registry",
    "Next.js",
    "React",
    "animation",
    "RSC",
  ],
  authors: [{ name: "Asmit" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "blaze-motion",
    title: "blaze-motion — Motion, tuned once",
    description:
      "Subtle, RSC-safe motion primitives for Next.js + shadcn. Own the files, tune the whole feel from one object.",
  },
  twitter: {
    card: "summary_large_image",
    title: "blaze-motion — Motion, tuned once",
    description: "Subtle, RSC-safe motion primitives for Next.js + shadcn.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh">
        <ShaderBackground />
        <MotionProvider>
          <ScrollProgressBar />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
