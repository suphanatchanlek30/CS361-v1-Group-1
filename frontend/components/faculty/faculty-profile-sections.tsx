import Link from 'next/link';

import { FacultyAvatar } from '@/components/faculty/faculty-avatar';
import type {
  Education,
  ExternalProfile,
  FacultyDetail,
  Publication,
} from '@/types/faculty';

interface SectionProps {
  faculty: FacultyDetail;
}

/** ป้ายชื่อ provider ที่รู้จัก — provider อื่นแสดงตามที่ API ส่งมา ไม่เดาเอง */
const PROVIDER_LABELS: Record<string, string> = {
  google_scholar: 'Google Scholar',
  researchgate: 'ResearchGate',
  semantic_scholar: 'Semantic Scholar',
  orcid: 'ORCID',
  scopus: 'Scopus',
  personal_website: 'เว็บไซต์ส่วนตัว',
};

export function facultyDisplayName(faculty: FacultyDetail): string {
  return faculty.name.th || faculty.name.en || 'ข้อมูลอาจารย์';
}

function providerLabel(profile: ExternalProfile): string {
  return PROVIDER_LABELS[profile.provider] ?? profile.provider.replace(/[_-]/g, ' ');
}

/**
 * เบอร์โทรจาก API อาจมีข้อความไทยปนมา เช่น "02-564-4444 ต่อ 2157"
 * tel: รับเฉพาะตัวเลข จึงตัดตั้งแต่อักขระที่ไม่ใช่รูปแบบเบอร์โทรเป็นต้นไป
 * ถ้าเหลือตัวเลขน้อยเกินไปให้คืน null แล้วแสดงเป็นข้อความธรรมดาแทนลิงก์
 */
function toTelHref(phone: string): string | null {
  const [leading] = phone.split(/[^\d+\-() ]/);
  const digits = (leading ?? '').replace(/[^\d+]/g, '');
  return digits.length >= 6 ? digits : null;
}

function formatDegree(record: Education): string {
  return [record.degree, record.field && `(${record.field})`].filter(Boolean).join(' ');
}

function formatInstitution(record: Education): string {
  return [record.institution, record.country].filter(Boolean).join(', ');
}

function publicationMeta(publication: Publication): string[] {
  return [
    publication.year ? String(publication.year) : null,
    publication.venue,
    publication.volume ? `Vol. ${publication.volume}` : null,
    publication.issue ? `No. ${publication.issue}` : null,
    publication.pages ? `pp. ${publication.pages}` : null,
  ].filter((item): item is string => Boolean(item));
}

