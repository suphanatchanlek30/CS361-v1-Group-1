/** Image data returned by the public Faculty API. */
export interface FacultyImage {
  url: string;
  alt: string | null;
}

/** Kept for the Directory helper introduced in #26. */
export type ProfileImage = FacultyImage;

/**
 * Faculty Summary contract (#22 — frozen).
 * This is intentionally smaller than the detail contract below.
 */
export interface FacultySummaryName {
  th: string;
  en?: string | null;
}

export interface FacultySummary {
  id: string;
  name: FacultySummaryName;
  academic_position?: string | null;
  profile_image?: FacultyImage | null;
  research_interests?: string[];
}

export interface FacultyListResponse {
  data: FacultySummary[];
}

export interface FacultyName {
  th: string | null;
  en: string | null;
}

export interface FacultyBadge {
  url: string;
  label?: string | null;
}

export interface FacultyCv {
  url: string;
}

export interface FacultyContact {
  office: string | null;
  phone: string | null;
  extension: string | null;
  email: string | null;
}

export interface Education {
  degree: string | null;
  field: string | null;
  institution: string | null;
  country: string | null;
  graduation_year: number | string | null;
  additional_information: string | null;
}

export interface Publication {
  authors: string | string[] | null;
  title: string | null;
  year: number | string | null;
  venue: string | null;
  volume: string | null;
  issue: string | null;
  pages: string | null;
  doi: string | null;
  url: string | null;
  citation_text: string | null;
}

export interface ExternalProfile {
  provider: string;
  url: string;
}

export interface FacultyDetail {
  id: string;
  name: FacultyName;
  academic_position: string | null;
  profile_image: FacultyImage | null;
  badges: FacultyBadge[];
  cv: FacultyCv | null;
  contact: FacultyContact | null;
  education: Education[];
  research_interests: string[];
  expertise: string[];
  selected_publications: Publication[];
  publication_profiles: ExternalProfile[];
}

export interface FacultyDetailResponse {
  data: FacultyDetail;
}
