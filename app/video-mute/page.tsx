import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import VideoMute from "@/components/VideoMute";
import { Metadata } from "next";
import { VolumeX, Shield, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-mute`;

export const metadata: Metadata = {
  title: "Remove Audio from Video Online - Mute Video Free",
  description: "Strip audio from your video online for free. Export a silent MP4 with local browser processing.",
  keywords: ["mute video online", "remove audio from video", "silent mp4"],
  alternates: { canonical: pageUrl },
  openGraph: { title: "Mute Video Online", description: "Remove audio tracks from video.", url: pageUrl, type: "website", images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "FreeVideosEdit" }] },
  twitter: { card: "summary_large_image", title: "Mute Video Online", description: "Remove audio from video.", images: [`${siteUrl}/twitter-image`] },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": pageUrl, url: pageUrl, name: "Mute Video Online", isPartOf: { "@id": `${siteUrl}/#website` } }, { "@type": "SoftwareApplication", name: "FreeVideosEdit Mute Video", applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] };

export default function VideoMutePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}>
          <AdSpace position="left" />
          <div className="col-span-12 xl:col-span-1">
            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>Remove Audio from Video</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-zinc-400">Create a silent MP4 — useful for B-roll, presentations, or platforms that need muted uploads.</p>
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16"><VideoMute /></div>
            <div className="mt-12"><HowToGuide title="How to mute" steps={[{ title: "Upload", description: "Pick your video." }, { title: "Export", description: "Download without audio." }]} /></div>
            <div className="mt-12"><BenefitsSection title="Highlights" benefits={[{ title: "Clean mute", description: "No audio tracks in output.", icon: <VolumeX className="h-6 w-6 text-white dark:text-black" /> }, { title: "Private", description: "Local FFmpeg.wasm.", icon: <Shield className="h-6 w-6 text-white dark:text-black" /> }, { title: "Free", description: "No signup.", icon: <Zap className="h-6 w-6 text-white dark:text-black" /> }]} /></div>
            <FAQSection title="FAQ" faqs={[{ question: "Is video re-encoded?", answer: "Yes, video is re-encoded to H.264 for reliable silent MP4 output." }]} />
          </div>
          <AdSpace position="right" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
