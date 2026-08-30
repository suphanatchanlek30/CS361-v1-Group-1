'use client';

import { useEffect } from 'react';

import { ProfileState } from '@/components/faculty/profile-state';

interface ProfileErrorProps {
  error: Error & { digest?: string };
  /** Next.js 16 passes `retry` (formerly named `reset`) — call it to re-render the segment */
  retry: () => void;
}

/**
 * Next.js file convention — error boundary for the `/faculties/[id]` segment.
 * Only handles network / http / parse / config; 404 and 400 are already
 * caught in the page.
 *
 * Note: production Next hides the real error message from a Server Component,
 * so this shows a safe generic message instead of leaking internal AWS/API errors.
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
