import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-xs py-6 px-4 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="font-bold text-[#800020] whitespace-nowrap">TU CS</span>
          <span>
            &copy; {new Date().getFullYear()} Thammasat University, Department of Computer Science. All rights reserved.
          </span>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 whitespace-nowrap text-gray-500">
          <span className="hover:text-[#800020] hover:underline cursor-pointer">นโยบายความเป็นส่วนตัว</span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="hover:text-[#800020] hover:underline cursor-pointer">ข้อตกลงการใช้งาน</span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="hover:text-[#800020] hover:underline cursor-pointer">ทำเนียบมหาวิทยาลัย</span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="hover:text-[#800020] hover:underline cursor-pointer">แผนผังเว็บไซต์</span>
        </div>
      </div>
    </footer>
  );
};