import { LoadingState } from '@/components/faculty/loading-state';
import { DirectoryBanner } from '@/components/faculty/directory-banner';

/**
 * Next.js file convention — แสดงอัตโนมัติระหว่างที่ Server Component ของ
 * segment `/faculties` กำลัง fetch ข้อมูล จึงไม่ต้องมี state `loading` ในโค้ด
 */
export default function FacultiesLoading() {
  return (
    <div>
      <DirectoryBanner />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 h-7 w-52 animate-pulse rounded bg-line/40" />
        <LoadingState />
      </div>
    </div>
  );
}
