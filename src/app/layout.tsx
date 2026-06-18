import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Undangan Walimatul Khitan - Akmal Zikri Alghifari (Zikri)",
  description: "Undangan Syukuran Khitanan   Akmal Zikri Alghifari (Zikri). Minggu, 28 Juni 2026 di Cafe Sorojakeun, Soreang, Bandung.",
  metadataBase: new URL("https://zikri-khitanan.vercel.app"), // Fallback base URL for metadata
  openGraph: {
    title: "Walimatul Khitan - Akmal Zikri Alghifari (Zikri)",
    description: "Undangan Syukuran Khitanan   Akmal Zikri Alghifari (Zikri). Minggu, 28 Juni 2026 di Cafe Sorojakeun, Soreang, Bandung.",
    url: "/",
    siteName: "Undangan Khitanan Zikri",
    images: [
      {
        url: "/decor-1.png",
        width: 800,
        height: 1200,
        alt: "Undangan Khitanan Zikri",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Walimatul Khitan - Akmal Zikri Alghifari (Zikri)",
    description: "Undangan Syukuran Khitanan   Akmal Zikri Alghifari (Zikri). Minggu, 28 Juni 2026 di Cafe Sorojakeun, Soreang, Bandung.",
    images: ["/decor-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
