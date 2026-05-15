import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import VideoCrop from "@/components/VideoCrop";
import { Metadata } from "next";
import { Crop, Shield, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-crop`;

export const metadata: Metadata = {
  title: "Free Online Video Crop Tool - 16:9, 9:16, 1:1, Custom",
  description: "Crop videos online for free. Center-crop to popular aspect ratios or use custom pixel dimensions — all in your browser.",
  keywords: ["crop video online", "16:9 crop", "vertical video crop", "square video"],
  alternates: { canonical: pageUrl },
  openGraph: { title: "Crop Video Online", description: "Crop to 16:9, 9:16, 1:1, or custom.", url: pageUrl, type: "website", images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "FreeVideosEdit" }] },
  twitter: { card: "summary_large_image", title: "Crop Video Online", description: "Crop videos in your browser.", images: [`${siteUrl}/twitter-image`] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Crop Video Online",
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video Crop",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

export default function VideoCropPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}>
          <AdSpace position="left" />
          <div className="col-span-12 xl:col-span-1">
            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>Crop Video</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-zinc-400">Preset aspect ratios use a centered crop. Switch to custom to enter exact width, height, and offsets.</p>
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16"><VideoCrop /></div>
            <div className="mt-12"><HowToGuide title="How to crop" steps={[{ title: "Upload", description: "Add your video." }, { title: "Choose ratio", description: "Pick a preset or custom crop." }, { title: "Export", description: "Download MP4." }]} /></div>
            <div className="mt-12"><BenefitsSection title="Highlights" benefits={[{ title: "Social sizes", description: "16:9, 9:16, 1:1, 4:3.", icon: <Crop className="h-6 w-6 text-white dark:text-black" /> }, { title: "Private", description: "Runs locally.", icon: <Shield className="h-6 w-6 text-white dark:text-black" /> }, { title: "Free", description: "Instant download.", icon: <Zap className="h-6 w-6 text-white dark:text-black" /> }]} /></div>
            <FAQSection title="FAQ" faqs={[{ question: "Will quality drop?", answer: "Video is re-encoded with H.264 for compatibility after cropping." }]} />
          </div>
          <AdSpace position="right" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
