"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { getBlogPost } from "@/utils/data/blog-posts";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BsArrowLeft, BsCalendar3, BsClock } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import FadeInSection from "../../components/helper/fade-in-section";

// Render bold text within **markers**
function renderBoldText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-[#16f2b3] font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function ContentBlock({ block, index }) {
  switch (block.type) {
    case "heading":
      return (
        <FadeInSection direction="fadeUp" delay={0.05}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-10 sm:mt-12 mb-4 sm:mb-6 relative pl-5">
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#16f2b3] to-[#8228ec] rounded-full" />
            {block.text}
          </h2>
        </FadeInSection>
      );

    case "paragraph":
      return (
        <FadeInSection direction="fadeUp" delay={0.05}>
          <p className="text-gray-300 text-base md:text-lg leading-8 mb-6">
            {renderBoldText(block.text)}
          </p>
        </FadeInSection>
      );

    case "list":
      return (
        <FadeInSection direction="fadeUp" delay={0.05}>
          <ul className="space-y-3 mb-8 ml-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-base md:text-lg leading-7">
                <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-[#16f2b3] to-[#8228ec] flex-shrink-0" />
                <span>{renderBoldText(item)}</span>
              </li>
            ))}
          </ul>
        </FadeInSection>
      );

    case "code":
      return (
        <FadeInSection direction="fadeUp" delay={0.05}>
          <div className="my-8 rounded-xl overflow-hidden border border-[#2a2e5a]">
            {block.label && (
              <div className="bg-[#1a1443] px-4 py-2 text-xs font-mono text-gray-400 border-b border-[#2a2e5a]">
                {block.label}
              </div>
            )}
            <pre className="bg-[#0d1224] p-4 md:p-5 overflow-x-auto -mx-px">
              <code className="text-xs sm:text-sm md:text-base font-mono text-[#16f2b3] leading-7 whitespace-pre">
                {block.text}
              </code>
            </pre>
          </div>
        </FadeInSection>
      );

    case "quote":
      return (
        <FadeInSection direction="zoomIn" delay={0.1}>
          <blockquote className="my-10 relative">
            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-violet-600 to-[#16f2b3] rounded-full" />
            <p className="text-xl sm:text-2xl md:text-3xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] via-violet-400 to-pink-500 pl-6">
              {block.text}
            </p>
          </blockquote>
        </FadeInSection>
      );

    case "author":
      return (
        <FadeInSection direction="fadeUp" delay={0.1}>
          <div className="mt-12 pt-8 border-t border-[#1f223c]">
            <div className="flex items-center gap-4">
              <Image
                src="/profile.png"
                alt="Manh Hung"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#16f2b3]"
              />
              <div>
                <p className="text-white font-semibold text-lg">{block.text}</p>
                <p className="text-[#16f2b3] text-sm">Product Builder & Mobile Engineer</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      );

    default:
      return null;
  }
}

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const post = getBlogPost(slug);
  const { lang, t } = useLanguage();

  if (!post) {
    notFound();
  }

  const localizedPost = post[lang] || post.vi;
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <div className="py-8 md:py-16">
      {/* Back button */}
      <FadeInSection direction="fadeLeft">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#16f2b3] hover:text-pink-500 transition-colors duration-300 mb-8 group"
        >
          <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>{lang === "vi" ? "Quay lại Blog" : "Back to Blog"}</span>
        </Link>
      </FadeInSection>

      {/* Cover image */}
      <FadeInSection direction="fadeUp">
        <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden mb-10 border border-[#1f223c]">
          <Image
            src={post.coverImage}
            alt={localizedPost.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-transparent to-transparent" />
        </div>
      </FadeInSection>

      {/* Article header */}
      <article className="max-w-3xl mx-auto">
        <FadeInSection direction="fadeUp" delay={0.1}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full border border-[#2a2e5a] bg-[#1a1443]/60 text-[#16f2b3]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            {localizedPost.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 italic mb-8">
            {localizedPost.subtitle}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-10 pb-8 border-b border-[#1f223c]">
            <div className="flex items-center gap-2">
              <BsCalendar3 className="text-[#16f2b3]" />
              <span suppressHydrationWarning>
                {new Date(post.date).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BsClock className="text-[#16f2b3]" />
              <span>
                {post.readingTime} {lang === "vi" ? "phút đọc" : "min read"}
              </span>
            </div>
          </div>
        </FadeInSection>

        {/* Content blocks */}
        <div className="prose-custom">
          {localizedPost.content.map((block, index) => (
            <ContentBlock key={index} block={block} index={index} />
          ))}
        </div>

        {/* Share buttons */}
        <FadeInSection direction="fadeUp" delay={0.1}>
          <div className="mt-16 pt-8 border-t border-[#1f223c]">
            <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
              {lang === "vi" ? "Chia sẻ bài viết" : "Share this article"}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(localizedPost.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1a1443] border border-[#2a2e5a] flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1a1443] border border-[#2a2e5a] flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1a1443] border border-[#2a2e5a] flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-all duration-300"
              >
                <FaFacebook size={18} />
              </a>
            </div>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection direction="zoomIn" delay={0.1}>
          <div className="mt-12 sm:mt-16 p-5 sm:p-8 rounded-2xl border border-[#1f223c] bg-gradient-to-br from-[#11152c] to-[#0a0d37] text-center">
            <p className="text-xl md:text-2xl font-bold text-white mb-3">
              {lang === "vi" ? "Bạn có ý tưởng muốn hiện thực hoá?" : "Got an idea you want to bring to life?"}
            </p>
            <p className="text-gray-400 mb-6">
              {lang === "vi"
                ? "Hãy liên hệ với MonStudio để biến ý tưởng thành sản phẩm thực tế."
                : "Get in touch with MonStudio to turn your idea into a real product."}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold hover:from-violet-600 hover:to-pink-500 transition-all duration-300 hover:scale-105"
            >
              {lang === "vi" ? "Liên hệ ngay" : "Get in Touch"}
            </Link>
          </div>
        </FadeInSection>
      </article>
    </div>
  );
}
