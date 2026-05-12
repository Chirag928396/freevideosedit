import VideoCombiner from "@/components/VideoCombiner";
import ScrollToTool from "@/components/ScrollToTool";
import {
  Layers,
  Zap,
  Shield,
  Globe,
  Download,
  Clock,
  CheckCircle,
} from "lucide-react";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import HowToGuide from "@/components/HowToGuide";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/video-combine`;

export const metadata: Metadata = {
  title: "Free Online Video Combiner - Merge & Join Videos Instantly",
  description:
    "Combine and merge multiple videos into one online for free. No downloads required. Drag to reorder clips, supports MP4, MOV, AVI, WebM and more. Fast, secure, browser-based video joiner.",
  keywords: [
    "video combiner online",
    "merge videos online free",
    "join videos online",
    "combine video clips",
    "video joiner free",
    "merge mp4 online",
    "concatenate videos",
    "video merger browser",
    "no upload video combiner",
    "free video joiner",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free Online Video Combiner - Merge & Join Videos Instantly",
    description:
      "Combine multiple videos into one online for free. No downloads required.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Video Combiner Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Video Combiner",
    description:
      "Merge and join videos online for free. No download required.",
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
      name: "Free Online Video Combiner - Merge & Join Videos Instantly",
      description:
        "Combine multiple videos into one online for free with precise order control.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Combine Videos",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video Combiner",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      description:
        "Free online tool to merge and combine multiple videos into one file.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Merge multiple video clips",
        "Drag-to-reorder clips",
        "Supports MP4, MOV, AVI, WebM",
        "No download required",
        "100% browser-based",
        "Free to use",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Combine Videos Online",
      description: "Learn how to merge multiple videos into one for free",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload Videos",
          text: "Click or drag-and-drop to add multiple video files. Supports MP4, MOV, AVI, and more.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Order Clips",
          text: "Drag clips to reorder them or use the arrow buttons to set the sequence you want.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Combine",
          text: "Click the Combine button. Your videos are joined together in the browser — no upload needed.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Download",
          text: "Preview the combined video and download it instantly as an MP4 file.",
        },
      ],
    },
  ],
};

export default function VideoCombinePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}
        >
          {/* Left Ad Space */}
          <AdSpace position="left" />

          {/* Center Content */}
          <div className="col-span-12 xl:col-span-1">
            {/* Title and Description */}
            <div className="mb-8">
              <h1
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Free Online Video Combiner
              </h1>
              <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed text-center">
                Merge multiple video clips into a single video instantly. No
                uploads, no sign-up, no watermarks — all processing happens
                right in your browser.
              </p>
              <p className="text-gray-500 dark:text-zinc-500 max-w-2xl mx-auto leading-relaxed text-center mt-3 text-sm">
                Our video combiner uses FFmpeg WebAssembly to join your clips
                locally. Upload as many videos as you need, drag to reorder
                them, and export one seamless combined video in MP4 format.
                Supports MP4, MOV, AVI, WebM, and more.
              </p>
            </div>

            {/* Tool */}
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16">
              <VideoCombiner />
            </div>

            {/* How to Guide */}
            <div className="mt-12">
              <HowToGuide
                title="How to Combine Videos Online"
                steps={[
                  {
                    title: "Upload Videos",
                    description:
                      "Click the upload area or drag-and-drop multiple video files. We support MP4, MOV, AVI, WebM, and more. Add as many clips as you need.",
                  },
                  {
                    title: "Order Your Clips",
                    description:
                      "Drag clips to reorder them or use the up/down arrows. The final video will follow the exact sequence you set.",
                  },
                  {
                    title: "Preview Individual Clips",
                    description:
                      "Click the play icon on any clip to preview it inline before combining. Make sure everything looks right.",
                  },
                  {
                    title: "Combine & Download",
                    description:
                      "Click the Combine button. Once processing is done, preview the merged video and download it instantly as MP4.",
                  },
                ]}
              />
            </div>

            {/* Benefits */}
            <div className="mt-12">
              <BenefitsSection
                title="Why Choose Our Video Combiner?"
                benefits={[
                  {
                    icon: (
                      <Zap
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "Lightning Fast",
                    description:
                      "FFmpeg WebAssembly processes your videos at near-native speed directly in your browser.",
                  },
                  {
                    icon: (
                      <Shield
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "100% Private",
                    description:
                      "Your videos never leave your device. All processing is local — no server uploads ever.",
                  },
                  {
                    icon: (
                      <Globe
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "Works Everywhere",
                    description:
                      "Works on any modern browser — Windows, Mac, Linux, iOS, or Android. No app needed.",
                  },
                  {
                    icon: (
                      <Download
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "No Installation",
                    description:
                      "Open the page and start combining. No software to install or account to create.",
                  },
                  {
                    icon: (
                      <Clock
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "Unlimited Clips",
                    description:
                      "Add as many videos as you need. Combine 2, 5, or 20+ clips into a single file.",
                  },
                  {
                    icon: (
                      <CheckCircle
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "High Quality Output",
                    description:
                      "Get a high-quality MP4 output with consistent resolution and audio across all clips.",
                  },
                ]}
              />
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <FAQSection
                title="Frequently Asked Questions"
                faqs={[
                  {
                    question: "Is this video combiner really free?",
                    answer:
                      "Yes, completely free. No subscriptions, no hidden fees, and no watermarks on your output video.",
                  },
                  {
                    question: "What video formats can I combine?",
                    answer:
                      "You can upload MP4, MOV, AVI, MKV, WebM, and other common video formats. The output will be an MP4 file.",
                  },
                  {
                    question: "Is there a limit on how many videos I can combine?",
                    answer:
                      "There is no hard limit on the number of clips. The only constraint is your device's available memory, since processing happens locally.",
                  },
                  {
                    question: "Are my videos uploaded to a server?",
                    answer:
                      "No. All processing happens in your browser using WebAssembly. Your videos never leave your device.",
                  },
                  {
                    question: "Can I reorder clips before combining?",
                    answer:
                      "Yes! You can drag and drop clips to reorder them, or use the up/down arrow buttons. The final video follows your chosen sequence exactly.",
                  },
                  {
                    question: "Will there be quality loss when combining?",
                    answer:
                      "Clips are re-encoded to a uniform format before joining to ensure compatibility. There is minimal quality loss using the H.264 codec at high quality settings.",
                  },
                  {
                    question: "Can I combine videos with different resolutions?",
                    answer:
                      "Yes. FFmpeg handles videos of different resolutions and frame rates. Each clip is normalized to a common format before concatenation.",
                  },
                  {
                    question: "How long does combining take?",
                    answer:
                      "Processing time depends on the total duration and size of your clips, and your device's performance. Most short clips are processed in under a minute.",
                  },
                ]}
              />
            </div>
          </div>

          {/* Right Ad Space */}
          <AdSpace position="right" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
