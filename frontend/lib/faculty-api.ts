import 'server-only';

import type { FacultyListResponse, FacultySummary } from '@/types/faculty';

/**
 * Faculty API client — จุดเดียวในโปรเจกต์ที่รู้จัก URL ของ backend
 * โมดูลนี้ทำงานบน server เท่านั้น (`server-only`) จึงไม่มีทางหลุดไปฝั่ง browser
 * และไม่แตะ S3 โดยตรงตามข้อกำหนด #26
 */
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');

export type FacultyApiErrorKind = 'config' | 'network' | 'http' | 'parse';

/** แยกชนิด error เพื่อให้ error.tsx แสดงสาเหตุที่ถูกต้อง ไม่เหมารวมเป็น "เชื่อมต่อไม่ได้" */
export class FacultyApiError extends Error {
  readonly kind: FacultyApiErrorKind;
  readonly status?: number;

  constructor(kind: FacultyApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = 'FacultyApiError';
    this.kind = kind;
    this.status = status;
  }
}

function requireApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new FacultyApiError(
      'config',
      'ยังไม่ได้ตั้งค่า NEXT_PUBLIC_API_BASE_URL จึงยังเชื่อมต่อระบบไม่ได้'
    );
  }
  return API_BASE_URL;
}

/** ตรวจว่า payload ตรง contract #22 จริง ถ้าไม่ตรงให้ตัดทิ้ง ดีกว่าปล่อย null หลุดขึ้นหน้าจอ */
function isFacultySummary(value: unknown): value is FacultySummary {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;
  if (typeof candidate.id !== 'string' || candidate.id.length === 0) return false;

  const name = candidate.name as Record<string, unknown> | undefined;
  return typeof name === 'object' && name !== null && typeof name.th === 'string';
}

/**
 * `GET {NEXT_PUBLIC_API_BASE_URL}/api/v1/faculties`
 * อ่าน `{ "data": [...] }` ตาม contract #22 แล้วคืนเฉพาะรายการที่ผ่านการตรวจรูปแบบ
 */
export async function getFaculties(): Promise<FacultySummary[]> {
  const baseUrl = requireApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/v1/faculties`, {
      headers: { Accept: 'application/json' },
      // ข้อมูลคณาจารย์เปลี่ยนไม่บ่อย — cache ไว้ 5 นาที แล้วค่อย revalidate
      next: { revalidate: 300, tags: ['faculties'] },
    });
  } catch {
    throw new FacultyApiError(
      'network',
      'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่อีกครั้ง'
    );
  }

  if (!response.ok) {
    // ติดต่อเซิร์ฟเวอร์ได้ แต่เซิร์ฟเวอร์ตอบ error — ต้องไม่รายงานว่า "เชื่อมต่อไม่ได้"
    throw new FacultyApiError(
      'http',
      `เซิร์ฟเวอร์ตอบกลับด้วยข้อผิดพลาด (HTTP ${response.status}) กรุณาลองใหม่อีกครั้ง`,
      response.status
    );
  }

  let payload: FacultyListResponse;
  try {
    payload = (await response.json()) as FacultyListResponse;
  } catch {
    throw new FacultyApiError(
      'parse',
      'ข้อมูลที่ได้รับจากเซิร์ฟเวอร์ไม่ถูกต้อง กรุณาแจ้งผู้ดูแลระบบ'
    );
  }

  if (!Array.isArray(payload?.data)) {
    throw new FacultyApiError('parse', 'รูปแบบข้อมูลคณาจารย์ไม่ตรงกับที่ระบบรองรับ');
  }

  return payload.data.filter(isFacultySummary);
}

/** V1 ยังไม่มี detail endpoint (#27) — หยิบจากรายการเดียวกันด้วย id ที่เสถียร */
export async function getFacultyById(id: string): Promise<FacultySummary | null> {
  const faculties = await getFaculties();
  return faculties.find((faculty) => faculty.id === id) ?? null;
}
