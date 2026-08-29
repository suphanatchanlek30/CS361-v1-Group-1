"use client";

import Image from "next/image";
import { useState } from "react";

import type { FacultyImage } from "@/types/faculty";

interface FacultyProfileImageProps {
  image: FacultyImage | null;
  name: string;
}

function initialsFrom(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function FacultyProfileImage({ image, name }: FacultyProfileImageProps) {
  const [hasImageError, setHasImageError] = useState(false);

  if (!image || hasImageError) {
    return (
      <div
        aria-label={`รูปแทน ${name}`}
        className="flex size-36 shrink-0 items-center justify-center rounded-2xl bg-[#81001D]/10 text-3xl font-bold text-[#81001D] sm:size-44"
      >
        {initialsFrom(name) || "CS"}
      </div>
    );
  }

  return (
    <div className="relative size-36 shrink-0 overflow-hidden rounded-2xl border border-[#81001D]/20 bg-stone-100 sm:size-44">
      <Image
        src={image.url}
        alt={image.alt || name}
        fill
        sizes="(max-width: 640px) 144px, 176px"
        className="object-cover"
        onError={() => setHasImageError(true)}
        unoptimized
      />
    </div>
  );
}
