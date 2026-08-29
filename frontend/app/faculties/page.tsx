import type { Metadata } from 'next';

import { DirectoryBanner } from '@/components/faculty/directory-banner';
import { EmptyState } from '@/components/faculty/empty-state';
import { FacultyCard } from '@/components/faculty/faculty-card';
import { Pagination } from '@/components/faculty/pagination';
import { getFaculties } from '@/lib/faculty-api';
import { FACULTIES_PER_PAGE, paginate, resolvePageNumber } from '@/lib/faculty';

export const metadata: Metadata = {
  title: 'คณาจารย์',
  description:
    'รายชื่อคณาจารย์ ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยธรรมศาสตร์',
};

interface FacultiesPageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

/**
 * Server Component — ดึงข้อมูลจาก `GET /api/v1/faculties` บน server
 * ถ้า getFaculties() โยน error จะตกไปที่ `error.tsx` ของ segment นี้เอง
 * และระหว่างรอ render จะเห็น `loading.tsx` — ไม่ต้องมี useEffect/useState เลย
 */
export default async function FacultiesPage({ searchParams }: FacultiesPageProps) {
  const params = await searchParams;
  const faculties = await getFaculties();

  const totalPages = Math.max(Math.ceil(faculties.length / FACULTIES_PER_PAGE), 1);
  const requestedPage = resolvePageNumber(params.page, totalPages);
  const { items, currentPage, totalItems } = paginate(
    faculties,
    requestedPage,
    FACULTIES_PER_PAGE
  );

  return (
    /* ไม่ใส่ <main> ซ้ำที่นี่ — layout.tsx มี <main> เดียวของทั้งเว็บอยู่แล้ว */
    <div>
      <DirectoryBanner />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <section aria-labelledby="faculty-list-heading">
          <h2
            id="faculty-list-heading"
            className="mb-6 flex items-center gap-2.5 text-lg font-bold text-ink"
          >
            <span className="h-5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            รายชื่อคณาจารย์
            <span className="text-sm font-medium text-ink-muted">({totalItems} ท่าน)</span>
          </h2>

          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
                {items.map((faculty) => (
                  /* key ใช้ id ที่เสถียรจาก API เสมอ ห้ามใช้ index ของ array */
                  <li key={faculty.id} className="h-full">
                    <FacultyCard faculty={faculty} />
                  </li>
                ))}
              </ul>

              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
