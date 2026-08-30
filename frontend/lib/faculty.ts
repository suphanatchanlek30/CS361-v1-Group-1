import type { FacultySummary, ProfileImage } from '@/types/faculty';

/** Number of cards per page on the Directory page */
export const FACULTIES_PER_PAGE = 8;

/**
 * Normalizes `profile_image` into a single shape and guarantees `alt` is
 * never null/undefined — prevents the literal string "undefined" from
 * leaking into the DOM (#26).
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

/** Parses `?page=` into a page number that's always within a valid range */
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

/** Link to page n of the Directory */
export function buildDirectoryHref(page: number): string {
  return page > 1 ? `/faculties?page=${page}` : '/faculties';
}
