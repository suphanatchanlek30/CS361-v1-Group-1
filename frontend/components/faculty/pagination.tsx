import Link from 'next/link';

import { buildDirectoryHref } from '@/lib/faculty';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const CELL =
  'flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-semibold transition-colors';
const ENABLED =
  'border-line bg-surface text-ink hover:border-brand hover:bg-brand-soft hover:text-brand';
const DISABLED = 'cursor-not-allowed border-line/40 bg-white text-ink-muted/30';

/** ย่อรายการหน้าเมื่อมีหลายหน้า เช่น 1 … 4 5 6 … 20 */
function buildPageList(currentPage: number, totalPages: number): Array<number | 'gap'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pageNumbers = new Set<number>([1, totalPages, currentPage]);
  if (currentPage - 1 > 1) pageNumbers.add(currentPage - 1);
  if (currentPage + 1 < totalPages) pageNumbers.add(currentPage + 1);

  const sorted = [...pageNumbers].sort((a, b) => a - b);

  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1] > 1 ? (['gap', page] as const) : [page]
  );
}

function ChevronIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === 'prev' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'}
      />
    </svg>
  );
}

/**
 * Server Component — เปลี่ยนหน้าด้วย <Link> ที่เขียนลง URL (`?page=`)
 * ทำให้กด back/forward และแชร์ลิงก์หน้าที่ 2 ได้ และไม่ต้องมี client state
 */
export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav aria-label="แบ่งหน้ารายชื่อคณาจารย์" className="mt-10 flex justify-center">
      <ul className="flex items-center gap-2">
        <li>
          {isFirst ? (
            <span className={`${CELL} ${DISABLED}`} aria-disabled="true" aria-label="หน้าก่อนหน้า">
              <ChevronIcon direction="prev" />
            </span>
          ) : (
            <Link
              href={buildDirectoryHref(currentPage - 1)}
              rel="prev"
              aria-label="หน้าก่อนหน้า"
              className={`${CELL} ${ENABLED}`}
            >
              <ChevronIcon direction="prev" />
            </Link>
          )}
        </li>

        {buildPageList(currentPage, totalPages).map((page, index) =>
          page === 'gap' ? (
            <li
              key={`gap-${index}`}
              aria-hidden="true"
              className="flex h-11 w-6 items-center justify-center text-sm text-ink-muted/60"
            >
              …
            </li>
          ) : (
            <li key={page}>
              {page === currentPage ? (
                <span className={`${CELL} border-brand bg-brand text-white shadow-sm shadow-brand/30`} aria-current="page">
                  {page}
                </span>
              ) : (
                <Link
                  href={buildDirectoryHref(page)}
                  aria-label={`หน้า ${page}`}
                  className={`${CELL} ${ENABLED}`}
                >
                  {page}
                </Link>
              )}
            </li>
          )
        )}

        <li>
          {isLast ? (
            <span className={`${CELL} ${DISABLED}`} aria-disabled="true" aria-label="หน้าถัดไป">
              <ChevronIcon direction="next" />
            </span>
          ) : (
            <Link
              href={buildDirectoryHref(currentPage + 1)}
              rel="next"
              aria-label="หน้าถัดไป"
              className={`${CELL} ${ENABLED}`}
            >
              <ChevronIcon direction="next" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
