'use client';

import { useEffect } from 'react';

import { ErrorState } from '@/components/faculty/error-state';
import { DirectoryBanner } from '@/components/faculty/directory-banner';

interface FacultiesErrorProps {
  error: Error & { digest?: string };
  /** Next.js 16 passes `retry` (formerly named `reset`) — call it to re-render the segment */
  retry: () => void;
}

/**
 * Next.js file convention — error boundary for the `/faculties` segment.
 * Every error getFaculties() throws surfaces here with its real cause
 * (config / network / http / parse), not lumped into a generic "can't connect".
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
