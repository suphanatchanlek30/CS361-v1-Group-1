import { FacultyListResponse, FacultySummary } from '@/types/faculty';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function getFaculties(): Promise<FacultySummary[]> {
  if (!API_BASE_URL) {
    throw new Error('ระบบยังไม่พร้อมใช้งานในขณะนี้');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/faculties`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลคณาจารย์ได้ กรุณาลองใหม่อีกครั้ง');
    }

    const result: FacultyListResponse = await response.json();
    return result.data || [];
  } catch (err) {
    if (err instanceof Error && err.message.includes('API Base URL')) {
      throw err;
    }
    throw new Error('ไม่สามารถเชื่อมต่อกับเครื่องแม่ข่ายได้ กรุณาลองใหม่อีกครั้ง');
  }
}