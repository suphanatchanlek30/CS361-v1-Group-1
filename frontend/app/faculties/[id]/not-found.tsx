import { ProfileState } from '@/components/faculty/profile-state';

/**
 * Next.js file convention — แสดงเมื่อหน้าเรียก notFound()
 * (detail API ตอบ 404) และส่ง HTTP 404 กลับไปจริงด้วย
 */
export default function FacultyNotFound() {
  return (
    <ProfileState
      title="ไม่พบข้อมูลอาจารย์ที่ต้องการ"
      description="ข้อมูลอาจารย์ท่านนี้อาจไม่มีอยู่ในระบบ หรือยังไม่ได้เปิดเผยในข้อมูลชุดนี้"
    />
  );
}