/** หัวข้อ section ใช้แถบแดงนำหน้า ชุดเดียวกับหัวข้อในหน้า Directory */
function SectionHeading({ id, th, en }: { id: string; th: string; en?: string }) {
  return (
    <div className="mb-5">
      <h2 id={id} className="flex items-center gap-2.5 text-xl font-bold text-ink">
        <span className="h-6 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
        {th}
      </h2>
      {en ? (
        <p lang="en" className="mt-1.5 ml-4 text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
          {en}
        </p>
      ) : null}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function FacultyProfileHeader({ faculty }: SectionProps) {
  const name = facultyDisplayName(faculty);
  const englishName = faculty.name.en && faculty.name.en !== name ? faculty.name.en : null;
  const imageUrl = faculty.profile_image?.url ?? null;
  const imageAlt = faculty.profile_image?.alt || `รูปประจำตัวของ ${name}`;

  return (
    <section className="bg-brand px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 text-center sm:flex-row sm:items-start sm:text-left">
        <div className="aspect-4/5 w-40 shrink-0 overflow-hidden rounded-xl border-4 border-white/25 bg-white/10 sm:w-44">
          <FacultyAvatar url={imageUrl} alt={imageAlt} />
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <h1 className="text-2xl font-extrabold leading-snug break-words text-white sm:text-3xl lg:text-4xl">
            {name}
          </h1>

          {englishName ? (
            <p lang="en" className="mt-2 text-base break-words text-white/75 sm:text-lg">
              {englishName}
            </p>
          ) : null}

          {faculty.academic_position ? (
            <p className="mt-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white">
              {faculty.academic_position}
            </p>
          ) : null}

          {faculty.badges.length > 0 ? (
            <ul className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
              {faculty.badges.map((badge) => (
                <li key={badge.url} className="rounded-lg bg-white/95 p-2">
                  {/* badge จาก API เป็นรูปภาพ จึง render เป็นรูปพร้อม alt จาก label */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badge.url}
                    alt={badge.label ?? 'เครื่องหมายเชิดชูเกียรติ'}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-10 w-auto max-w-52 object-contain"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CV                                                                  */
/* ------------------------------------------------------------------ */

export function FacultyCvSection({ faculty }: SectionProps) {
  if (!faculty.cv?.url) return null;

  return (
    <section aria-labelledby="cv-heading">
      <SectionHeading id="cv-heading" th="ประวัติย่อ" en="Curriculum Vitae" />
      <a
        href={faculty.cv.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
      >
        เปิดประวัติย่อ (CV)
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M18 14v5H5V6h5" />
        </svg>
        <span className="sr-only">(เปิดในแท็บใหม่)</span>
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export function FacultyContactSection({ faculty }: SectionProps) {
  const contact = faculty.contact;
  if (!contact || !Object.values(contact).some(Boolean)) return null;

  const telHref = contact.phone ? toTelHref(contact.phone) : null;
  const phoneText = contact.phone
    ? `${contact.phone}${contact.extension ? ` ต่อ ${contact.extension}` : ''}`
    : null;

  return (
    <section aria-labelledby="contact-heading">
      <SectionHeading id="contact-heading" th="ข้อมูลติดต่อ" en="Contact Information" />
      <Card>
        <dl className="grid gap-5 sm:grid-cols-2">
          {contact.office ? (
            <div>
              <dt className="text-xs font-bold tracking-wide text-brand uppercase">ห้องทำงาน</dt>
              <dd className="mt-1.5 break-words text-ink">{contact.office}</dd>
            </div>
          ) : null}

          {phoneText ? (
            <div>
              <dt className="text-xs font-bold tracking-wide text-brand uppercase">โทรศัพท์</dt>
              <dd className="mt-1.5 break-words text-ink">
                {telHref ? (
                  <a href={`tel:${telHref}`} className="underline underline-offset-4 hover:text-brand">
                    {phoneText}
                  </a>
                ) : (
                  phoneText
                )}
              </dd>
            </div>
          ) : null}

          {contact.email ? (
            <div>
              <dt className="text-xs font-bold tracking-wide text-brand uppercase">อีเมล</dt>
              <dd className="mt-1.5 break-all text-ink">
                <a
                  href={`mailto:${contact.email}`}
                  lang="en"
                  className="underline underline-offset-4 hover:text-brand"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </Card>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Research interests                                                  */
/* ------------------------------------------------------------------ */

export function FacultyResearchInterestsSection({ faculty }: SectionProps) {
  if (faculty.research_interests.length === 0) return null;

  return (
    <section aria-labelledby="research-heading">
      <SectionHeading id="research-heading" th="หัวข้อวิจัยที่สนใจ" en="Research Interests" />
      <ul className="flex flex-wrap gap-2">
        {faculty.research_interests.map((interest) => (
          <li
            key={interest}
            lang="en"
            className="rounded-full border border-line bg-surface-alt px-4 py-2 text-sm text-ink"
          >
            {interest}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export function FacultyEducationSection({ faculty }: SectionProps) {
  if (faculty.education.length === 0) return null;

  return (
    <section aria-labelledby="education-heading">
      <SectionHeading id="education-heading" th="การศึกษา" en="Education" />
      <ol className="ml-2 space-y-6 border-l-2 border-line pl-6">
        {faculty.education.map((record, index) => {
          const degree = formatDegree(record);
          const institution = formatInstitution(record);

          return (
            <li
              // ข้อมูลการศึกษาไม่มี id จาก API — ใช้เนื้อหา + ลำดับเป็น key
              key={`${record.degree ?? ''}-${record.institution ?? ''}-${index}`}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[1.9rem] size-3.5 rounded-full border-2 border-brand bg-surface"
              />
              {degree ? <h3 className="text-base font-bold text-ink">{degree}</h3> : null}
              {institution ? <p className="mt-1 text-sm text-ink-muted">{institution}</p> : null}
              {record.graduation_year ? (
                <p className="mt-1 text-sm font-medium text-brand">ปี {record.graduation_year}</p>
              ) : null}
              {record.additional_information ? (
                <p className="mt-1.5 text-sm text-ink-muted">{record.additional_information}</p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Expertise                                                           */
/* ------------------------------------------------------------------ */

export function FacultyExpertiseSection({ faculty }: SectionProps) {
  if (faculty.expertise.length === 0) return null;

  return (
    <section aria-labelledby="expertise-heading">
      <SectionHeading id="expertise-heading" th="ความเชี่ยวชาญ" en="Expertise" />
      <Card>
        <ul className="space-y-4">
          {faculty.expertise.map((item) => (
            <li key={item} className="flex gap-3 leading-7 text-ink">
              <span
                aria-hidden="true"
                className="mt-2.5 size-2 shrink-0 rounded-full bg-brand"
              />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Publications                                                        */
/* ------------------------------------------------------------------ */

export function FacultyPublicationsSection({ faculty }: SectionProps) {
  return (
    <section aria-labelledby="publications-heading">
      <SectionHeading
        id="publications-heading"
        th="ผลงานตีพิมพ์ที่ได้รับเลือก"
        en="Selected Publications"
      />

      {faculty.selected_publications.length === 0 ? (
        /* ข้อความต้องสื่อว่า "ชุดข้อมูลนี้ไม่มี" ไม่ใช่ "อาจารย์ไม่มีผลงาน" */
        <div className="rounded-xl border border-dashed border-line bg-surface-alt p-6 text-center text-sm text-ink-muted">
          ยังไม่มีผลงานที่เปิดเผยในข้อมูลชุดนี้
        </div>
      ) : (
        <ol className="space-y-4">
          {faculty.selected_publications.map((publication, index) => (
            <PublicationCard
              key={`${publication.title ?? publication.citation_text ?? ''}-${index}`}
              publication={publication}
              index={index + 1}
            />
          ))}
        </ol>
      )}
    </section>
  );
}

function PublicationCard({
  publication,
  index,
}: {
  publication: Publication;
  index: number;
}) {
  const authors = Array.isArray(publication.authors)
    ? publication.authors.join(', ')
    : publication.authors;
  const meta = publicationMeta(publication);

  // ถ้าไม่มี title เลย ใช้ citation_text เป็นเนื้อหาหลักแทน จะได้ไม่เหลือการ์ดว่าง
  const heading = publication.title ?? publication.citation_text;

  return (
    <li className="rounded-xl border border-line bg-surface p-5">
      <div className="flex gap-3">
        <span
          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand"
          aria-hidden="true"
        >
          {index}
        </span>

        <div className="min-w-0 flex-1">
          {heading ? (
            <h3 lang="en" className="text-base leading-snug font-bold break-words text-ink">
              {heading}
            </h3>
          ) : null}

          {authors ? (
            <p lang="en" className="mt-2 text-sm break-words text-ink-muted">
              {authors}
            </p>
          ) : null}

          {meta.length > 0 ? (
            <p lang="en" className="mt-2 text-sm break-words text-ink-muted">
              {meta.join(' · ')}
            </p>
          ) : null}

          {/* ผลงานที่ไม่มี DOI/URL ต้องยังแสดงได้ตามปกติ */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {publication.doi ? (
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                lang="en"
                className="text-xs font-semibold break-all text-brand underline underline-offset-4 hover:text-brand-hover"
              >
                DOI: {publication.doi}
                <span className="sr-only">(เปิดในแท็บใหม่)</span>
              </a>
            ) : null}

            {publication.url ? (
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand underline underline-offset-4 hover:text-brand-hover"
              >
                เปิดผลงาน
                <span className="sr-only">(เปิดในแท็บใหม่)</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* External profiles                                                   */
/* ------------------------------------------------------------------ */

export function FacultyExternalProfilesSection({ faculty }: SectionProps) {
  if (faculty.publication_profiles.length === 0) return null;

  return (
    <section aria-labelledby="profiles-heading">
      <SectionHeading id="profiles-heading" th="โปรไฟล์ทางวิชาการ" en="Academic Profiles" />
      <ul className="flex flex-wrap gap-3">
        {faculty.publication_profiles.map((profile) => (
          <li key={`${profile.provider}-${profile.url}`}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-brand-soft"
            >
              {providerLabel(profile)}
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5h5v5M19 5l-8 8M18 14v5H5V6h5"
                />
              </svg>
              <span className="sr-only">(เปิดในแท็บใหม่)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export function BackToFacultyDirectory({ tone = 'brand' }: { tone?: 'brand' | 'inverse' }) {
  return (
    <Link
      href="/faculties"
      className={
        tone === 'inverse'
          ? 'inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white'
          : 'inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover'
      }
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5" />
      </svg>
      กลับหน้ารายชื่อคณาจารย์
    </Link>
  );
}
