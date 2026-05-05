import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TechBird IT Services — Driving Digital Transformation",
  description:
    "TechBird IT Services is a premier technology partner specializing in ERP / ERPNext, custom software development, AI integration, cloud & DevOps, and marketing strategy. Serving 50+ countries.",
  keywords: [
    "TechBird IT Services",
    "ERPNext",
    "Frappe",
    "ERP solutions",
    "AI integration",
    "digital transformation",
    "cloud DevOps",
    "custom software development",
    "marketing strategy",
    "SaaS",
  ],
  authors: [{ name: "TechBird IT Services" }],
  openGraph: {
    title: "TechBird IT Services — Driving Digital Transformation",
    description: "Premier technology partner for ERP, AI, cloud, and digital transformation across 50+ countries.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBird IT Services — Driving Digital Transformation",
    description: "Premier technology partner for ERP, AI, cloud, and digital transformation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${syne.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
