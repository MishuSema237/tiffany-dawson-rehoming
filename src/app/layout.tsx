import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL("https://tiffany-dawson-rehoming.vercel.app"),

  title: {
    default: "Tiffany Dawson's Rehoming | Maltipoo, Cavapoo & Poochon Puppies",
    template: "%s | Tiffany Dawson's Rehoming",
  },

  description:
    "Find healthy, home-raised Maltipoo, Cavapoo, and Poochon puppies ready for loving homes. Vet-checked, vaccinated, and responsibly rehomed across the U.S.",

  keywords: [
    "Maltipoo puppies",
    "Cavapoo puppies",
    "Poochon puppies",
    "puppies for adoption",
    "puppies for sale",
    "rehoming puppies",
    "hypoallergenic puppies",
    "family puppies",
    "Tiffany Dawson puppies"
  ],

  authors: [{ name: "Tiffany Dawson" }],
  creator: "Tiffany Dawson",
  publisher: "Tiffany Dawson's Rehoming",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://tiffany-dawson-rehoming.vercel.app",
  },

  openGraph: {
    type: "website",
    url: "https://tiffany-dawson-rehoming.vercel.app",
    title:
      "Tiffany Dawson's Rehoming | Loving Maltipoo, Cavapoo & Poochon Puppies",
    description:
      "Healthy, vet-checked Maltipoo, Cavapoo, and Poochon puppies raised with care and ready for loving homes.",
    siteName: "Tiffany Dawson's Rehoming",
    images: [
      {
        url: "/thumbnail.png", // place this inside /public
        width: 1200,
        height: 630,
        alt: "Tiffany Dawson's Rehoming Puppies",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Tiffany Dawson's Rehoming | Maltipoo, Cavapoo & Poochon Puppies",
    description:
      "Find healthy, home-raised puppies ready for loving families.",
    images: ["/thumbnail.png"],
  },

  category: "Pets",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Toaster position="top-right" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
