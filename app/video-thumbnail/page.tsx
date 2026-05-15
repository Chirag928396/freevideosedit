import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import VideoThumbnail from "@/components/VideoThumbnail";
import { Metadata } from "next";
import { Image as ImageIcon, Shield, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-thumbnail`;

export const metadata: Metadata = {
  title: "Extract Video Thumbnail Online - Save Frame as PNG or JPG",
  description: "Grab a still frame from any video online. Pick the timestamp and download PNG or JPG — processed locally in your browser.",
  keywords: ["video thumbnail extractor", "save frame from video", "screenshot video"],
  alternates: { canonical: pageUrl },
  openGraph: { title: "Video Thumbnail Extractor", description: "Save a frame as PNG or JPG.", url: pageUrl, type: "website", images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "FreeVideosEdit" }] },
  twitter: { card: "summary_large_image", title: "Video Thumbnail Extractor", description: "Save a frame from video.", images: [`${siteUrl}/twitter-image`] },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": pageUrl, url: pageUrl, name: "Video Thumbnail Online", isPartOf: { "@id": `${siteUrl}/#website` } }, { "@type": "SoftwareApplication", name: "FreeVideosEdit Thumbnail Tool", applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] };

export default function VideoThumbnailPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}>
          <AdSpace position="left" />
          <div className="col-span-12 xl:col-span-1">
            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>Video Thumbnail</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-zinc-400">Scrub to the exact moment and export a high-quality still image.</p>
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16"><VideoThumbnail /></div>
            <div className="mt-12"><HowToGuide title="How to extract a frame" steps={[{ title: "Upload", description: "Add your video." }, { title: "Pick time", description: "Use the slider while previewing." }, { title: "Save", description: "Download PNG or JPG." }]} /></div>
            <div className="mt-12"><BenefitsSection title="Highlights" benefits={[{ title: "PNG & JPG", description: "Choose your format.", icon: <ImageIcon className="h-6 w-6 text-white dark:text-black" /> }, { title: "Private", description: "Local FFmpeg.", icon: <Shield className="h-6 w-6 text-white dark:text-black" /> }, { title: "Free", description: "No signup.", icon: <Zap className="h-6 w-6 text-white dark:text-black" /> }]} /></div>
            <FAQSection title="FAQ" faqs={[{ question: "Keyframe accuracy?", answer: "Seeking uses FFmpeg; for some codecs the exact frame may vary slightly near keyframes." }]} />
          </div>
          <AdSpace position="right" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
