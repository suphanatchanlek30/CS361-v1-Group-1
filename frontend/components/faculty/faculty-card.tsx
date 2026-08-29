import Link from 'next/link';

import { FacultyAvatar } from '@/components/faculty/faculty-avatar';
import { getProfileImage } from '@/lib/faculty';
import type { FacultySummary } from '@/types/faculty';

interface FacultyCardProps {
  faculty: FacultySummary;
}

function InterestIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-ink-muted"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5.5" cy="18" r="2.2" />
      <circle cx="18.5" cy="18" r="2.2" />
      <path d="M12 7.2v4.3m0 0-5 4.6m5-4.6 5 4.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
    </svg>
  );
}

/**
 * Server Component — ไม่ fetch detail API ต่อการ์ด แสดงเฉพาะ Faculty Summary (#22)
 * ฟิลด์ที่เป็น optional ทุกตัวถูกครอบด้วยเงื่อนไข จึงไม่มีทางแสดง null/undefined
 */
export function FacultyCard({ faculty }: FacultyCardProps) {
  const { url, alt } = getProfileImage(faculty);

  const interests = faculty.research_interests ?? [];
  const [primaryInterest] = interests;
  const extraInterestCount = Math.max(interests.length - 1, 0);

  return (
    <Link
      href={`/faculties/${faculty.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
    >
      <div className="aspect-4/5 w-full shrink-0 overflow-hidden bg-surface-alt">
        <FacultyAvatar url={url} alt={alt} interactive />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3
          title={faculty.name.th}
          className="truncate text-base font-extrabold leading-snug text-brand sm:text-lg"
        >
          {faculty.name.th}
        </h3>

        {faculty.name.en ? (
          <p lang="en" title={faculty.name.en} className="truncate text-xs text-ink-muted/80">
            {faculty.name.en}
          </p>
        ) : null}

        {faculty.academic_position ? (
          <p className="truncate text-sm text-ink">{faculty.academic_position}</p>
        ) : null}

        {/* mt-auto ดันบล็อกล่างชิดก้นการ์ด ความสูงการ์ดในแถวเดียวกันจึงเท่ากันเสมอ */}
        <div className="mt-auto pt-4">
          {primaryInterest ? (
            <div className="flex items-center gap-2 border-t border-line-soft pt-3">
              <InterestIcon />
              <span
                lang="en"
                title={interests.join(', ')}
                className="truncate text-xs text-ink-muted"
              >
                {primaryInterest}
              </span>
              {extraInterestCount > 0 ? (
                <span className="shrink-0 text-xs text-ink-muted/70">+{extraInterestCount}</span>
              ) : null}
            </div>
          ) : null}

          <span className="mt-3 flex items-center gap-1.5 text-sm font-bold text-brand">
            ดูข้อมูลอาจารย์
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
