import VideoConverter from "@/components/VideoConverter";
import Header from "@/components/Header";
import {
  Video,
  RefreshCw,
  Clock,
  Shield,
  Zap,
  FileVideo,
  Music,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import HowToGuide from "@/components/HowToGuide";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";
import AdSpace from "@/components/AdSpace";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/video-converter`;

export const metadata: Metadata = {
  title: "Free Online Video Converter - Convert MP4, AVI, MOV, WebM, MP3",
  description:
    "Convert videos online for free. Support for MP4, AVI, MOV, WebM, MKV, MP3, and GIF. Fast, secure, and high-quality video conversion. Extract audio from videos. No download required.",
  keywords: [
    "video converter",
    "convert video online",
    "mp4 converter",
    "video to mp3",
    "video to gif",
    "avi to mp4",
    "mov to mp4",
    "webm to mp4",
    "mkv to mp4",
    "free video converter",
    "online video converter",
    "convert video format",
    "extract audio from video",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free Online Video Converter - Convert Any Video Format",
    description:
      "Convert videos online for free. Support for MP4, AVI, MOV, WebM, MP3, and more.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-video-converter.png`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Video Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Video Converter",
    description:
      "Convert videos to any format online. MP4, AVI, MOV, MP3, GIF.",
  },
};

// JSON-LD Schema for Video Converter Tool
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Free Online Video Converter - Convert MP4, AVI, MOV, WebM, MP3",
      description:
        "Convert videos online for free. Support for all major video formats.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Video Converter",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video Converter",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      description:
        "Free online video converter supporting MP4, AVI, MOV, WebM, MKV, MP3, and GIF.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Convert to MP4, AVI, MOV, WebM",
        "Extract audio to MP3",
        "Create GIF from video",
        "No download required",
        "Fast conversion",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Convert Videos Online",
      description: "Learn how to convert video formats online for free",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload Video",
          text: "Select the video file you want to convert from your device.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Select Format",
          text: "Choose your desired output format (e.g., MP4, MP3, GIF).",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Convert & Download",
          text: "Click convert and download your video in the new format.",
        },
      ],
    },
  ],
};

export default function VideoConverterPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Main Content with Ads on Both Sides */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}
        >
          {/* Left Ad Space */}
          <AdSpace position="left" />

          {/* Center Content */}
          <div className="col-span-12 xl:col-span-1">
            {/* Video Converter Tool */}
            <VideoConverter />

            {/* Title and Description */}
            <div className="mt-8">
              <h1
                className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Convert Video Online
              </h1>
              <p className="text-zinc-400 text-center text-lg max-w-2xl mx-auto">
                Convert your videos to any format instantly. Support for MP4,
                AVI, MOV, WEBM, MKV, MP3, and GIF. Free, fast, and secure.
              </p>
            </div>

            {/* How To Guide */}
            <div className="mt-12">
              <HowToGuide
                title="How to Convert Video"
                steps={[
                  {
                    title: "Upload Video",
                    description:
                      "Select the video file you want to convert from your device.",
                  },
                  {
                    title: "Select Format",
                    description:
                      "Choose your desired output format (e.g., MP4, MP3, GIF).",
                  },
                  {
                    title: "Convert & Download",
                    description:
                      "Click 'Convert & Download' to process and save your new file.",
                  },
                ]}
              />
            </div>

            {/* Benefits Section */}
            <div className="mt-12">
              <BenefitsSection
                title="Why Use Our Video Converter?"
                benefits={[
                  {
                    title: "Multiple Formats",
                    description:
                      "Support for all popular video and audio formats including MP4, AVI, MOV, MP3, and GIF.",
                    icon: <FileVideo className="w-6 h-6 text-black" />,
                  },
                  {
                    title: "Fast Conversion",
                    description:
                      "Convert videos directly in your browser using advanced WASM technology.",
                    icon: <Zap className="w-6 h-6 text-black" />,
                  },
                  {
                    title: "High Quality",
                    description:
                      "Maintain the highest possible quality during conversion with optimized codecs.",
                    icon: <RefreshCw className="w-6 h-6 text-black" />,
                  },
                ]}
              />
            </div>

            {/* FAQ Section */}
            <FAQSection
              title="Frequently Asked Questions"
              faqs={[
                {
                  question: "What formats can I convert to?",
                  answer:
                    "You can convert videos to MP4, AVI, MOV, WEBM, MKV, MP3 (audio only), and GIF (animated image).",
                },
                {
                  question: "Can I extract audio from video?",
                  answer:
                    "Yes! Simply select 'MP3' as the output format to extract the audio track from your video file.",
                },
                {
                  question: "Is it free to use?",
                  answer:
                    "Yes, our video converter is 100% free to use with no hidden fees or watermarks.",
                },
                {
                  question: "How long does conversion take?",
                  answer:
                    "Most conversions are very fast, taking only a few seconds to a minute depending on the file size and format.",
                },
              ]}
            />
          </div>

          {/* Right Ad Space */}
          <AdSpace position="right" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
