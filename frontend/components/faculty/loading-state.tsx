/** ใช้ key เป็นค่าคงที่แทน index เพื่อไม่ให้ผิดกติกา "ห้ามใช้ array index เป็น key" */
const SKELETON_SLOTS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;

function FacultyCardSkeleton() {
  return (
    <div
      className="flex h-full animate-pulse flex-col overflow-hidden rounded-xl border border-line bg-surface"
      aria-hidden="true"
    >
      <div className="aspect-4/5 w-full bg-line/40" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-5 w-4/5 rounded bg-line/40" />
        <div className="h-3 w-3/5 rounded bg-line/30" />
        <div className="h-4 w-2/5 rounded bg-line/30" />
        <div className="mt-auto pt-4">
          <div className="border-t border-line-soft pt-3">
            <div className="h-3 w-3/4 rounded bg-line/30" />
          </div>
          <div className="mt-3 h-4 w-1/2 rounded bg-line/40" />
        </div>
      </div>
    </div>
  );
}

/**
 * โครงร่างต้องตรงกับ FacultyCard ทุกส่วน (รูป 4/5 → ชื่อ → ชื่ออังกฤษ → ตำแหน่ง
 * → เส้นคั่น → CTA) เพื่อไม่ให้เกิด layout shift ตอนข้อมูลจริงมาแทน
 */
export function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
    >
      <span className="sr-only">กำลังโหลดข้อมูลคณาจารย์</span>
      {SKELETON_SLOTS.map((slot) => (
        <FacultyCardSkeleton key={slot} />
      ))}
    </div>
  );
}
