'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FacultySummary } from '@/types/faculty';

export const FacultyCard: React.FC<{ faculty: FacultySummary }> = ({ faculty }) => {
  const [imgError, setImgError] = useState(false);

  // ดึง URL รูปภาพรองรับทั้ง Object { url, alt } และ String
  const imageUrl = typeof faculty.profile_image === 'object' && faculty.profile_image?.url
    ? faculty.profile_image.url
    : typeof faculty.profile_image === 'string'
    ? faculty.profile_image
    : null;

  const imageAlt = typeof faculty.profile_image === 'object' && faculty.profile_image?.alt
    ? faculty.profile_image.alt
    : faculty.name.th;

  return (
    <Link
      href={`/faculties/${faculty.id}`}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
    >
      {/* Container รูปภาพ */}
      <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-md overflow-hidden mb-3">
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* ชื่อหลัก: แสดงเฉพาะ Thai Name เสมอตาม #26 และ Figma */}
      <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-[#81001D] transition-colors">
        {faculty.name.th}
      </h3>

      {/* ชื่อรอง: แสดง English Name ด้านล่างถ้ามี */}
      {faculty.name.en && (
        <p className="text-xs text-gray-500 mb-2">{faculty.name.en}</p>
      )}

      {/* ตำแหน่งทางวิชาการ: แสดงเพียงจุดเดียว */}
      {faculty.academic_position && (
        <p className="text-xs text-[#81001D] font-medium mb-3">
          {faculty.academic_position}
        </p>
      )}

      {/* ความสนใจงานวิจัย */}
      {faculty.research_interests && faculty.research_interests.length > 0 && (
        <div className="mt-auto pt-2 border-t border-gray-100">
          <p className="text-[11px] text-gray-500 line-clamp-2">
            <span className="font-semibold text-gray-700">สาขาที่เชี่ยวชาญ: </span>
            {faculty.research_interests.join(', ')}
          </p>
        </div>
      )}
    </Link>
  );
};