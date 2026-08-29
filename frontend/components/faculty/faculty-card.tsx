'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FacultySummary } from '@/types/faculty';

interface FacultyCardProps {
  faculty: FacultySummary;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  const [imgSrc, setImgSrc] = useState(faculty.profile_image || '/file.svg');

  const thaiName = faculty.name?.th || 'ไม่ระบุชื่อ';
  const englishName = faculty.name?.en || '';
  const position = faculty.academic_position || '';
  const interests = faculty.research_interests || [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* Profile Image Container */}
        <div className="relative w-full aspect-[3/4] bg-gray-100">
          <Image
            src={imgSrc}
            alt={thaiName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
            onError={() => setImgSrc('/file.svg')}
          />
        </div>

        {/* Info Content */}
        <div className="p-4 flex flex-col gap-1.5">
          <h3 className="font-bold text-[#800020] text-base leading-snug line-clamp-2">
            {englishName ? `${position} ${englishName}`.trim() : `${position} ${thaiName}`.trim()}
          </h3>
          
          {position && (
            <p className="text-xs text-gray-500 line-clamp-1">{position}</p>
          )}

          {interests.length > 0 && (
            <div className="mt-2 text-xs text-gray-600 flex items-start gap-1">
              <span className="text-gray-400">⚛</span>
              <span className="line-clamp-2">{interests.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Detail Button/Link */}
      <div className="p-4 pt-0">
        <Link
          href={`/faculties/${faculty.id}`}
          className="inline-flex items-center text-xs font-semibold text-[#800020] hover:underline gap-1"
        >
          ดูข้อมูลอาจารย์ <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};