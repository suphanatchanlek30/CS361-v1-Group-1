'use client';

import { useState } from 'react';

interface FacultyAvatarProps {
  url: string | null;
  alt: string;
  /** true = การ์ดใน grid (มี hover zoom), false = หน้ารายละเอียด */
  interactive?: boolean;
}

function AvatarPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface-alt">
      <svg
        className="h-1/3 w-1/3 text-line"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"
        />
      </svg>
      <span className="sr-only">ไม่มีรูปภาพคณาจารย์</span>
    </div>
  );
}

/**
 * Client Component เล็ก ๆ ที่มีหน้าที่เดียวคือ fallback เมื่อรูปโหลดไม่ขึ้น
 * (`onError` ต้องรันบน browser) ส่วนที่เหลือของการ์ดยังเป็น Server Component
 *
 * ใช้ <img> แทน next/image เพราะ cs.sci.tu.ac.th บล็อก hotlink ผ่าน referer
 * ทำให้ image optimizer ของ Next ดึงรูปไม่ได้
 */
export function FacultyAvatar({ url, alt, interactive = false }: FacultyAvatarProps) {
  // เก็บ "url ที่โหลดพลาด" แทน boolean เพื่อให้สถานะ reset เองเมื่อ url เปลี่ยน
  // โดยไม่ต้องพึ่ง useEffect (กันค้างที่ placeholder ตอน component ถูก reuse)
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const hasError = failedUrl !== null && failedUrl === url;

  if (!url || hasError) {
    return <AvatarPlaceholder />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailedUrl(url)}
      className={
        interactive
          ? 'h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]'
          : 'h-full w-full object-cover object-top'
      }
    />
  );
}
