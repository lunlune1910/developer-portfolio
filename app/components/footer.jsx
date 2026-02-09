"use client";
// @flow strict
import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';
import FadeInSection from './helper/fade-in-section';

function Footer() {
  const { t } = useLanguage();

  return (
    <div className="relative border-t bg-[#0d1224] border-[#353951] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
        <FadeInSection direction="fadeUp">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">
              {t("footer.credit")} <Link target="_blank" href="https://www.linkedin.com/in/hungsute" className="text-[#16f2b3] hover:text-pink-500 transition-colors duration-300">Mạnh Hùng</Link> | MonStudio
            </p>
          </div>
        </FadeInSection>
      </div>
    </div >
  );
};

export default Footer;