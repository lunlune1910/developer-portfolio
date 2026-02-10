// import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientProviders from "./components/client-providers";
import Footer from "./components/footer";
import ScrollProgressBar from "./components/helper/scroll-progress";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MonStudio - Product Builder & Mobile Engineer | Mạnh Hùng",
  description:
    "Portfolio của Mạnh Hùng – Founder MonStudio. Chuyên xây dựng giải pháp Mobile & Web hiệu năng cao với Flutter, Next.js, Docker.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
  },
  openGraph: {
    title: "MonStudio - Product Builder & Mobile Engineer | Mạnh Hùng",
    description:
      "Portfolio của Mạnh Hùng – Founder MonStudio. Chuyên xây dựng giải pháp Mobile & Web hiệu năng cao với Flutter, Next.js, Docker.",
    url: "https://monstudio.app",
    siteName: "MonStudio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MonStudio Portfolio - Mạnh Hùng",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MonStudio - Product Builder & Mobile Engineer | Mạnh Hùng",
    description:
      "Portfolio của Mạnh Hùng – Founder MonStudio. Chuyên xây dựng giải pháp Mobile & Web hiệu năng cao với Flutter, Next.js, Docker.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <ScrollProgressBar />
          <ToastContainer />
          <main className="min-h-screen relative mx-auto px-4 sm:px-6 md:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
            <Navbar />
            {children}
            <ScrollToTop />
          </main>
          <Footer />
        </ClientProviders>
      </body>
      {/* <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} /> */}
    </html>
  );
}
