import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import VideoSpeedChanger from "@/components/VideoSpeedChanger";
import { Metadata } from "next";
import { Gauge, Zap, Shield } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-speed`;

export const metadata: Metadata = {
  title: "Free Online Video Speed Changer - Slow Motion & Fast Forward",
  description:
    "Change video playback speed online for free. Create slow motion or fast-forward clips in your browser with local, private processing.",
  keywords: [
    "video speed editor",
    "slow motion video online",
    "speed up video",
    "change video speed",
    "free video speed changer",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Video Speed Changer Online",
    description: "Slow down or speed up videos in your browser.",
    url: pageUrl,
    type: "website",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "FreeVideosEdit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Speed Changer Online",
    description: "Slow down or speed up videos in your browser.",
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
      name: "Video Speed Changer Online",
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video Speed Changer",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

export default function VideoSpeedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}>
          <AdSpace position="left" />
          <div className="col-span-12 xl:col-span-1">
            <h1
              className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Change Video Speed
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-zinc-400">
              Adjust playback speed from 0.25× to 4×. Audio is pitch-corrected when possible; videos without audio still export correctly.
            </p>
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16">
              <VideoSpeedChanger />
            </div>
            <div className="mt-12">
              <HowToGuide
                title="How to change video speed"
                steps={[
                  { title: "Upload", description: "Drop a video or choose a file from your device." },
                  { title: "Pick speed", description: "Select a preset multiplier for playback." },
                  { title: "Download", description: "Process locally and save your new MP4." },
                ]}
              />
            </div>
            <div className="mt-12">
              <BenefitsSection
                title="Why use this tool?"
                benefits={[
                  { title: "Fast presets", description: "Common speeds in one tap.", icon: <Gauge className="h-6 w-6 text-white dark:text-black" /> },
                  { title: "Private", description: "FFmpeg runs in your browser.", icon: <Shield className="h-6 w-6 text-white dark:text-black" /> },
                  { title: "No signup", description: "Free and instant.", icon: <Zap className="h-6 w-6 text-white dark:text-black" /> },
                ]}
              />
            </div>
            <FAQSection
              title="FAQ"
              faqs={[
                { question: "Will audio stay synced?", answer: "We adjust audio tempo to match the video when an audio track exists." },
                { question: "Formats supported?", answer: "Most browser-playable formats work; output is MP4." },
              ]}
            />
          </div>
          <AdSpace position="right" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
