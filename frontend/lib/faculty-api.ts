import type {
  FacultyDetail,
  FacultyDetailResponse,
  FacultyListResponse,
  FacultySummary,
} from '@/types/faculty';

/**
 * Faculty API client — จุดเดียวในโปรเจกต์ที่รู้จัก URL ของ backend
 * ใช้ได้ทั้ง Directory Server Component และ Profile Client Component
 * และไม่แตะ S3 โดยตรงตามข้อกำหนด #26/#27
 */
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');

export type FacultyApiErrorKind =
  | 'config'
  | 'invalid-id'
  | 'not-found'
  | 'network'
  | 'http'
  | 'parse';

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

function isFacultyDetail(value: unknown): value is FacultyDetailResponse {
  if (typeof value !== 'object' || value === null || !('data' in value)) return false;

  const data = value.data;
  return typeof data === 'object' && data !== null && 'id' in data && typeof data.id === 'string';
}

function errorForResponse(response: Response): FacultyApiError {
  if (response.status === 400) {
    return new FacultyApiError('invalid-id', 'รูปแบบรหัสอาจารย์ไม่ถูกต้อง', response.status);
  }

  if (response.status === 404) {
    return new FacultyApiError('not-found', 'ไม่พบข้อมูลอาจารย์ที่ต้องการ', response.status);
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
      // Profile fetches in the browser too, so use a cache policy supported in both contexts.
      cache: 'no-store',
    });
  } catch {
    throw new FacultyApiError(
      'network',
      'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่อีกครั้ง'
    );
  }

  if (!response.ok) throw errorForResponse(response);

  try {
    return await response.json();
  } catch {
    throw new FacultyApiError('parse', 'ข้อมูลที่ได้รับจากเซิร์ฟเวอร์ไม่ถูกต้อง กรุณาแจ้งผู้ดูแลระบบ');
  }
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
    !Array.isArray(payload.data)
  ) {
    throw new FacultyApiError('parse', 'รูปแบบข้อมูลคณาจารย์ไม่ตรงกับที่ระบบรองรับ');
  }

  return payload.data.filter(isFacultySummary) as FacultyListResponse['data'];
}

/** `GET /api/v1/faculties/{id}` for the dynamic public Profile. */
export async function getFacultyDetail(id: string): Promise<FacultyDetail> {
  const payload = await getJson(`/api/v1/faculties/${encodeURIComponent(id)}`);

  if (!isFacultyDetail(payload)) {
    throw new FacultyApiError('parse', 'รูปแบบข้อมูลอาจารย์ไม่ตรงกับที่ระบบรองรับ');
  }

  return payload.data;
}
