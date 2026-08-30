import { ProfileState } from '@/components/faculty/profile-state';

/**
 * Next.js file convention — renders when the page calls notFound()
 * (the detail API responded 404), and actually sends back HTTP 404.
 */
export default function FacultyNotFound() {
  return (
    <ProfileState
      title="ไม่พบข้อมูลอาจารย์ที่ต้องการ"
      description="ข้อมูลอาจารย์ท่านนี้อาจไม่มีอยู่ในระบบ หรือยังไม่ได้เปิดเผยในข้อมูลชุดนี้"
    />
  );
}
