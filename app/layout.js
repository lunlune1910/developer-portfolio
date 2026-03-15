import { Inter } from "next/font/google";
import Script from "next/script";
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

// ✅ FIX: Tách viewport theo chuẩn Next.js 16+
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata = {
  title: "MonStudio - Product Builder & Mobile Engineer | Mạnh Hùng",
  description: "Portfolio của Mạnh Hùng – Founder MonStudio. Chuyên xây dựng giải pháp Mobile & Web hiệu năng cao.",
  openGraph: {
    title: "MonStudio - Mạnh Hùng",
    description: "Mobile & Web Engineer",
    url: "https://monstudio.app",
    siteName: "MonStudio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* ✅ Umami Analytics: Tối ưu load sau khi trang tương tác */}
        <Script
          src="https://analytics.monstudio.me/script.js"
          data-website-id="c39e7f13-2170-4111-a9bd-bd738fe8ebc1"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ClientProviders>
          <ScrollProgressBar />
          <ToastContainer />
          <main className="min-h-screen relative mx-auto px-4 sm:px-6 md:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white overflow-x-clip">
            <Navbar />
            {children}
            <ScrollToTop />
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
