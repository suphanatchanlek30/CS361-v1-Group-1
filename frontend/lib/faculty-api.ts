import 'server-only';

import type {
  FacultyDetail,
  FacultyDetailResponse,
  FacultyListResponse,
  FacultySummary,
} from '@/types/faculty';

/**
 * Faculty API client — จุดเดียวในโปรเจกต์ที่รู้จัก URL ของ backend
 * โมดูลนี้ทำงานบน server เท่านั้น (`server-only`) จึงไม่มีทางหลุดไปฝั่ง browser
 * และไม่แตะ S3 โดยตรงตามข้อกำหนด #26/#27
 */
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');

/** cache 5 นาทีแล้วค่อย revalidate — ข้อมูลคณาจารย์ไม่ได้เปลี่ยนบ่อย */
const REVALIDATE_SECONDS = 300;

export type FacultyApiErrorKind =
  | 'config'
  | 'invalid-id'
  | 'not-found'
  | 'network'
  | 'http'
  | 'parse';

/** แยกชนิด error เพื่อให้หน้าแสดงสาเหตุที่ถูกต้อง ไม่เหมารวมเป็น "เชื่อมต่อไม่ได้" */
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

/** map HTTP status → error kind ที่หน้า UI เอาไปเลือกข้อความได้ตรงสาเหตุ */
function errorForResponse(response: Response): FacultyApiError {
  if (response.status === 400) {
    return new FacultyApiError('invalid-id', 'รูปแบบรหัสอาจารย์ไม่ถูกต้อง', 400);
  }

  if (response.status === 404) {
    return new FacultyApiError('not-found', 'ไม่พบข้อมูลอาจารย์ที่ต้องการ', 404);
  }

  return new FacultyApiError(
    'http',
    `เซิร์ฟเวอร์ตอบกลับด้วยข้อผิดพลาด (HTTP ${response.status}) กรุณาลองใหม่อีกครั้ง`,
    response.status
  );
}

async function getJson(path: string): Promise<unknown> {
  const baseUrl = requireApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS, tags: ['faculties'] },
    });
  } catch {
    // ยิงไม่ถึงเซิร์ฟเวอร์เลย เช่น เน็ตหลุด / DNS ไม่ตอบ
    throw new FacultyApiError(
      'network',
      'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่อีกครั้ง'
    );
  }

  if (!response.ok) throw errorForResponse(response);

  try {
    return await response.json();
  } catch {
    throw new FacultyApiError(
      'parse',
      'ข้อมูลที่ได้รับจากเซิร์ฟเวอร์ไม่ถูกต้อง กรุณาแจ้งผู้ดูแลระบบ'
    );
  }
}

/** ตรวจว่า payload ตรง contract #22 จริง ถ้าไม่ตรงให้ตัดทิ้ง ดีกว่าปล่อย null หลุดขึ้นหน้าจอ */
function isFacultySummary(value: unknown): value is FacultySummary {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;
  if (typeof candidate.id !== 'string' || candidate.id.length === 0) return false;

  const name = candidate.name as Record<string, unknown> | undefined;
  return typeof name === 'object' && name !== null && typeof name.th === 'string';
}

function isFacultyDetailResponse(value: unknown): value is FacultyDetailResponse {
  if (typeof value !== 'object' || value === null || !('data' in value)) return false;

  const data = (value as { data: unknown }).data;
  if (typeof data !== 'object' || data === null) return false;

  const candidate = data as Record<string, unknown>;
  return typeof candidate.id === 'string' && candidate.id.length > 0;
}

/**
 * `GET {NEXT_PUBLIC_API_BASE_URL}/api/v1/faculties`
 * อ่าน `{ "data": [...] }` ตาม contract #22 แล้วคืนเฉพาะรายการที่ผ่านการตรวจรูปแบบ
 */
export async function getFaculties(): Promise<FacultySummary[]> {
  const payload = await getJson('/api/v1/faculties');

  if (
    typeof payload !== 'object' ||
    payload === null ||
    !('data' in payload) ||
    !Array.isArray((payload as FacultyListResponse).data)
  ) {
    throw new FacultyApiError('parse', 'รูปแบบข้อมูลคณาจารย์ไม่ตรงกับที่ระบบรองรับ');
  }

  return (payload as FacultyListResponse).data.filter(isFacultySummary);
}

/**
 * `GET {NEXT_PUBLIC_API_BASE_URL}/api/v1/faculties/{id}` สำหรับหน้า Profile (#27)
 * 400 → invalid-id, 404 → not-found ให้หน้าเลือกแสดงสถานะได้ถูกต้อง
 */
export async function getFacultyDetail(id: string): Promise<FacultyDetail> {
  const payload = await getJson(`/api/v1/faculties/${encodeURIComponent(id)}`);

  if (!isFacultyDetailResponse(payload)) {
    throw new FacultyApiError('parse', 'รูปแบบข้อมูลอาจารย์ไม่ตรงกับที่ระบบรองรับ');
  }

  return payload.data;
}
