import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import VideoLoop from "@/components/VideoLoop";
import { Metadata } from "next";
import { Repeat, Shield, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-loop`;

export const metadata: Metadata = {
  title: "Loop Video Online Free - Repeat Clip 2–10 Times",
  description: "Loop a video end-to-end online. Choose how many times the clip should repeat and download one MP4 file.",
  keywords: ["loop video online", "repeat video", "video looper"],
  alternates: { canonical: pageUrl },
  openGraph: { title: "Loop Video Online", description: "Repeat a video clip in one file.", url: pageUrl, type: "website", images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "FreeVideosEdit" }] },
  twitter: { card: "summary_large_image", title: "Loop Video Online", description: "Loop a video in your browser.", images: [`${siteUrl}/twitter-image`] },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": pageUrl, url: pageUrl, name: "Loop Video Online", isPartOf: { "@id": `${siteUrl}/#website` } }, { "@type": "SoftwareApplication", name: "FreeVideosEdit Video Loop", applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] };

export default function VideoLoopPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}>
          <AdSpace position="left" />
          <div className="col-span-12 xl:col-span-1">
            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>Loop Video</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-zinc-400">Repeat your clip between 2 and 10 times in a single exported MP4.</p>
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16"><VideoLoop /></div>
            <div className="mt-12"><HowToGuide title="How to loop" steps={[{ title: "Upload", description: "Add your clip." }, { title: "Choose repeats", description: "Set how many total plays." }, { title: "Download", description: "Save the combined MP4." }]} /></div>
            <div className="mt-12"><BenefitsSection title="Highlights" benefits={[{ title: "Easy repeats", description: "2×–10× in one file.", icon: <Repeat className="h-6 w-6 text-white dark:text-black" /> }, { title: "Private", description: "Local processing.", icon: <Shield className="h-6 w-6 text-white dark:text-black" /> }, { title: "Free", description: "No signup.", icon: <Zap className="h-6 w-6 text-white dark:text-black" /> }]} /></div>
            <FAQSection title="FAQ" faqs={[{ question: "Seamless joins?", answer: "Output is re-encoded for smooth playback across repeats." }]} />
          </div>
          <AdSpace position="right" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
