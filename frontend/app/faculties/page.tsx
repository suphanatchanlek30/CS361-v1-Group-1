'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { getFaculties } from '@/lib/faculty-api';
import { FacultySummary } from '@/types/faculty';
import { FacultyCard } from '@/components/faculty/faculty-card';
import { LoadingState } from '@/components/faculty/loading-state';
import { ErrorState } from '@/components/faculty/error-state';
import { EmptyState } from '@/components/faculty/empty-state';

export default function FacultyDirectoryPage() {
  const [faculties, setFaculties] = useState<FacultySummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันสำหรับกด Retry
  const handleRetry = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFaculties();
      setFaculties(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  }, []);

  // โหลดข้อมูลครั้งแรกเมื่อ Mount (เปลี่ยนมาใช้ Promise เพื่อแก้ Synchronous setState in Effect)
  useEffect(() => {
    let isMounted = true;

    getFaculties()
      .then((data) => {
        if (isMounted) {
          setFaculties(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <section className="bg-[#FED65B] py-10 px-4 text-center">
        <p className="text-xs text-gray-700 tracking-wide uppercase mb-1">เกี่ยวกับสาขาวิชา</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">คณาจารย์</h1>
        <p className="text-sm text-gray-800">รายชื่อคณาจารย์ - ภาควิชาวิทยาการคอมพิวเตอร์</p>
      </section>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} onRetry={handleRetry} />}

        {!loading && !error && faculties.length === 0 && <EmptyState />}

        {!loading && !error && faculties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {faculties.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}