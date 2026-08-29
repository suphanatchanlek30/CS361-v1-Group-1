import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ปักหมุด workspace root ไว้ที่ frontend/ เพื่อไม่ให้ Turbopack ไปเดาจาก
  // lockfile ที่อยู่นอกโฟลเดอร์นี้ (ที่มาของ warning "inferred your workspace root")
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // เผื่อไว้สำหรับหน้าที่ใช้ next/image ได้ — การ์ดคณาจารย์ใช้ <img> โดยตรง
    // เพราะ cs.sci.tu.ac.th บล็อก hotlink ผ่าน image optimizer
    remotePatterns: [{ protocol: 'https', hostname: 'cs.sci.tu.ac.th' }],
  },
};

export default nextConfig;
