'use client';

import { useEffect } from 'react';

import { ErrorState } from '@/components/faculty/error-state';
import { DirectoryBanner } from '@/components/faculty/directory-banner';

interface FacultiesErrorProps {
  error: Error & { digest?: string };
  /** Next.js 16 ส่ง `retry` มาให้ (เดิมชื่อ `reset`) — เรียกเพื่อ render segment ใหม่ */
  retry: () => void;
}

/**
 * Next.js file convention — error boundary ของ segment `/faculties`
 * ทุก error ที่ getFaculties() โยนออกมาจะมาโผล่ที่นี่ พร้อมข้อความสาเหตุจริง
 * (config / network / http / parse) ไม่ถูกเหมารวมเป็น "เชื่อมต่อไม่ได้"
 */
export default function FacultiesError({ error, retry }: FacultiesErrorProps) {
  useEffect(() => {
    console.error('[faculties] failed to load directory:', error);
  }, [error]);

  return (
    <div>
      <DirectoryBanner />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <ErrorState message={error.message} onRetry={retry} />
      </div>
    </div>
  );
}
