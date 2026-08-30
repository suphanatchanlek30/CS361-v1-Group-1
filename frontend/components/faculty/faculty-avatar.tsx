'use client';

import { useState } from 'react';

interface FacultyAvatarProps {
  url: string | null;
  alt: string;
  /** true = grid card (has hover zoom), false = detail page */
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
 * A small Client Component whose only job is the fallback when an image
 * fails to load (`onError` must run in the browser) — the rest of the card
 * stays a Server Component.
 *
 * Uses <img> instead of next/image because cs.sci.tu.ac.th blocks hotlinking
 * by referer, which stops Next's image optimizer from fetching the image.
 */
export function FacultyAvatar({ url, alt, interactive = false }: FacultyAvatarProps) {
  // Track the "url that failed" instead of a boolean so the state resets
  // itself when the url changes, without needing a useEffect (avoids the
  // placeholder getting stuck when the component is reused)
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
