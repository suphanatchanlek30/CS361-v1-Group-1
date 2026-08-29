import type { FacultySummary, ProfileImage } from '@/types/faculty';

/** จำนวนการ์ดต่อหนึ่งหน้าในหน้า Directory */
export const FACULTIES_PER_PAGE = 8;

/**
 * ทำให้ `profile_image` เหลือรูปแบบเดียวเสมอ และการันตีว่า `alt` ไม่มีทางเป็น
 * null/undefined — กันข้อความ "undefined" หลุดไปอยู่ใน DOM (#26)
 */
export function getProfileImage(faculty: FacultySummary): { url: string | null; alt: string } {
  const image: ProfileImage | null | undefined = faculty.profile_image;
  const url = typeof image?.url === 'string' && image.url.length > 0 ? image.url : null;
  const alt =
    typeof image?.alt === 'string' && image.alt.length > 0
      ? image.alt
      : `รูปประจำตัวของ ${faculty.name.th}`;

  return { url, alt };
}

/** แปลง `?page=` เป็นเลขหน้าที่อยู่ในช่วงที่ถูกต้องเสมอ */
export function resolvePageNumber(
  rawPage: string | string[] | undefined,
  totalPages: number
): number {
  const value = Array.isArray(rawPage) ? rawPage[0] : rawPage;
  const parsed = Number.parseInt(value ?? '', 10);

  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.min(parsed, Math.max(totalPages, 1));
}

export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export function paginate<T>(items: T[], page: number, perPage: number): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(Math.ceil(totalItems / perPage), 1);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalItems,
  };
}

/** ลิงก์ไปหน้าที่ n ของ Directory */
export function buildDirectoryHref(page: number): string {
  return page > 1 ? `/faculties?page=${page}` : '/faculties';
}
