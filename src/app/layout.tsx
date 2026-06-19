import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { DeveloperModeProvider } from "@/hooks/useDeveloperMode";

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
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [
      {
        rel: "manifest",
        url: "/favicon_io/site.webmanifest",
      },
    ],
  },
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
      <body className="min-h-full flex flex-col">
        <DeveloperModeProvider>{children}</DeveloperModeProvider>
      </body>
    </html>
  );
}
