import Image from 'next/image';

import csTuLogo from '@/public/cs-tu-logo.png';

/**
 * Footer links per design #30 — V1 has no real destination pages yet,
 * so these render as focusable <button aria-disabled> elements instead of
 * a <span cursor-pointer> that looks like a link but is unreachable by keyboard.
 */
const FOOTER_LINKS = [
  'นโยบายความเป็นส่วนตัว',
  'ข้อกำหนดการใช้งาน',
  'ทำเนียบมหาวิทยาลัย',
  'แผนผังเว็บไซต์',
];

export function Footer() {
  return (
    <footer className="mt-auto bg-footer">
      {/* Red divider line on top, matching the one under the navbar */}
      <div className="h-1 w-full bg-brand" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          {/* Logo + copyright */}
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <Image
              src={csTuLogo}
              alt="Computer Science, Thammasat University"
              sizes="176px"
              className="h-12 w-auto"
            />
            <p className="max-w-md text-xs leading-relaxed text-ink-muted" lang="en">
              &copy; {new Date().getFullYear()} Thammasat University, Faculty of Science and
              Technology, Department of Computer Science. All rights reserved.
            </p>
          </div>

          {/* Footer links */}
          <nav aria-label="ลิงก์ท้ายเว็บ" className="shrink-0">
            <h2 className="mb-4 text-center text-xs font-bold tracking-wide text-brand uppercase md:text-left">
              ลิงก์ที่เกี่ยวข้อง
            </h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
              {FOOTER_LINKS.map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    aria-disabled="true"
                    title="อยู่ระหว่างพัฒนา"
                    className="flex cursor-not-allowed items-start gap-2 text-left text-xs leading-relaxed text-ink-muted/70"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line"
                      aria-hidden="true"
                    />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
