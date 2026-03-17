import VideoCompressor from "@/components/VideoCompressor";
import Header from "@/components/Header";
import {
  Video,
  Droplet,
  Clock,
  Download,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Type,
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
const pageUrl = `${siteUrl}/video-compress`;

export const metadata: Metadata = {
  title:
    "Free Online Video Compressor - Reduce Video Size Without Quality Loss",
  description:
    "Compress videos online for free. Reduce video file size by up to 90% without losing quality. No download required. Perfect for email, WhatsApp, Discord, and social media sharing.",
  keywords: [
    "video compressor",
    "compress video online",
    "reduce video size",
    "video compression",
    "shrink video",
    "video optimizer",
    "compress mp4",
    "reduce file size video",
    "compress video for email",
    "compress video for whatsapp",
    "compress video for discord",
    "free video compressor",
    "online video compression",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free Online Video Compressor - Reduce Video Size",
    description:
      "Compress videos online for free. Reduce file size without losing quality.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-video-compress.png`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Video Compressor Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Video Compressor",
    description: "Compress videos online. Reduce size without quality loss.",
  },
};

// JSON-LD Schema for Video Compressor Tool
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Free Online Video Compressor - Reduce Video Size",
      description:
        "Compress videos online for free. Reduce file size without losing quality.",
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
          name: "Compress Video",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video Compressor",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      description:
        "Free online video compressor to reduce video file size without quality loss.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Reduce video size by up to 90%",
        "Maintain video quality",
        "Multiple compression presets",
        "No download required",
        "Works in browser",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Compress Videos Online",
      description: "Learn how to compress and reduce video file size online",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload Video",
          text: "Select the video file you want to compress from your device.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Choose Quality",
          text: "Select your desired compression level (High Quality, Balanced, or Small Size).",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Compress & Download",
          text: "Click compress and download your optimized video.",
        },
      ],
    },
  ],
};

export default function VideoCompressPage() {
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
            {/* Title and Description */}
            <div className="mb-8">
              <h1
                className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Compress Video Online
              </h1>
              <p className="text-zinc-400 text-center text-lg max-w-2xl mx-auto">
                Reduce your video file size instantly. Our free online video
                compressor helps you optimize videos for social media, email,
                and web without compromising quality.
              </p>
              <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed text-center mt-3 text-sm">
                Choose from multiple compression presets to balance file size
                and quality. Powered by H.264 and H.265 codecs, our tool can
                shrink files by up to 90% while keeping them sharp. Ideal for
                WhatsApp, Discord, email attachments, and social media uploads.
              </p>
            </div>

            {/* Video Compressor Tool */}
            <VideoCompressor />

            {/* How To Guide */}
            <div className="mt-12">
              <HowToGuide
                title="How to Compress Video"
                steps={[
                  {
                    title: "Upload Video",
                    description:
                      "Select the video file you want to compress from your device.",
                  },
                  {
                    title: "Choose Quality",
                    description:
                      "Select your desired compression level (High Quality, Balanced, or Small Size).",
                  },
                  {
                    title: "Compress & Download",
                    description:
                      "Click 'Compress Video' and download your optimized file instantly.",
                  },
                ]}
              />
            </div>

            {/* Benefits Section */}
            <div className="mt-12">
              <BenefitsSection
                title="Why Use Our Video Compressor?"
                benefits={[
                  {
                    title: "Smart Compression",
                    description:
                      "Advanced algorithms reduce file size while maintaining the best possible visual quality.",
                    icon: <Zap className="w-6 h-6 text-black" />,
                  },
                  {
                    title: "Fast Processing",
                    description:
                      "Compress videos directly in your browser. No upload time for large files.",
                    icon: <Clock className="w-6 h-6 text-black" />,
                  },
                  {
                    title: "Secure & Private",
                    description:
                      "Your videos never leave your device. All processing happens locally in your browser.",
                    icon: <Shield className="w-6 h-6 text-black" />,
                  },
                ]}
              />
            </div>

            {/* FAQ Section */}
            <FAQSection
              title="Frequently Asked Questions"
              faqs={[
                {
                  question: "How much can I reduce the video size?",
                  answer:
                    "The reduction depends on the original video and the compression level you choose. 'Small Size' mode can often reduce file size by up to 60-80%.",
                },
                {
                  question: "Will I lose video quality?",
                  answer:
                    "Compression always involves some trade-off, but our 'High Quality' and 'Balanced' modes are optimized to keep visual quality high while reducing file size.",
                },
                {
                  question: "What video formats are supported?",
                  answer:
                    "We support all major video formats including MP4, MOV, WebM, AVI, and more.",
                },
                {
                  question: "Is there a file size limit?",
                  answer:
                    "Since processing happens in your browser, we recommend files under 2GB for the best performance, but there is no hard limit.",
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
