import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Latin ใช้ Plus Jakarta Sans ตาม design #30, Thai fallback เป็น Noto Sans Thai
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "คณาจารย์ | Computer Science Department",
    template: "%s | Computer Science Department",
  },
  description:
    "รายชื่อคณาจารย์ ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยธรรมศาสตร์",
  applicationName: "CS Faculty Directory",
  keywords: [
    "Computer Science",
    "Faculty",
    "Faculty Directory",
    "คณาจารย์",
    "วิทยาการคอมพิวเตอร์",
    "Thammasat University",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c3002f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${plusJakarta.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        {/* Skip link — a11y: ให้ผู้ใช้คีย์บอร์ดข้าม nav ไปยังเนื้อหาหลักได้ */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <Header />
        {/* <main> เดียวของทั้งเว็บ — หน้าอื่นห้ามซ้อน <main> ซ้ำ */}
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
