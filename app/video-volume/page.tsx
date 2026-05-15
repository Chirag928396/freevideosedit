import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import VideoVolume from "@/components/VideoVolume";
import { Metadata } from "next";
import { Volume2, Shield, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-volume`;

export const metadata: Metadata = {
  title: "Change Video Volume Online - Boost or Lower Audio",
  description: "Adjust video volume online for free. Boost quiet clips or reduce loud audio with FFmpeg in your browser.",
  keywords: ["video volume booster", "lower video volume", "adjust audio in video"],
  alternates: { canonical: pageUrl },
  openGraph: { title: "Video Volume Online", description: "Boost or lower video audio.", url: pageUrl, type: "website", images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "FreeVideosEdit" }] },
  twitter: { card: "summary_large_image", title: "Video Volume Online", description: "Adjust video volume in browser.", images: [`${siteUrl}/twitter-image`] },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": pageUrl, url: pageUrl, name: "Video Volume Online", isPartOf: { "@id": `${siteUrl}/#website` } }, { "@type": "SoftwareApplication", name: "FreeVideosEdit Video Volume", applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] };

export default function VideoVolumePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}>
          <AdSpace position="left" />
          <div className="col-span-12 xl:col-span-1">
            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>Video Volume</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-zinc-400">Set volume from 0% to 200%. Videos without an audio track cannot be processed with this tool.</p>
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16"><VideoVolume /></div>
            <div className="mt-12"><HowToGuide title="How to change volume" steps={[{ title: "Upload", description: "Add a video with audio." }, { title: "Adjust slider", description: "Pick your level." }, { title: "Download", description: "Save MP4 with updated audio." }]} /></div>
            <div className="mt-12"><BenefitsSection title="Highlights" benefits={[{ title: "Simple slider", description: "0–200% range.", icon: <Volume2 className="h-6 w-6 text-white dark:text-black" /> }, { title: "Private", description: "Local processing.", icon: <Shield className="h-6 w-6 text-white dark:text-black" /> }, { title: "Free", description: "No account.", icon: <Zap className="h-6 w-6 text-white dark:text-black" /> }]} /></div>
            <FAQSection title="FAQ" faqs={[{ question: "Clipping at high volume?", answer: "Very high boost can distort — use preview in your editor of choice if needed." }]} />
          </div>
          <AdSpace position="right" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
