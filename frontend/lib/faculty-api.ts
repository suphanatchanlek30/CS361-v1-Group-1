import type { FacultyDetail, FacultyDetailResponse } from "@/types/faculty";

export type FacultyApiErrorKind =
  | "invalid-id"
  | "not-found"
  | "server"
  | "network"
  | "configuration"
  | "invalid-response";

export class FacultyApiError extends Error {
  constructor(
    public readonly kind: FacultyApiErrorKind,
    public readonly status?: number,
  ) {
    super(messageFor(kind));
    this.name = "FacultyApiError";
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

function messageFor(kind: FacultyApiErrorKind): string {
  switch (kind) {
    case "invalid-id":
      return "รูปแบบรหัสอาจารย์ไม่ถูกต้อง";
    case "not-found":
      return "ไม่พบข้อมูลอาจารย์ที่ต้องการ";
    case "configuration":
      return "ยังไม่ได้ตั้งค่าการเชื่อมต่อข้อมูลอาจารย์";
    case "server":
    case "network":
    case "invalid-response":
      return "ไม่สามารถโหลดข้อมูลอาจารย์ได้ กรุณาลองใหม่อีกครั้ง";
  }
}

function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new FacultyApiError("configuration");
  }

  return API_BASE_URL;
}

function errorKindForStatus(status: number): FacultyApiErrorKind {
  if (status === 400) return "invalid-id";
  if (status === 404) return "not-found";
  return "server";
}

export async function getFacultyDetail(id: string): Promise<FacultyDetail> {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/api/v1/faculties/${encodeURIComponent(id)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new FacultyApiError(errorKindForStatus(response.status), response.status);
    }

    const payload: unknown = await response.json();
    if (!hasFacultyDetail(payload)) {
      throw new FacultyApiError("invalid-response");
    }

    return payload.data;
  } catch (error) {
    if (error instanceof FacultyApiError) {
      throw error;
    }

    throw new FacultyApiError("network");
  }
}

function hasFacultyDetail(payload: unknown): payload is FacultyDetailResponse {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "data" in payload &&
    typeof payload.data === "object" &&
    payload.data !== null &&
    "id" in payload.data &&
    typeof payload.data.id === "string"
  );
}
