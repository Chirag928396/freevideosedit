import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowToGuide from "@/components/HowToGuide";
import ScrollToTool from "@/components/ScrollToTool";
import VideoReverse from "@/components/VideoReverse";
import { Metadata } from "next";
import { Rewind, Shield, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-reverse`;

export const metadata: Metadata = {
  title: "Reverse Video Online - Play Clips Backwards Free",
  description: "Reverse video playback online for free. Optional audio reverse. Best for short clips in the browser.",
  keywords: ["reverse video online", "backwards video", "rewind video effect"],
  alternates: { canonical: pageUrl },
  openGraph: { title: "Reverse Video Online", description: "Play video backwards in your browser.", url: pageUrl, type: "website", images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "FreeVideosEdit" }] },
  twitter: { card: "summary_large_image", title: "Reverse Video Online", description: "Reverse video in browser.", images: [`${siteUrl}/twitter-image`] },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": pageUrl, url: pageUrl, name: "Reverse Video Online", isPartOf: { "@id": `${siteUrl}/#website` } }, { "@type": "SoftwareApplication", name: "FreeVideosEdit Reverse Video", applicationCategory: "MultimediaApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] };

export default function VideoReversePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="grid gap-6" style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}>
          <AdSpace position="left" />
          <div className="col-span-12 xl:col-span-1">
            <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white md:text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>Reverse Video</h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-zinc-400">Creates a backwards MP4. Reversing uses more memory — keep clips short for best results.</p>
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16"><VideoReverse /></div>
            <div className="mt-12"><HowToGuide title="How to reverse" steps={[{ title: "Upload", description: "Add a short clip." }, { title: "Audio option", description: "Toggle reverse audio if needed." }, { title: "Download", description: "Save reversed MP4." }]} /></div>
            <div className="mt-12"><BenefitsSection title="Highlights" benefits={[{ title: "Creative effect", description: "Backwards playback.", icon: <Rewind className="h-6 w-6 text-white dark:text-black" /> }, { title: "Private", description: "Local processing.", icon: <Shield className="h-6 w-6 text-white dark:text-black" /> }, { title: "Free", description: "No signup.", icon: <Zap className="h-6 w-6 text-white dark:text-black" /> }]} /></div>
            <FAQSection title="FAQ" faqs={[{ question: "Long videos?", answer: "Long files may fail or be slow in-browser; trim first for reliability." }]} />
          </div>
          <AdSpace position="right" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
