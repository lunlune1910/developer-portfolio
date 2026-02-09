"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { getAllBlogPosts } from "@/utils/data/blog-posts";
import FadeInSection from "../../helper/fade-in-section";
import LocalBlogCard from "./local-blog-card";

export default function LocalBlogList() {
  const { lang } = useLanguage();
  const posts = getAllBlogPosts();

  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
      {posts.map((post, i) => (
        <FadeInSection key={post.slug} direction="fadeUp" delay={i * 0.1}>
          <LocalBlogCard post={post} lang={lang} />
        </FadeInSection>
      ))}
    </div>
  );
}
