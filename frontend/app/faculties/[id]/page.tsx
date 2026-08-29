import React from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FacultyDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">
        รายละเอียดคณาจารย์ (ID: {id})
      </h1>
      <p className="text-gray-600 mt-2">กำลังพัฒนาหน้ารายละเอียดคณาจารย์</p>
    </div>
  );
}