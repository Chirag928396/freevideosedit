import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import VideoRotate from "@/components/VideoRotate";
import { Metadata } from "next";
import { RotateCw, Shield, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-rotate`;

export const metadata: Metadata = {
  title: "Free Rotate & Flip Video Online - 90°, 180°, Mirror",
  description:
    "Rotate or flip videos online for free. Turn vertical clips horizontal, fix orientation, or mirror your video in the browser.",
  keywords: ["rotate video online", "flip video", "mirror video", "turn video 90 degrees"],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Rotate & Flip Video Online",
    description: "Rotate or flip videos in your browser.",
    url: pageUrl,
    type: "website",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "FreeVideosEdit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate & Flip Video Online",
    description: "Rotate or flip videos in your browser.",
    images: [`${siteUrl}/twitter-image`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Rotate Video Online",
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    { "@type": "SoftwareApplication", name: "FreeVideosEdit Video Rotate", applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
  ],
};

export default function VideoRotatePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}>
          <AdSpace position="left" />
          <div className="col-span-12 xl:col-span-1">
            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Rotate or Flip Video
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-zinc-400">
              Fix sideways phone footage, rotate 180°, or mirror horizontally or vertically. Export as MP4.
            </p>
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16">
              <VideoRotate />
            </div>
            <div className="mt-12">
              <HowToGuide title="How to rotate a video" steps={[{ title: "Upload", description: "Add your clip." }, { title: "Choose transform", description: "Pick rotation or flip." }, { title: "Download", description: "Save the processed MP4." }]} />
            </div>
            <div className="mt-12">
              <BenefitsSection title="Highlights" benefits={[{ title: "Simple controls", description: "One-click transforms.", icon: <RotateCw className="h-6 w-6 text-white dark:text-black" /> }, { title: "Private", description: "Local processing.", icon: <Shield className="h-6 w-6 text-white dark:text-black" /> }, { title: "Free", description: "No account needed.", icon: <Zap className="h-6 w-6 text-white dark:text-black" /> }]} />
            </div>
            <FAQSection title="FAQ" faqs={[{ question: "Output format?", answer: "MP4 (H.264 + AAC) for broad compatibility." }]} />
          </div>
          <AdSpace position="right" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
