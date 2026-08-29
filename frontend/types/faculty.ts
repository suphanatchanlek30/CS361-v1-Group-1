export interface FacultyName {
  th: string;
  en?: string;
}

export interface ProfileImage{
  url : string;
  alt? : string;
}

export interface FacultySummary {
  id: string;
  name: FacultyName;
  academic_position?: string;
  profile_image?:ProfileImage | string | null;
  research_interests?: string[];
}

export interface FacultyListResponse {
  data: FacultySummary[];
}