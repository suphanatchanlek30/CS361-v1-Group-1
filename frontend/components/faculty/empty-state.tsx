export function EmptyState() {
  return (
    <div className="mx-auto my-8 max-w-lg rounded-xl border border-line bg-surface-alt p-10 text-center">
      <svg
        className="mx-auto mb-4 h-12 w-12 text-line"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"
        />
      </svg>

      <h3 className="mb-2 text-base font-bold text-ink">ยังไม่มีข้อมูลคณาจารย์</h3>
      <p className="text-sm text-ink-muted">ขณะนี้ยังไม่มีรายชื่อคณาจารย์แสดงในระบบ</p>
    </div>
  );
}
