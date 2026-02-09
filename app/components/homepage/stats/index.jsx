"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-[#16f2b3]">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { value: 4, suffix: "+", labelKey: "stats.yearsExp" },
    { value: 10, suffix: "+", labelKey: "stats.projects" },
    { value: 14, suffix: "", labelKey: "stats.skills" },
    { value: 100, suffix: "%", labelKey: "stats.passion" },
  ];

  return (
    <div className="my-12 lg:my-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#1f223c] bg-[#11152c]/60 backdrop-blur-sm hover:border-violet-500/50 transition-all duration-500 group"
          >
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <p className="mt-3 text-sm md:text-base text-gray-400 group-hover:text-gray-200 transition-colors text-center">
              {t(stat.labelKey)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
