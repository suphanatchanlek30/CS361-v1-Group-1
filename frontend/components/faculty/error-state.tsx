interface ErrorStateProps {
  message?: string;
  /** ปุ่ม "ลองใหม่" จะแสดงก็ต่อเมื่อ caller ส่ง handler มา */
  onRetry?: () => void;
}

export function ErrorState({
  message = 'เกิดข้อผิดพลาดในการดึงข้อมูลคณาจารย์',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mx-auto my-8 max-w-lg rounded-xl border border-red-200 bg-red-50 p-8 text-center"
    >
      <svg
        className="mx-auto mb-4 h-10 w-10 text-red-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
        />
      </svg>

      <h2 className="mb-2 text-base font-bold text-red-800">ไม่สามารถโหลดข้อมูลคณาจารย์ได้</h2>
      <p className="text-sm text-red-700">{message}</p>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          ลองใหม่อีกครั้ง
        </button>
      ) : null}
    </div>
  );
}
