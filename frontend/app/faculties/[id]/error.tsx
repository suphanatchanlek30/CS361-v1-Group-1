'use client';

import { useEffect } from 'react';

import { ProfileState } from '@/components/faculty/profile-state';

interface ProfileErrorProps {
  error: Error & { digest?: string };
  /** Next.js 16 ส่ง `retry` มาให้ (เดิมชื่อ `reset`) — เรียกเพื่อ render segment ใหม่ */
  retry: () => void;
}

/**
 * Next.js file convention — error boundary ของ segment `/faculties/[id]`
 * รับเฉพาะ network / http / parse / config ส่วน 404 กับ 400 ถูกดักที่ page แล้ว
 *
 * หมายเหตุ: production Next จะซ่อนข้อความ error จริงจาก Server Component
 * จึงแสดงข้อความกลางที่ปลอดภัย ไม่หลุด error ภายในของ AWS/API ออกหน้าเว็บ
 */
export default function FacultyProfileError({ error, retry }: ProfileErrorProps) {
  useEffect(() => {
    console.error('[faculties/:id] failed to load profile:', error);
  }, [error]);

  return (
    <ProfileState
      title="ไม่สามารถโหลดข้อมูลอาจารย์ได้"
      description="ระบบเชื่อมต่อกับเซิร์ฟเวอร์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
      onRetry={retry}
    />
  );
}
