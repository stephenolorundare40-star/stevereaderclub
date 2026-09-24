import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "STEVEREADERCLUB | A Private Literary Society & Managed Reader Experience",
  description:
    "STEVEREADERCLUB is an independent private literary society led by Prof Stephen. We connect brilliant independent authors with an elite global reading community for a structured, year-long journey of deep literary engagement.",
  keywords: [
    "STEVEREADERCLUB",
    "Steve Reader Club",
    "literary society",
    "book club",
    "Prof Stephen",
    "managed reader experience",
    "independent authors",
    "literary engagement",
  ],
  authors: [{ name: "Prof Stephen" }],
  openGraph: {
    title: "STEVEREADERCLUB | A Private Literary Society",
    description:
      "Where intellectual curiosity meets companionable consideration. A private literary society led by Prof Stephen.",
    siteName: "STEVEREADERCLUB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STEVEREADERCLUB | A Private Literary Society",
    description:
      "Where intellectual curiosity meets companionable consideration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
