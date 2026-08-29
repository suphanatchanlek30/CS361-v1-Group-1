import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Faculty Directory | Computer Science",
    template: "%s | Computer Science",
  },
  description:
    "Public faculty directory and academic profiles for the Department of Computer Science.",
  applicationName: "CS Faculty Directory",
  keywords: [
    "Computer Science",
    "Faculty",
    "Faculty Directory",
    "Academic Profile",
    "Research",
    "Thammasat University",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        <main className="flex-1">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}