import VideoWatermark from "@/components/VideoWatermark";
import ScrollToTool from "@/components/ScrollToTool";
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
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/video-watermark`;

export const metadata: Metadata = {
  title: "Free Online Video Watermark - Add Text & Logo Watermark to Videos",
  description:
    "Add watermarks to your videos online for free. Add text or image/logo watermarks to protect your content. Customize position, size, and opacity. No download required.",
  keywords: [
    "video watermark",
    "add watermark to video",
    "video branding",
    "watermark video online",
    "protect video",
    "add logo to video",
    "text watermark",
    "image watermark",
    "video copyright",
    "brand video",
    "free video watermark",
    "online watermark tool",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free Online Video Watermark - Add Text & Logo to Videos",
    description:
      "Add watermarks to your videos online for free. Protect and brand your content.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Video Watermark Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Video Watermark",
    description: "Add text or logo watermarks to your videos online for free.",
    images: [`${siteUrl}/twitter-image`],
  },
};

// JSON-LD Schema for Video Watermark Tool
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Free Online Video Watermark - Add Text & Logo to Videos",
      description:
        "Add watermarks to your videos online for free. Protect and brand your content.",
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
          name: "Video Watermark",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video Watermark Tool",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      description:
        "Free online tool to add text or image watermarks to videos.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Add text watermarks",
        "Add image/logo watermarks",
        "Customize position and size",
        "Adjust opacity",
        "No download required",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Add Watermark to Videos",
      description: "Learn how to add watermarks to videos online for free",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload Video",
          text: "Click the upload button or drag and drop your video file.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Choose Watermark Type",
          text: "Select text or image watermark. Upload your logo or enter custom text.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Customize & Download",
          text: "Adjust position, size, and opacity. Then download your watermarked video.",
        },
      ],
    },
  ],
};

export default function AddWatermarkPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
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
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Add Watermark to Videos
              </h1>
              <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed text-center">
                Protect and brand your videos with custom watermarks. Add text
                or image watermarks with full control over position, size, and
                opacity. Professional results in seconds.
              </p>
              <p className="text-gray-500 dark:text-zinc-500 max-w-2xl mx-auto leading-relaxed text-center mt-3 text-sm">
                Whether you are a content creator, business, or freelancer,
                watermarking helps prevent unauthorized use of your work. Upload
                your logo or type custom text, adjust placement and
                transparency, and export a branded video ready to publish.
              </p>
            </div>

            {/* Video Watermark Tool */}
            <ScrollToTool />
            <div id="tool" className="scroll-mt-16">
              <VideoWatermark />
            </div>

            {/* How to Guide */}
            <div className="mt-12">
              <HowToGuide
                title="How to Add Watermark to Videos"
                steps={[
                  {
                    title: "Upload Video",
                    description:
                      "Click the upload button or drag and drop your video file. We support all major video formats.",
                  },
                  {
                    title: "Choose Watermark Type",
                    description:
                      "Select text or image watermark. Upload your logo or enter custom text for branding.",
                  },
                  {
                    title: "Customize Position & Style",
                    description:
                      "Adjust position, opacity, size, and color. Preview your watermark in real-time.",
                  },
                  {
                    title: "Export",
                    description:
                      "Click export to process your video with the watermark. Download when ready.",
                  },
                ]}
              />
            </div>

            {/* Benefits Section */}
            <div className="mt-12">
              <BenefitsSection
                title="Why Add Watermarks to Your Videos?"
                benefits={[
                  {
                    icon: (
                      <Shield
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "Content Protection",
                    description:
                      "Protect your videos from unauthorized use. Add your brand or copyright information.",
                  },
                  {
                    icon: (
                      <Type
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "Text & Image Support",
                    description:
                      "Add text watermarks or upload your logo. Full customization of fonts, colors, and opacity.",
                  },
                  {
                    icon: (
                      <Zap
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "Real-Time Preview",
                    description:
                      "See your watermark in real-time before exporting. Adjust until perfect.",
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
                      "Use on any device with a browser. No software installation required.",
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
                      "Maintain original video quality while adding watermarks. Professional results.",
                  },
                  {
                    icon: (
                      <Download
                        className="w-6 h-6 text-white dark:text-black"
                        strokeWidth={2.5}
                      />
                    ),
                    title: "100% Free",
                    description:
                      "Add watermarks to unlimited videos for free. No hidden fees or subscriptions.",
                  },
                ]}
              />
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection
                title="Frequently Asked Questions"
                faqs={[
                  {
                    question: "Can I add my logo as a watermark?",
                    answer:
                      "Yes! You can upload any image file (PNG, JPG, etc.) to use as a watermark. We recommend using PNG files with transparent backgrounds for best results.",
                  },
                  {
                    question: "Can I customize the watermark position?",
                    answer:
                      "Absolutely. You can position your watermark in 9 different locations: top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, or bottom-right.",
                  },
                  {
                    question: "Can I adjust the watermark opacity?",
                    answer:
                      "Yes, you can adjust the opacity from 0% (invisible) to 100% (fully opaque) using the slider. This helps you find the perfect balance between visibility and video content.",
                  },
                  {
                    question: "What text customization options are available?",
                    answer:
                      "You can customize the text content, font size (12-72px), and text color. The text also includes a shadow effect for better visibility.",
                  },
                  {
                    question: "Will the watermark affect video quality?",
                    answer:
                      "No. The watermark is applied without reducing the original video quality. Your output video maintains the same resolution and quality as the input.",
                  },
                  {
                    question: "Can I watermark multiple videos?",
                    answer:
                      "Currently, you can watermark one video at a time. However, you can process multiple videos by uploading them one after another with the same or different watermark settings.",
                  },
                  {
                    question: "Is there a video length limit?",
                    answer:
                      "There's no specific length limit. Processing time depends on video length and your device performance. All processing happens locally in your browser.",
                  },
                  {
                    question: "Are my videos and watermarks private?",
                    answer:
                      "Yes, completely private. All processing happens locally in your browser. Your videos and watermark images are never uploaded to any server.",
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
