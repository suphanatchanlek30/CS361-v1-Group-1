import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500 my-8 max-w-lg mx-auto shadow-sm">
      <div className="text-4xl mb-3">👥</div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">
        ไม่พบข้อมูลคณาจารย์
      </h3>
      <p className="text-xs text-gray-500">
        ขณะนี้ยังไม่มีข้อมูลรายชื่อคณาจารย์แสดงในระบบ
      </p>
    </div>
  );
};