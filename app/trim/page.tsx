import VideoEditor from "@/components/VideoEditor";
import Header from "@/components/Header";
import {
  Video,
  Scissors,
  Clock,
  Download,
  CheckCircle,
  ChevronDown,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HowToGuide from "@/components/HowToGuide";
import FAQSection from "@/components/FAQSection";
import BenefitsSection from "@/components/BenefitsSection";
import AdSpace from "@/components/AdSpace";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/trim`;

export const metadata: Metadata = {
  title: "Free Online Video Trimmer - Cut & Trim Videos Instantly",
  description:
    "Trim and cut your videos online for free. No download required. Fast, easy-to-use video trimming tool with precise frame control. Perfect for YouTube, TikTok, Instagram, and more.",
  keywords: [
    "video trimmer",
    "cut video online",
    "trim video free",
    "online video cutter",
    "video editor trim",
    "free video cutter",
    "trim mp4",
    "video clipper",
  ],
  alternates: {
    canonical: `${siteUrl}/trim-video`, // Canonical to main trim page
  },
  openGraph: {
    title: "Free Online Video Trimmer - Cut Videos Instantly",
    description:
      "Trim and cut your videos online for free. Precise control, no downloads required.",
    url: pageUrl,
    type: "website",
  },
};

export default function TrimPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      {/* Main Content with Ads on Both Sides */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Hero Section */}
        <PageHero
          title="Free Online Video Trimmer"
          description="Trim and cut your videos instantly with our powerful online video editor. No downloads, no sign-up required. Professional results in seconds."
          icon={<Scissors className="w-8 h-8 text-black" strokeWidth={2.5} />}
        />

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "2.5fr 7fr 2.5fr" }}
        >
          {/* Left Ad Space */}
          <AdSpace position="left" />

          {/* Center Content - Video Editor */}
          <div className="col-span-12 xl:col-span-1">
            <VideoEditor />
          </div>

          {/* Right Ad Space */}
          <AdSpace position="right" />
        </div>

        {/* How to Guide */}
        <div className="mt-12">
          <HowToGuide
            title="How to Trim Videos Online"
            steps={[
              {
                title: "Upload Video",
                description:
                  "Click the upload button or drag and drop your video file. We support MP4, MOV, AVI, and more formats.",
              },
              {
                title: "Select Range",
                description:
                  "Use the timeline to select the portion you want to keep. Drag the handles for precise trimming.",
              },
              {
                title: "Preview",
                description:
                  "Play your trimmed video to ensure it's exactly what you need. Make adjustments if necessary.",
              },
              {
                title: "Export",
                description:
                  "Click export to process and download your trimmed video. Fast and high-quality output guaranteed.",
              },
            ]}
          />
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <BenefitsSection
            title="Why Choose Our Video Trimmer?"
            benefits={[
              {
                icon: <Zap className="w-6 h-6 text-black" strokeWidth={2.5} />,
                title: "Lightning Fast",
                description:
                  "Process your videos in seconds with our optimized engine. No waiting, no delays.",
              },
              {
                icon: (
                  <Shield className="w-6 h-6 text-black" strokeWidth={2.5} />
                ),
                title: "100% Secure",
                description:
                  "Your videos are processed locally in your browser. We never upload or store your files.",
              },
              {
                icon: (
                  <Globe className="w-6 h-6 text-black" strokeWidth={2.5} />
                ),
                title: "Works Everywhere",
                description:
                  "Use our tool on any device with a web browser. Windows, Mac, Linux, iOS, or Android.",
              },
              {
                icon: (
                  <Download className="w-6 h-6 text-black" strokeWidth={2.5} />
                ),
                title: "No Installation",
                description:
                  "Work directly in your browser. No software downloads or installations required.",
              },
              {
                icon: (
                  <Clock className="w-6 h-6 text-black" strokeWidth={2.5} />
                ),
                title: "Frame Precision",
                description:
                  "Cut your videos with frame-level accuracy. Perfect for professional editing needs.",
              },
              {
                icon: (
                  <CheckCircle
                    className="w-6 h-6 text-black"
                    strokeWidth={2.5}
                  />
                ),
                title: "High Quality",
                description:
                  "Maintain original video quality. No compression or quality loss during processing.",
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
                question: "Is this video trimmer really free?",
                answer:
                  "Yes, our video trimmer is completely free to use. No hidden fees, no subscriptions, and no watermarks on your videos.",
              },
              {
                question: "What video formats are supported?",
                answer:
                  "We support all major video formats including MP4, MOV, AVI, MKV, WebM, and many more. If you can play it in your browser, you can trim it.",
              },
              {
                question: "Is there a file size limit?",
                answer:
                  "Since all processing happens in your browser, the only limit is your device's available memory. Most modern devices can handle videos up to several GB.",
              },
              {
                question: "Are my videos uploaded to a server?",
                answer:
                  "No. All video processing happens locally in your browser using WebAssembly. Your videos never leave your device, ensuring complete privacy and security.",
              },
              {
                question: "Can I trim multiple videos at once?",
                answer:
                  "Currently, you can trim one video at a time. However, you can trim multiple sections from a single video and export them separately.",
              },
              {
                question: "Will my video quality be reduced?",
                answer:
                  "No. Our trimmer maintains the original video quality without re-encoding. The output quality is identical to your input video.",
              },
              {
                question: "Do I need to create an account?",
                answer:
                  "No account is required. Simply visit the page, upload your video, and start trimming immediately.",
              },
              {
                question: "How long does the processing take?",
                answer:
                  "Processing time depends on your video length and device performance. Most videos are processed in under a minute.",
              },
            ]}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
