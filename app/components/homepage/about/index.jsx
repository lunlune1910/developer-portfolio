"use client";
// @flow strict

import { useLanguage } from "@/app/context/LanguageContext";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import FadeInSection from "../../helper/fade-in-section";


function AboutSection() {
  const { t } = useLanguage();

  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          {t("about.sideLabel")}
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <FadeInSection direction="fadeLeft" className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            {t("about.title")}
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {t("personalData.description")}
          </p>
        </FadeInSection>
        <FadeInSection direction="fadeRight" className="flex justify-center order-1 lg:order-2">
          <div className="relative group cursor-pointer">
            {/* Spinning gradient ring */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full">
              <div className="absolute inset-0 rounded-full p-[3px] profile-ring">
                <div className="w-full h-full rounded-full bg-[#0d1224]" />
              </div>

              {/* Photo */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden">
                <Image
                  src={personalData.profile}
                  width={320}
                  height={320}
                  alt="Mạnh Hùng"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default AboutSection;