/**
 * Next.js file convention — renders automatically while the
 * `/faculties/[id]` segment's Server Component is fetching data.
 * The skeleton mirrors the real header to reduce layout shift once data replaces it.
 */
export default function FacultyProfileLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">กำลังโหลดข้อมูลอาจารย์</span>

      {/* Static red header bar — no pulse, to avoid the page flickering */}
      <div className="bg-brand px-4 py-10 sm:px-6 sm:py-14" aria-hidden="true">
        <div className="mx-auto flex max-w-7xl animate-pulse flex-col items-center gap-7 sm:flex-row sm:items-start">
          <div className="aspect-4/5 w-40 shrink-0 rounded-xl border-4 border-white/25 bg-white/20 sm:w-44" />
          <div className="w-full space-y-4 pt-1">
            <div className="h-9 w-3/4 max-w-md rounded bg-white/25" />
            <div className="h-5 w-2/3 max-w-sm rounded bg-white/20" />
            <div className="h-8 w-40 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12" aria-hidden="true">
        <div className="h-5 w-52 animate-pulse rounded bg-line/50" />

        <div className="mt-8 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <div className="mb-8 h-64 animate-pulse rounded-xl bg-line/30 lg:mb-0" />

          <div className="space-y-12">
            {['contact', 'research', 'education', 'publications'].map((section) => (
              <div key={section} className="animate-pulse space-y-4">
                <div className="h-7 w-56 rounded bg-line/50" />
                <div className="h-28 rounded-xl bg-line/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
