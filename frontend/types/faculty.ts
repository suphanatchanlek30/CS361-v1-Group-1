export interface FacultyName {
  th: string | null;
  en: string | null;
}

export interface FacultyImage {
  url: string;
  alt: string | null;
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
