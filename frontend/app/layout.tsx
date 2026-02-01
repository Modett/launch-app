import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Modett – Elegance, Amplified",
  description:
    "Modett is a contemporary womenswear label focused on chic statement pieces and timeless wardrobe staples.",
  metadataBase: new URL("https://modett.com"),
  openGraph: {
    title: "Modett – Elegance, Amplified",
    description:
      "Contemporary womenswear. Statement silhouettes. Elevated essentials.",
    url: "https://modett.com",
    siteName: "Modett",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Modett – Elegance, Amplified",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
