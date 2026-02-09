"use client";

import Image from "next/image";
import Link from "next/link";
import { BsClock } from "react-icons/bs";

export default function LocalBlogCard({ post, lang }) {
  const localized = post[lang] || post.vi;
  const dateStr = new Date(post.date).toLocaleDateString(
    lang === "vi" ? "vi-VN" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative overflow-hidden h-full">
        {/* Cover */}
        <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg relative">
          <Image
            src={post.coverImage}
            height={630}
            width={1200}
            alt={localized.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-all duration-300"
            unoptimized
          />
          {/* Featured badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
            {lang === "vi" ? "Bài viết gốc" : "Original"}
          </div>
        </div>

        <div className="p-3 sm:p-4 flex flex-col">
          {/* Meta */}
          <div className="flex justify-between items-center text-[#16f2b3] text-sm mb-2">
            <span suppressHydrationWarning>{dateStr}</span>
            <span className="flex items-center gap-1">
              <BsClock size={12} />
              {post.readingTime} {lang === "vi" ? "phút" : "min"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg text-white font-medium group-hover:text-violet-500 transition-colors duration-300 line-clamp-2 mb-2">
            {localized.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-[#d3d8e8] line-clamp-2 mb-3">
            {localized.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-full border border-[#2a2e5a] bg-[#1a1443]/60 text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
