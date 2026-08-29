"use client";

import { use, useEffect, useState } from "react";

import {
  BackToFacultyDirectory,
  FacultyContactSection,
  FacultyCvSection,
  FacultyEducationSection,
  FacultyExpertiseSection,
  FacultyExternalProfilesSection,
  FacultyProfileHeader,
  FacultyPublicationsSection,
  FacultyResearchInterestsSection,
} from "@/components/faculty/faculty-profile-sections";
import { FacultyApiError, getFacultyDetail } from "@/lib/faculty-api";
import type { FacultyDetail } from "@/types/faculty";

type LoadState = "loading" | "loaded" | "invalid-id" | "not-found" | "error";

const sectionLinks = [
  { id: "contact-heading", label: "ข้อมูลติดต่อ", condition: (faculty: FacultyDetail) => Boolean(faculty.contact && Object.values(faculty.contact).some(Boolean)) },
  { id: "research-heading", label: "หัวข้อวิจัยที่สนใจ", condition: (faculty: FacultyDetail) => faculty.research_interests.length > 0 },
  { id: "education-heading", label: "การศึกษา", condition: (faculty: FacultyDetail) => faculty.education.length > 0 },
  { id: "expertise-heading", label: "ความเชี่ยวชาญ", condition: (faculty: FacultyDetail) => faculty.expertise.length > 0 },
  { id: "publications-heading", label: "ผลงานตีพิมพ์", condition: () => true },
  { id: "profiles-heading", label: "โปรไฟล์ทางวิชาการ", condition: (faculty: FacultyDetail) => faculty.publication_profiles.length > 0 },
];

export default function FacultyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <FacultyProfileContent key={id} id={id} />;
}

function FacultyProfileContent({ id }: { id: string }) {
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;

    void getFacultyDetail(id)
      .then((detail) => {
        if (!isCurrentRequest) return;
        setFaculty(detail);
        setLoadState("loaded");
      })
      .catch((error: unknown) => {
        if (!isCurrentRequest) return;
        setFaculty(null);

        if (error instanceof FacultyApiError && error.kind === "invalid-id") {
          setLoadState("invalid-id");
          return;
        }

        if (error instanceof FacultyApiError && error.kind === "not-found") {
          setLoadState("not-found");
          return;
        }

        setLoadState("error");
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [id, retryCount]);

  if (loadState === "loading") {
    return <FacultyProfileLoading />;
  }

  if (loadState === "invalid-id") {
    return <ProfileState title="รูปแบบรหัสอาจารย์ไม่ถูกต้อง" description="กรุณาเลือกรายชื่ออาจารย์จากหน้ารายชื่ออีกครั้ง" />;
  }

  if (loadState === "not-found") {
    return <ProfileState title="ไม่พบข้อมูลอาจารย์ที่ต้องการ" description="ข้อมูลอาจารย์นี้อาจไม่มีอยู่ หรือไม่ได้เปิดเผยในระบบ" />;
  }

  if (loadState === "error" || !faculty) {
    return (
      <ProfileState
        title="ไม่สามารถโหลดข้อมูลอาจารย์ได้"
        description="กรุณาลองใหม่อีกครั้ง"
        onRetry={() => {
          setFaculty(null);
          setLoadState("loading");
          setRetryCount((count) => count + 1);
        }}
      />
    );
  }

  const visibleSectionLinks = sectionLinks.filter((link) => link.condition(faculty));

  return (
    <main className="bg-stone-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <BackToFacultyDirectory />

        <div className="mt-6 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <aside className="mb-6 lg:mb-0">
            <nav aria-label="หัวข้อข้อมูลอาจารย์" className="overflow-x-auto rounded-xl border border-[#81001D]/15 bg-white p-3 lg:sticky lg:top-24 lg:overflow-visible">
              <ul className="flex min-w-max gap-1 lg:block lg:min-w-0 lg:space-y-1">
                {visibleSectionLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-[#81001D]/5 hover:text-[#81001D] focus:outline-none focus:ring-2 focus:ring-[#81001D] focus:ring-offset-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0 space-y-12">
            <FacultyProfileHeader faculty={faculty} />
            <FacultyCvSection faculty={faculty} />
            <FacultyContactSection faculty={faculty} />
            <FacultyResearchInterestsSection faculty={faculty} />
            <FacultyEducationSection faculty={faculty} />
            <FacultyExpertiseSection faculty={faculty} />
            <FacultyPublicationsSection faculty={faculty} />
            <FacultyExternalProfilesSection faculty={faculty} />
          </article>
        </div>
      </div>
    </main>
  );
}

function FacultyProfileLoading() {
  return (
    <main className="bg-stone-50 px-4 py-8 sm:py-12" aria-busy="true" aria-label="กำลังโหลดข้อมูลอาจารย์">
      <div className="mx-auto max-w-5xl animate-pulse space-y-8">
        <div className="h-5 w-44 rounded bg-stone-200" />
        <div className="rounded-2xl border border-stone-200 bg-white p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="size-36 rounded-2xl bg-stone-200 sm:size-44" />
            <div className="w-full space-y-3">
              <div className="h-10 max-w-xl rounded bg-stone-200" />
              <div className="h-6 max-w-sm rounded bg-stone-200" />
              <div className="h-5 max-w-52 rounded bg-stone-200" />
            </div>
          </div>
        </div>
        {["contact", "research", "education", "publications"].map((section) => (
          <div key={section} className="space-y-4">
            <div className="h-8 w-56 rounded bg-stone-200" />
            <div className="h-28 rounded-2xl bg-white" />
          </div>
        ))}
      </div>
    </main>
  );
}

function ProfileState({
  title,
  description,
  onRetry,
}: {
  title: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <main className="bg-stone-50 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#81001D]/20 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
        <p className="mt-3 text-stone-600">{description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-lg bg-[#81001D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650016] focus:outline-none focus:ring-2 focus:ring-[#81001D] focus:ring-offset-2"
            >
              ลองใหม่อีกครั้ง
            </button>
          )}
          <BackToFacultyDirectory />
        </div>
      </div>
    </main>
  );
}
