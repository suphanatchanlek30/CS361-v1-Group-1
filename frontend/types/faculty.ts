/**
 * Faculty Summary contract (#22 — frozen)
 * ห้ามเพิ่ม field ที่ไม่ได้อยู่ใน contract
 */
export interface FacultyName {
  th: string;
  en?: string;
}

export interface ProfileImage {
  url: string;
  alt?: string;
}

export interface FacultySummary {
  id: string;
  name: FacultyName;
  academic_position?: string;
  profile_image?: ProfileImage | null;
  research_interests?: string[];
}

export interface FacultyListResponse {
  data: FacultySummary[];
}
