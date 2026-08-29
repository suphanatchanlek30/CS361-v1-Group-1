import { FacultyListResponse, FacultySummary } from '@/types/faculty';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function getFaculties(): Promise<FacultySummary[]> {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured');
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/faculties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch faculties: HTTP ${response.status}`);
  }

  const result: FacultyListResponse = await response.json();
  return result.data || [];
}