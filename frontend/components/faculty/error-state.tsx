import React from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'เกิดข้อผิดพลาดในการดึงข้อมูลคณาจารย์',
  onRetry,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center my-8 max-w-lg mx-auto">
      <div className="text-red-500 text-3xl mb-3">⚠️</div>
      <h3 className="text-base font-bold text-red-800 mb-1">
        ไม่สามารถโหลดข้อมูลคณาจารย์ได้
      </h3>
      <p className="text-xs text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#800020] text-white text-xs font-semibold rounded hover:bg-[#600018] transition-colors"
        >
          ลองใหม่อีกครั้ง
        </button>
      )}
    </div>
  );
};