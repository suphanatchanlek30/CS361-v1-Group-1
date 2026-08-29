import Link from "next/link";

import { FacultyProfileImage } from "@/components/faculty/faculty-profile-image";
import type {
  Education,
  ExternalProfile,
  FacultyDetail,
  Publication,
} from "@/types/faculty";

interface SectionProps {
  faculty: FacultyDetail;
}

function SectionHeading({ id, th, en }: { id: string; th: string; en?: string }) {
  return (
    <div className="mb-5 border-b border-[#81001D]/20 pb-3">
      <h2 id={id} className="text-2xl font-bold text-stone-900">
        {th}
      </h2>
      {en && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#81001D]">{en}</p>}
    </div>
  );
}

function displayName(faculty: FacultyDetail): string {
  return faculty.name.th || faculty.name.en || "ข้อมูลอาจารย์";
}

function formatEducation(record: Education): string {
  return [record.degree, record.field && `(${record.field})`].filter(Boolean).join(" ");
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

function profileLabel(profile: ExternalProfile): string {
  const knownLabels: Record<string, string> = {
    google_scholar: "Google Scholar",
    researchgate: "ResearchGate",
    semantic_scholar: "Semantic Scholar",
    orcid: "ORCID",
    scopus: "Scopus",
    personal_website: "เว็บไซต์ส่วนตัว",
  };

  return knownLabels[profile.provider] || profile.provider.replace(/[_-]/g, " ");
}

export function FacultyProfileHeader({ faculty }: SectionProps) {
  const name = displayName(faculty);

  return (
    <section className="rounded-2xl border border-[#81001D]/20 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        <FacultyProfileImage image={faculty.profile_image} name={name} />
        <div className="min-w-0 flex-1">
          <h1 className="break-words text-3xl font-bold leading-tight text-[#81001D] sm:text-4xl">
            {name}
          </h1>
          {faculty.name.en && faculty.name.en !== name && (
            <p className="mt-2 break-words text-lg text-stone-600">{faculty.name.en}</p>
          )}
          {faculty.academic_position && (
            <p className="mt-3 text-base font-medium text-stone-700">{faculty.academic_position}</p>
          )}
          {faculty.badges.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {faculty.badges.map((badge, index) => (
                <span
                  key={`${badge.url}-${index}`}
                  className="rounded-full border border-[#81001D]/20 bg-[#81001D]/5 px-3 py-1 text-sm font-medium text-[#81001D]"
                >
                  {badge.label || "Academic badge"}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function FacultyCvSection({ faculty }: SectionProps) {
  if (!faculty.cv?.url) return null;

  return (
    <section aria-labelledby="cv-heading">
      <SectionHeading id="cv-heading" th="ประวัติย่อ" en="Curriculum Vitae" />
      <a
        href={faculty.cv.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-lg bg-[#81001D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650016] focus:outline-none focus:ring-2 focus:ring-[#81001D] focus:ring-offset-2"
      >
        เปิดประวัติย่อ (CV)
      </a>
    </section>
  );
}

export function FacultyContactSection({ faculty }: SectionProps) {
  const contact = faculty.contact;
  if (!contact || !Object.values(contact).some(Boolean)) return null;

  return (
    <section aria-labelledby="contact-heading">
      <SectionHeading id="contact-heading" th="ข้อมูลติดต่อ" en="Contact Information" />
      <dl className="grid gap-5 rounded-2xl border border-[#81001D]/20 bg-white p-5 sm:grid-cols-2 sm:p-6">
        {contact.office && (
          <div>
            <dt className="text-sm font-semibold text-[#81001D]">ห้องทำงาน</dt>
            <dd className="mt-1 break-words text-stone-700">{contact.office}</dd>
          </div>
        )}
        {contact.phone && (
          <div>
            <dt className="text-sm font-semibold text-[#81001D]">โทรศัพท์</dt>
            <dd className="mt-1">
              <a className="break-words text-stone-700 underline decoration-[#81001D]/30 underline-offset-4 hover:text-[#81001D]" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                {contact.phone}{contact.extension ? ` ต่อ ${contact.extension}` : ""}
              </a>
            </dd>
          </div>
        )}
        {contact.email && (
          <div>
            <dt className="text-sm font-semibold text-[#81001D]">อีเมล</dt>
            <dd className="mt-1">
              <a className="break-all text-stone-700 underline decoration-[#81001D]/30 underline-offset-4 hover:text-[#81001D]" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}

export function FacultyResearchInterestsSection({ faculty }: SectionProps) {
  if (faculty.research_interests.length === 0) return null;

  return (
    <section aria-labelledby="research-heading">
      <SectionHeading id="research-heading" th="หัวข้อวิจัยที่สนใจ" en="Research Interests" />
      <ul className="flex flex-wrap gap-2" aria-label="หัวข้อวิจัยที่สนใจ">
        {faculty.research_interests.map((interest, index) => (
          <li key={`${interest}-${index}`} className="rounded-full border border-amber-300 bg-[#FED65B] px-4 py-2 text-sm text-stone-800">
            {interest}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FacultyEducationSection({ faculty }: SectionProps) {
  if (faculty.education.length === 0) return null;

  return (
    <section aria-labelledby="education-heading">
      <SectionHeading id="education-heading" th="การศึกษา" en="Education" />
      <ol className="ml-2 border-l-2 border-[#81001D]/20 pl-6">
        {faculty.education.map((record, index) => (
          <li key={`${record.degree}-${record.institution}-${index}`} className="relative pb-7 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[1.96rem] top-1 size-4 rounded-full border-2 border-[#81001D] bg-white" />
            {formatEducation(record) && <h3 className="text-lg font-bold text-stone-900">{formatEducation(record)}</h3>}
            {[record.institution, record.country].filter(Boolean).join(", ") && (
              <p className="mt-1 text-stone-700">{[record.institution, record.country].filter(Boolean).join(", ")}</p>
            )}
            {record.graduation_year !== null && record.graduation_year !== undefined && (
              <p className="mt-1 text-sm text-stone-500">{record.graduation_year}</p>
            )}
            {record.additional_information && <p className="mt-2 text-sm text-stone-600">{record.additional_information}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FacultyExpertiseSection({ faculty }: SectionProps) {
  if (faculty.expertise.length === 0) return null;

  return (
    <section aria-labelledby="expertise-heading">
      <SectionHeading id="expertise-heading" th="ความเชี่ยวชาญ" en="Expertise" />
      <ul className="space-y-3 text-stone-700">
        {faculty.expertise.map((item, index) => (
          <li key={`${item}-${index}`} className="flex gap-3 leading-7">
            <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-[#81001D]" />
            <span className="min-w-0 break-words">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FacultyPublicationsSection({ faculty }: SectionProps) {
  return (
    <section aria-labelledby="publications-heading">
      <SectionHeading id="publications-heading" th="ผลงานตีพิมพ์ที่ได้รับเลือก" en="Selected Publications" />
      {faculty.selected_publications.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-5 text-stone-600">
          ยังไม่มีผลงานที่เปิดเผยในข้อมูลชุดนี้
        </p>
      ) : (
        <ol className="space-y-4">
          {faculty.selected_publications.map((publication, index) => (
            <PublicationCard key={`${publication.title}-${index}`} publication={publication} index={index + 1} />
          ))}
        </ol>
      )}
    </section>
  );
}

function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  const authors = Array.isArray(publication.authors) ? publication.authors.join(", ") : publication.authors;
  const meta = publicationMeta(publication);

  return (
    <li className="rounded-xl border border-[#81001D]/20 bg-white p-5">
      <p className="text-sm font-semibold text-[#81001D]">{index}.</p>
      {publication.title && <h3 className="mt-1 break-words text-lg font-bold leading-snug text-stone-900">{publication.title}</h3>}
      {authors && <p className="mt-2 break-words text-stone-700">{authors}</p>}
      {meta.length > 0 && <p className="mt-2 break-words text-sm text-stone-600">{meta.join(" · ")}</p>}
      {publication.doi && <p className="mt-3 break-all text-sm text-[#81001D]">DOI: {publication.doi}</p>}
      {publication.url && (
        <a
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-[#81001D] underline decoration-[#81001D]/40 underline-offset-4 hover:text-[#650016]"
        >
          เปิดผลงาน
        </a>
      )}
    </li>
  );
}

export function FacultyExternalProfilesSection({ faculty }: SectionProps) {
  if (faculty.publication_profiles.length === 0) return null;

  return (
    <section aria-labelledby="profiles-heading">
      <SectionHeading id="profiles-heading" th="โปรไฟล์ทางวิชาการ" en="Academic Profiles" />
      <ul className="flex flex-wrap gap-3">
        {faculty.publication_profiles.map((profile, index) => (
          <li key={`${profile.provider}-${profile.url}-${index}`}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg border border-[#81001D]/30 px-4 py-2.5 text-sm font-semibold text-[#81001D] transition hover:bg-[#81001D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#81001D] focus:ring-offset-2"
            >
              {profileLabel(profile)}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BackToFacultyDirectory() {
  return (
    <Link href="/faculties" className="inline-flex text-sm font-semibold text-[#81001D] underline decoration-[#81001D]/40 underline-offset-4 hover:text-[#650016] focus:outline-none focus:ring-2 focus:ring-[#81001D] focus:ring-offset-2">
      ← กลับหน้ารายชื่ออาจารย์
    </Link>
  );
}
