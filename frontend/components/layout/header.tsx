'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="border-b-2 border-[#81001D] text-white sticky top-0 z-50 shadow-md bg-white relative">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/faculties" className="flex items-center gap-3">
          <div className="bg-[#81001D] text-white font-bold px-2 py-1 rounded tracking-tighter">
            CS
          </div>
          <span className="font-bold text-[#81001D] text-base md:text-xl tracking-tight">
            Computer Science Department
          </span>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#594141] font-medium">
          <span className="hover:opacity-80 cursor-pointer">เกี่ยวกับเรา</span>
          <span className="hover:opacity-80 cursor-pointer">หลักสูตร</span>
          <span className="hover:opacity-80 cursor-pointer">วิจัย</span>
          <Link href="/faculties" className="underline underline-offset-8 font-semibold text-[#81001D]">
            คณาจารย์
          </Link>
          <span className="hover:opacity-80 cursor-pointer">ข่าวสาร</span>
          <span className="hover:opacity-80 cursor-pointer">ติดต่อ</span>
        </nav>

        {/* Right Actions & Hamburger Button */}
        <div className="flex items-center gap-3">
          {/* Fixed Language Display (Active: TH) */}
          <div className="flex items-center border border-[#81001D] rounded-md p-0.5 text-xs font-semibold bg-gray-50 select-none">
            <span className="bg-[#81001D] text-white font-bold px-2 py-0.5 rounded-sm shadow-sm">
              TH
            </span>
            <span className="text-[#81001D]/40 px-2 py-0.5 cursor-default">
              EN
            </span>
          </div>

          {/* Hamburger Button (Mobile Only) */}
          <button
            onClick={toggleMenu}
            type="button"
            className="md:hidden text-[#81001D] p-1.5 focus:outline-none rounded hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Floating Mobile Dropdown Menu (ไม่เบียด Layout ด้านล่าง) */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex flex-col gap-3 text-sm text-[#594141] font-medium shadow-xl z-50">
          <span className="hover:text-[#81001D] cursor-pointer py-1">เกี่ยวกับเรา</span>
          <span className="hover:text-[#81001D] cursor-pointer py-1">หลักสูตร</span>
          <span className="hover:text-[#81001D] cursor-pointer py-1">วิจัย</span>
          <Link
            href="/faculties"
            onClick={() => setIsMenuOpen(false)}
            className="font-semibold text-[#81001D] py-1"
          >
            คณาจารย์
          </Link>
          <span className="hover:text-[#81001D] cursor-pointer py-1">ข่าวสาร</span>
          <span className="hover:text-[#81001D] cursor-pointer py-1">ติดต่อ</span>
        </nav>
      )}
    </header>
  );
};