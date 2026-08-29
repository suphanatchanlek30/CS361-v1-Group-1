export interface FacultyName {
  th: string;
  en?: string;
}

export interface FacultySummary {
  id: string;
  name: FacultyName;
  academic_position?: string;
  profile_image?: string;
  research_interests?: string[];
}

export interface FacultyListResponse {
  data: FacultySummary[];
}